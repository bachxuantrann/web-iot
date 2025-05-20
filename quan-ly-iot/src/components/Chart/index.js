import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom"; // Import plugin zoom
import dayjs from "dayjs";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
    Filler
    // Đăng ký plugin zoom,
);

function DashBoardChart({ data, type }) {
    const safeData = Array.isArray(data) ? data : [];

    // Mapping từ type -> config biểu đồ
    const typeConfig = {
        temperature: {
            label: "Nhiệt độ (°C)",
            color: "#EF4444",
            background: "rgba(239, 68, 68, 0.2)",
            field: "temperature",
        },
        humidity: {
            label: "Độ ẩm (%)",
            color: "#3B82F6",
            background: "rgba(59, 130, 246, 0.2)",
            field: "humidity",
        },
        light_intensity: {
            label: "Cường độ ánh sáng (Lux)",
            color: "#FACC15",
            background: "rgba(250, 204, 21, 0.2)",
            field: "light_intensity",
        },
    };

    const selected = typeConfig[type] || typeConfig.temperature;

    const chartData = {
        labels: safeData.map((item) => new Date(item.created_at)),
        datasets: [
            {
                label: selected.label,
                data: safeData.map((item) => item[selected.field]),
                borderColor: selected.color,
                backgroundColor: selected.background,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        `${context.dataset.label}: ${context.formattedValue}`,
                },
            },
            zoom: {
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: "x",
                },
                pan: {
                    enabled: true,
                    mode: "x",
                },
                limits: {
                    x: { min: "original", max: "original" },
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    displayFormats: {
                        minute: "HH:mm",
                        hour: "dd/MM HH:mm",
                        day: "dd/MM/yy",
                        week: "dd/MM/yy",
                        month: "MM/yyyy",
                    },
                    tooltipFormat: "dd/MM/yyyy HH:mm",
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 45,
                    minRotation: 30,
                },
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div
            style={{
                width: "100%",
                height: "400px",
                padding: "15px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "1rem",
            }}
        >
            <Line data={chartData} options={options} />
        </div>
    );
}

export default DashBoardChart;

