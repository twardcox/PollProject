import { createMuiTheme } from '@material-ui/core/styles';

// All the following keys are optional.
// We try our best to provide a great default value.

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		common: { black: '#000', white: '#fff' },
		background: { paper: '#fff', default: '#fafafa' },
		primary: {
			light: 'rgba(223, 120, 239, 1)',
			main: 'rgba(171, 71, 188, 1)',
			dark: 'rgba(121, 14, 139, 1)',
			contrastText: 'rgba(255, 255, 255, 1)'
		},
		secondary: {
			light: 'rgba(255, 229, 76, 1)',
			main: 'rgba(255, 179, 0, 1)',
			dark: 'rgba(198, 132, 0, 1)',
			contrastText: 'rgba(0, 0, 0, 1)'
		},
		error: { light: '#e57373', main: '#f44336', dark: '#d32f2f', contrastText: '#fff' },
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)'
		}
	},
	spacing: {
		unit: 8
	}
});

export default theme;

/*
breakpoints {...}
direction "ltr"
mixins {...}
overrides {...}
palette {...}
props {...}
shadows Array[25]
shape {...}
spacing {...}
transitions {...}
typography {...}
zIndex {...}
*/
