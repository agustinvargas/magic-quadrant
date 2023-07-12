export const QUADRANTS_INFO = [
	[
		{
			label: 'Recaudación baja, calificación baja',
			bg: 'rgb(240, 240, 240, 0.6)',
			position: {
				x: 'center',
				y: 'end',
			},
		},
		{
			label: 'Recaudación alta, calificación baja',
			bg: 'rgb(240, 240, 240, 0.85)',
			position: {
				x: 'center',
				y: 'end',
			},
		},
	],
	[
		{
			label: 'Recaudación baja, calificación alta',
			bg: 'rgb(240, 240, 240, 0.1)',
			position: {
				x: 'center',
				y: 'start',
			},
		},
		{
			label: 'Recaudación alta, calificación alta',
			bg: 'rgb(240, 240, 240, 0.35)',
			position: {
				x: 'center',
				y: 'start',
			},
		},
	],
];

export const FILTERS_TYPES = {
	ALL: 'ALL',
	COUNTRY: 'COUNTRY',
	GENRE: 'GENRE',
};

export const fillDataset = (type, data) => {
	if (type === FILTERS_TYPES.ALL) {
		return [
			{
				label: 'Nacionales',
				data: data
					.filter(movie => movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Internacionales',
				data: data
					.filter(movie => !movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Drama',
				data: data
					.filter(movie => movie.genre === 'drama')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Comedia',
				data: data
					.filter(movie => movie.genre === 'comedy')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Acción',
				data: data
					.filter(movie => movie.genre === 'action')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Musical',
				data: data
					.filter(movie => movie.genre === 'musical')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
			{
				label: 'Superhéroes',
				data: data
					.filter(movie => movie.genre === 'superhero')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 7,
			},
		];
	}
	if (type === FILTERS_TYPES.COUNTRY) {
		return [
			{
				label: 'Nacionales',
				data: data
					.filter(movie => movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'blue',

				radius: 7,
			},
			{
				label: 'Internacionales',
				data: data
					.filter(movie => !movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'green',

				radius: 7,
			},
		];
	}
	if (type === FILTERS_TYPES.GENRE) {
		return [
			{
				label: 'Drama',
				data: data
					.filter(movie => movie.genre === 'drama')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'blue',
				radius: 7,
			},
			{
				label: 'Comedia',
				data: data
					.filter(movie => movie.genre === 'comedy')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'red',
				radius: 7,
			},
			{
				label: 'Acción',
				data: data
					.filter(movie => movie.genre === 'action')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'grey',
				radius: 7,
			},
			{
				label: 'Musical',
				data: data
					.filter(movie => movie.genre === 'musical')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'pink',
				radius: 7,
			},
			{
				label: 'Superhéroes',
				data: data
					.filter(movie => movie.genre === 'superhero')
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'black',
				radius: 7,
			},
		];
	}
};

export const chartAreaBorder = {
	id: 'chartAreaBorder',
	beforeDraw(chart, args, options) {
		const {
			ctx,
			chartArea: { left, top, width, height },
		} = chart;
		ctx.save();
		ctx.strokeStyle = options.borderColor;
		ctx.lineWidth = options.borderWidth;
		ctx.setLineDash(options.borderDash || []);
		ctx.lineDashOffset = options.borderDashOffset;
		ctx.strokeRect(left, top, width, height);
		ctx.restore();
	},
};

export const getQuadrant = ({ xMin, xMax, yMin, yMax, quadrant }) => {
	return {
		type: 'box',
		backgroundColor: quadrant.bg,
		xMin,
		xMax,
		yMin,
		yMax,
		label: {
			content: quadrant.label,
			position: {
				x: quadrant.position.x,
				y: quadrant.position.y,
			},
		},
	};
};
