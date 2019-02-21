const dbContext = require('./dbcontext');

function tableExists() {
	let param = {
		TableName: this.schema.TableName
	};

	return Promise.resolve().then(
		() =>
			new Promise((resolve, reject) => {
				dbContext.db.describeTable(param, (err, data) => (err ? reject(err) : resolve(data)));
			})
	);
}

function createTable() {
	return Promise.resolve().then(
		() =>
			new Promise((resolve, reject) => {
				dbContext.db.createTable(this.schema, (err, data) => (err ? reject(err) : resolve(data)));
			})
	);
}

async function ensureTable() {
	var first = tableExists.bind(this);
	var second = createTable.bind(this);

	await first().catch((err) => {
		return second();
	});
}

function getUpdateProperties(entity) {
	let map = {};

	let count = 0;
	for (let prop in entity) {
		if ([ this.key, this.rangeKey ].indexOf(prop) >= 0) continue;
		let param = '#p' + count;
		let value = ':v' + count++;
		map[prop] = {
			param: param,
			valueParam: value,
			value: entity[prop]
		};
	}

	return map;
}

function getUpdateExpression(map) {
	let assignment = [];

	for (let prop in map) {
		assignment.push(map[prop].param + ' = ' + map[prop].valueParam);
	}

	if (!assignment.length) {
		return '';
	}

	return 'set ' + assignment.join(', ');
}

function getUpdateItemInput(entity, partitionKey, sortKey) {
	let key = {
		[this.key]: partitionKey
	};

	if (sortKey) {
		key[this.rangeKey] = sortKey;
	}

	let result = {
		TableName: this.schema.TableName,
		Key: key
	};

	let map = getUpdateProperties.call(this, entity);
	result.UpdateExpression = getUpdateExpression.call(this, map);
	if (!result.UpdateExpression) return undefined;

	result.ExpressionAttributeValues = {};
	result.ExpressionAttributeNames = {};

	for (let prop in map) {
		result.ExpressionAttributeNames[map[prop].param] = prop;
		result.ExpressionAttributeValues[map[prop].valueParam] = map[prop].value;
	}

	return result;
}

async function getAll() {
	let params = {
		TableName: this.schema.TableName
	};

	let promise = new Promise((resolve, reject) => {
		dbContext.docClient.scan(params, (err, data) => {
			if (err) {
				return reject(err);
			} else {
				if (!data.Items || !data.Count) {
					return resolve([]);
				} else {
					return resolve(data.Items);
				}
			}
		});
	});

	return promise;
}

async function get(partitionKey, sortKey = undefined) {
	let key = {
		[this.key]: partitionKey
	};

	if (sortKey) {
		key[this.rangeKey] = sortKey;
	}

	let params = {
		TableName: this.schema.TableName,
		Key: key
	};

	let promise = new Promise((resolve, reject) => {
		dbContext.docClient.get(params, (err, data) => {
			if (err) {
				return reject(err);
			} else {
				if (!data.Item) {
					return resolve(undefined);
				} else {
					return resolve(data.Item);
				}
			}
		});
	});

	return promise;
}

async function create(entity) {
	let params = {
		TableName: this.schema.TableName,
		Item: entity
	};

	let promise = new Promise((resolve, reject) => {
		dbContext.docClient.put(params, (err) => (err ? reject(err) : resolve(entity)));
	});

	return promise;
}

async function update(entity, partitionKey, sortKey = undefined) {
	let key = {
		[this.key]: partitionKey
	};

	if (sortKey) {
		key[this.rangeKey] = sortKey;
	}

	let params = getUpdateItemInput.call(this, entity, partitionKey, sortKey);

	let promise = params
		? new Promise((resolve, reject) => {
				dbContext.docClient.update(params, (err) => (err ? reject(err) : resolve(entity)));
			})
		: Promise.resolve(undefined);

	return promise;
}

async function remove(partitionKey, sortKey = undefined) {
	let key = {
		[this.key]: partitionKey
	};

	if (sortKey) {
		key[this.rangeKey] = sortKey;
	}

	let params = {
		TableName: this.schema.TableName,
		Key: key
	};

	let promise = new Promise((resolve, reject) => {
		dbContext.docClient.delete(params, (err) => (err ? reject(err) : resolve()));
	});

	return promise;
}

function safeOp(table, asyncCallback) {
	return async function() {
		await ensureTable.call(table);
		return await asyncCallback.apply(table, arguments);
	};
}

module.exports = function(table) {
	this.getAll = safeOp(table, getAll);
	this.get = safeOp(table, get);
	this.create = safeOp(table, create);
	this.update = safeOp(table, update);
	this.delete = safeOp(table, remove);
};
