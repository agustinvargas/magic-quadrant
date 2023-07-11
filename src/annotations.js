import { META } from './utils';

export const annotation1 = {
	type: 'box',
	backgroundColor: 'white',
	// backgroundColor: (ctx) => gradient(ctx, META[1][0].backgroundColor),
	xMax: 800000,
	yMin: 5,
	label: {
		content: META[1][0].label,
		position: {
			x: 'start',
			y: 'start',
		},
	},
};

export const annotation2 = {
	type: 'box',
	backgroundColor: 'white',
	// backgroundColor: (ctx) => gradient(ctx, META[1][1].backgroundColor, true),
	xMin: 400000,
	yMin: 5,
	label: {
		content: META[1][1].label,
		position: {
			x: 'end',
			y: 'start',
		},
	},
};

export const annotation3 = {
	type: 'box',
	backgroundColor: 'white',
	// backgroundColor: (ctx) => gradient(ctx, META[0][0].backgroundColor),
	xMax: 800000,
	yMax: 5,
	label: {
		content: META[0][0].label,
		position: {
			x: 'start',
			y: 'end',
		},
	},
};

export const annotation4 = {
	type: 'box',
	backgroundColor: 'white',
	// backgroundColor: (ctx) => gradient(ctx, META[0][1].backgroundColor, true),
	xMin: 400000,
	yMax: 5,
	label: {
		content: META[0][1].label,
		position: {
			x: 'end',
			y: 'end',
		},
	},
};
