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
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom"; // Import plugin zoom

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin // Đăng ký plugin zoom
);

function DashBoardChart({ data }) {
    const chartData = {
        labels: data.map((item) => new Date(item.timestamp)),
        datasets: [
            {
                label: "Độ ẩm (%)",
                data: data.map((item) => item.humidity),
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Nhiệt độ (°C)",
                data: data.map((item) => item.temperature),
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Cường độ ánh sáng (Lux)",
                data: data.map((item) => item.light_intensity),
                borderColor: "#FACC15",
                backgroundColor: "rgba(250, 204, 21, 0.2)",
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
                    wheel: {
                        enabled: true, // Cho phép zoom bằng chuột
                    },
                    pinch: {
                        enabled: true, // Cho phép zoom bằng cử chỉ pinch (trên mobile)
                    },
                    mode: "x", // Chỉ cho phép zoom theo trục X
                },
                pan: {
                    enabled: true, // Cho phép cuộn (pan)
                    mode: "x", // Chỉ cho phép cuộn theo trục X
                },
                limits: {
                    x: { min: "original", max: "original" }, // Giới hạn zoom/pan trong phạm vi dữ liệu gốc
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    displayFormats: {
                        hour: "dd/MM HH:mm",
                        day: "dd/MM/yy",
                        week: "dd/MM/yy",
                        month: "MM/yyyy",
                    },
                },
                ticks: {
                    source: "data",
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 100,
                },
                grid: {
                    display: false,
                },
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
