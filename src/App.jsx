import { useState, useRef } from 'react';
import { API_DATA } from './data';
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	defaults,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';

import {
	chartAreaBorder,
	fillDataset,
	FILTERS_TYPES,
	getQuadrant,
	QUADRANTS_INFO,
} from './utils';

import {
	Slider,
	Button,
	Stack,
	Select,
	Box,
	Container,
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
	Grid,
} from '@mui/material';

ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	annotationPlugin,
	ChartDataLabels,
	zoomPlugin,
	chartAreaBorder
);

export default function App() {
	// Simula datos de la API
	const { data: moviesData, axes_val: axesVal } = API_DATA;

	const chartRef = useRef(null);
	const [datasets, setDatasets] = useState(
		fillDataset(FILTERS_TYPES.ALL, moviesData)
	);
	const [showGrid, setShowGrid] = useState(false);
	const [quadrantAxeX, setQuadrantAxeX] = useState(axesVal.x.max / 2);
	const [quadrantAxeY, setQuadrantAxeY] = useState(axesVal.y.max / 2);
	const [tagSelect, setTagSelect] = useState(FILTERS_TYPES.ALL);

	// DEFAULTS
	defaults.font.family = 'Nunito';

	// OPTIONS
	const options = {
		// aspectRatio: 1,
		responsive: true,
		plugins: {
			chartAreaBorder: {
				borderColor: 'black',
				borderWidth: 2,
				borderDash: 0,
				borderDashOffset: 0,
			},
			datalabels: {
				font: {
					size: 10,
				},
				align: 'top',
				anchor: 'center',
				padding: 4,
			},
			zoom: {
				zoom: {
					wheel: {
						enabled: true,
						modifierKey: 'ctrl',
					},
					pinch: {
						enabled: true,
					},
					drag: {
						enabled: true,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgb(255, 99, 132)',
						borderWidth: 1,
						modifierKey: 'ctrl',
					},
				},
				limits: {
					x: { min: 'original', max: 'original' },
					y: { min: 'original', max: 'original' },
				},
			},
			tooltip: {
				mode: 'nearest',
				intersect: true,
				usePointStyle: true,
				footerAlign: 'right',
				footerColor: 'lightGray',
				footerMarginTop: 12,
				callbacks: {
					title: items => {
						items[0].raw.label;
					},
					label: items => items.dataset.label,
					footer(items) {
						const { raw } = items[0];
						const x = raw.x > quadrantAxeX ? 1 : 0;
						const y = raw.y > quadrantAxeY ? 1 : 0;
						return [
							'Recaudación: $' + raw.x,
							'Puntuación: ' + raw.y,
							`Cuadrante: ${QUADRANTS_INFO[y][x].label}`,
						];
					},
				},
			},
			annotation: {
				common: {
					drawTime: 'beforeDraw',
				},
				annotations: {
					quadrant1: getQuadrant({
						xMin: quadrantAxeX,
						xMax: axesVal.x.max,
						yMin: quadrantAxeY,
						yMax: axesVal.y.max,
						quadrant: QUADRANTS_INFO[1][1],
					}),
					quadrant2: getQuadrant({
						xMin: axesVal.x.min,
						xMax: quadrantAxeX,
						yMin: quadrantAxeY,
						yMax: axesVal.y.max,
						quadrant: QUADRANTS_INFO[1][0],
					}),
					quadrant3: getQuadrant({
						xMin: axesVal.x.min,
						xMax: quadrantAxeX,
						yMin: axesVal.y.min,
						yMax: quadrantAxeY,
						quadrant: QUADRANTS_INFO[0][0],
					}),
					quadrant4: getQuadrant({
						xMin: quadrantAxeX,
						xMax: axesVal.x.max,
						yMin: axesVal.y.min,
						yMax: quadrantAxeY,
						quadrant: QUADRANTS_INFO[0][1],
					}),
				},
			},
		},
		elements: {
			boxAnnotation: {
				borderWidth: 2,
				borderColor: 'black',
				label: {
					display: true,
					font: {
						size: 13,
					},
				},
			},
		},
		scales: {
			x: {
				border: {
					dash: [5, 5],
				},
				beginAtZero: true,
				max: axesVal?.x.max,
				min: axesVal?.x.min,
				grid: {
					color: 'grey',
					display: showGrid,
				},
				ticks: {
					display: showGrid,
				},
				title: {
					display: true,
					text: 'Eje X',
					padding: 10,
					font: {
						size: 20,
						weight: 'bold',
					},
				},
			},
			y: {
				border: {
					dash: [5, 5],
				},
				display: true,
				beginAtZero: true,
				max: axesVal?.y.max,
				min: axesVal?.y.min,
				grid: {
					color: 'grey',
					display: showGrid,
				},
				ticks: {
					display: showGrid,
				},
				title: {
					display: true,
					text: 'Eje Y',
					padding: 10,
					font: {
						size: 20,
						weight: 'bold',
					},
				},
			},
		},
	};

	// DATA
	const data = {
		datasets,
	};

	return (
		<Box>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={8}>
						<Stack spacing={2} direction="row">
							<Button
								variant="outlined"
								size="small"
								onClick={() => chartRef.current.resetZoom()}
							>
								Resetear zoom
							</Button>
							<Button
								variant="outlined"
								size="small"
								onClick={() => setShowGrid(prev => !prev)}
							>
								{showGrid ? 'Ocultar ' : 'Mostrar '}cuadrícula
							</Button>
							<Button
								variant="outlined"
								size="small"
								onClick={() => {
									setQuadrantAxeX(axesVal.x.max / 2);
									setQuadrantAxeY(axesVal.y.max / 2);
								}}
							>
								Centrar ejes
							</Button>
						</Stack>
					</Grid>
					<Grid item xs={6} lg={2}>
						<div>
							<label htmlFor="axe-y-range">
								Línea divosora del eje Y
							</label>
							<Slider
								id="axe-y-range"
								max={axesVal.x.max}
								min={axesVal.x.min}
								defaultValue={quadrantAxeX}
								onChange={e => setQuadrantAxeX(e.target.value)}
								value={quadrantAxeX}
								valueLabelDisplay="auto"
							/>
						</div>
					</Grid>
					<Grid item xs={6} lg={2}>
						<div>
							<label htmlFor="axe-x-range">
								Línea divosora del eje X
							</label>
							<Slider
								id="axe-x-range"
								valueLabelDisplay="auto"
								value={quadrantAxeY}
								onChange={e => setQuadrantAxeY(e.target.value)}
								defaultValue={quadrantAxeY}
								max={axesVal.y.max}
								min={axesVal.y.min}
							/>
						</div>
					</Grid>
					<Grid item xs={12} lg={2}>
						<Stack>
							<FormControl
								size="small"
								sx={{ m: 1, minWidth: 120 }}
							>
								<InputLabel id="tags-select">
									Etiquetas
								</InputLabel>
								<Select
									labelId="tags-select"
									id="tags-select"
									// value={age}
									// onChange={handleChange}
									label="Etiquetas"
									value={tagSelect}
									onChange={event => {
										const selectedOption =
											event.target.value;
										if (
											selectedOption ===
											FILTERS_TYPES.COUNTRY
										) {
											setDatasets(
												fillDataset(
													FILTERS_TYPES.COUNTRY,
													moviesData
												)
											);
										} else if (
											selectedOption ===
											FILTERS_TYPES.GENRE
										) {
											setDatasets(
												fillDataset(
													FILTERS_TYPES.GENRE,
													moviesData
												)
											);
										} else {
											setDatasets(
												fillDataset(
													FILTERS_TYPES.ALL,
													moviesData
												)
											);
										}
										setTagSelect(selectedOption);
									}}
								>
									<MenuItem value={FILTERS_TYPES.ALL}>
										Todos
									</MenuItem>
									<MenuItem value={FILTERS_TYPES.COUNTRY}>
										País
									</MenuItem>
									<MenuItem value={FILTERS_TYPES.GENRE}>
										Género
									</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Grid>
				</Grid>
			</Container>
			<div style={{ maxWidth: '1300px', margin: 'auto' }}>
				<Scatter ref={chartRef} data={data} options={options} />
			</div>
			<Container>
				<Typography variant="h4" gutterBottom>
					Notas
				</Typography>

				<Typography variant="h6" gutterBottom>
					Ejes
				</Typography>
				<p>
					Ambos ejes tienen un valor mínimo y máximo predefinido.
					Tomando esto como base, se forman los distintos cuadrantes
				</p>
			</Container>
			<Container>
				<Typography variant="h6" gutterBottom>
					Zoom
				</Typography>
				<p>
					Mantener presionada la tecla CTRL y usar la rueda del mouse
					o dibujar un área dentro del gráfico.
				</p>
			</Container>
		</Box>
	);
}
