export const META = [
	[
		{
			color: 'rgb(255, 174, 201)',
			// backgroundColor: "rgba(255, 174, 201, 0.5)",
			label: 'Recaudación baja, calificación baja',
		},
		{
			color: 'rgb(159, 168, 218)',
			// backgroundColor: "rgba(159, 168, 218, 0.5)",
			label: 'Recaudación alta, calificación baja',
		},
	],
	[
		{
			color: 'rgb(255, 245, 157)',
			// backgroundColor: "rgba(255, 245, 157, 0.5)",
			label: 'Recaudación baja, calificación alta',
		},
		{
			color: 'rgb(165, 214, 167)',
			// backgroundColor: "rgba(165, 214, 167, 0.5)",
			label: 'Recaudación alta, calificación alta',
		},
	],
];

// export function gradient({ chart: { ctx }, element }, color, rtl = false) {
//   const g = ctx.createLinearGradient(
//     element.x,
//     element.y,
//     element.x2,
//     element.y
//   );
//   g.addColorStop(rtl ? 1 : 0, color);
//   g.addColorStop(rtl ? 0 : 1, "transparent");
//   return g;
// }

// export function gridColor(context) {
//   if (context.tick.value === 5) {
//     return "lightGray";
//   } else if (context.tick.value === 0 || context.tick.value === 10) {
//     return "lightGray";
//   }
//   return "transparent";
// }

export const tagFilters = {
	country: {
		taget: 'is_local',
		opt1: {
			label: 'Películas nacionales',
		},
		opt2: {
			label: 'Películas internacionales',
		},
	},
};

export const FILTERS_TYPES = {
	ALL: 'ALL',
	COUNTRY: 'COUNTRY',
	GENRE: 'GENRE',
};

export const fillDataset = (type, data) => {
	if (type === FILTERS_TYPES.ALL) {
		return [
			{
				label: 'Películas nacionales',
				data: data
					.filter(movie => movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 8,
			},
			{
				label: 'Películas internacionales',
				data: data
					.filter(movie => !movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'rgb(0,0,0, 0.3)',
				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
			},
		];
	}
	if (type === FILTERS_TYPES.COUNTRY) {
		return [
			{
				label: 'Películas nacionales',
				data: data
					.filter(movie => movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'blue',

				radius: 8,
			},
			{
				label: 'Películas internacionales',
				data: data
					.filter(movie => !movie.is_local)
					.map(movie => ({
						x: movie.gross,
						y: movie.rating,
						label: movie.label,
					})),
				backgroundColor: 'green',

				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
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
				radius: 8,
			},
		];
	}
};

// const datasetObj = (data, label, key, bool = true, labelColor = false) => {
//   return {
//     label,
//     data: data
//       .filter((movie) => movie[key] === bool)
//       .map((movie) => ({
//         x: movie.gross,
//         y: movie.rating
//       })),
//     backgroundColor: labelColor || "rgb(0,0,0, 0.5)",
//     radius: 8
//   };
// };
