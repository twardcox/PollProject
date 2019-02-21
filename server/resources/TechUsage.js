const database = require('../database');
const Technologies = new database(this);

/*[
    {
        tech: "React",
        count: 1
    },
    {
        tech: "Angular",
        count: 8
    }
];*/

exports.schema = {
	TableName: 'Technology',
	BillingMode: 'PROVISIONED',
	KeySchema: [ { AttributeName: 'tech', KeyType: 'HASH' } ],
	AttributeDefinitions: [ { AttributeName: 'tech', AttributeType: 'S' } ],
	ProvisionedThroughput: {
		ReadCapacityUnits: 5,
		WriteCapacityUnits: 5
	}
};

exports.key = 'tech';

exports.index = function*(next) {
	yield next;
	this.body = yield Technologies.getAll();
};

/**
   * GET technology
   */
exports.show = function*(next) {
	yield next;
	var result = yield Technologies.get(this.params.tech);

	if (!result) {
		this.status = 404;
		this.body = 'Not Found';
	} else {
		this.body = result;
	}
};

/**
   * POST a new technology.
   */
exports.create = function*(next) {
	yield next;
	if (!this.request.body || !this.request.body.tech) this.throw(400, '.tech required');
	let technology = ({ tech, count } = this.request.body);
	yield Technologies.create(technology);
	this.status = 201;
	this.body = JSON.stringify(technology);
};

// PUT new count

exports.update = function*(next) {
	yield next;
	if (!this.request.body || !this.request.body.tech) this.throw(400, '.tech required');
	let technology = ({ tech, count } = this.request.body);
	yield Technologies.update(technology, technology.tech);
	this.status = 200;
	this.body = JSON.stringify(technology);
};
