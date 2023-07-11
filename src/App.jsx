import { useState, useRef } from "react";
import { moviesData } from "./data";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  annotation1,
  annotation2,
  annotation3,
  annotation4
} from "./annotations";
import { fillDataset, FILTERS_TYPES, META } from "./utils";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
  zoomPlugin
);

export default function App() {
  const chartRef = useRef(null);
  const [datasets, setDatasets] = useState(
    fillDataset(FILTERS_TYPES.ALL, moviesData)
  );
  const [showTicks, setShowTicks] = useState(false)

  // OPTIONS
  const options = {
    // aspectRatio: 1,
    responsive: true,
    plugins: {
      annotation: {
        common: {
          drawTime: "beforeDraw"
        },
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4
        }
      },
      datalabels: {
        font: {
          size: 10
        },
        align: "top",
        anchor: "center",
        padding: 4
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: "ctrl"
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
            modifierKey: "ctrl"
          }
        },
        limits: {
          x: { min: "original", max: "original" },
          y: { min: "original", max: "original" }
        }
      },
      tooltip: {
        mode: "nearest",
        intersect: true,
        usePointStyle: true,
        footerAlign: "right",
        footerColor: "lightGray",
        footerMarginTop: 12,
        callbacks: {
          title: (items) => items[0].raw.label,
          footer(items) {
            const { raw } = items[0];
            const x = raw.x > 400000 ? 1 : 0;
            const y = raw.y > 5 ? 1 : 0;
            return [
              "Recaudación: $" + raw.x,
              "Puntuación: " + raw.y,
              META[y][x].label
            ];
          },
        }
      }
    },
    elements: {
      boxAnnotation: {
        borderWidth: 1,
        label: {
          drawTime: "beforeDatasetsDraw", // Chequear
          display: true,
          font: {
            size: 13
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 800000,
        min: 0,
        grid: {
          drawTicks: false,
          color: "white"
        },
        ticks: {
          display: showTicks
        },
        title: {
          display: true,
          text: "Eje X",
          padding: 10,
          font: {
            size: 20,
            weight: "bold"
          }
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 10,
        min: 0,
        grid: {
          drawTicks: false,
          color: "white"
        },
        ticks: {
          display: showTicks
        },
        title: {
          display: true,
          text: "Eje Y",
          padding: 10,
          font: {
            size: 20,
            weight: "bold"
          }
        }
      }
    }
  };

  // DATA
  const data = {
    datasets
  };

  return (
    <div style={{ maxWidth: "1300px", margin: "auto" }}>
      <button onClick={() => chartRef.current.resetZoom()}>Reset Zoom</button>
      <button onClick={() => setShowTicks(prev => !prev)}>Toogle Ticks</button>
      <label>
        Ver por...
        <br />
        <select
          defaultValue={FILTERS_TYPES.ALL}
          onChange={(event) => {
            const selectedOption = event.target.value;
            if (selectedOption === FILTERS_TYPES.COUNTRY) {
              setDatasets(fillDataset(FILTERS_TYPES.COUNTRY, moviesData));
            } else if (selectedOption === FILTERS_TYPES.GENRE) {
              setDatasets(fillDataset(FILTERS_TYPES.GENRE, moviesData));
            } else {
              setDatasets(fillDataset(FILTERS_TYPES.ALL, moviesData));
            }
          }}
        >
          <option value={FILTERS_TYPES.ALL}>Todo</option>
          <option value={FILTERS_TYPES.COUNTRY}>Procedencia</option>
          <option value={FILTERS_TYPES.GENRE}>Género</option>
        </select>
      </label>
      <Scatter ref={chartRef} data={data} options={options} />
      <p>
        <b>Notas:</b> Ambos ejes tienen un valor mínimo y máximo predefinido.
        800000 para el eje X, 10 para el Y. Es decir, el valor máximo no está
        determinado en función de los valores provenientes de DATA, sino
        preestablecidos manualmente. Tomando esto como base, se forman los
        distintos cuadrantes
      </p>
    </div>
  );
}