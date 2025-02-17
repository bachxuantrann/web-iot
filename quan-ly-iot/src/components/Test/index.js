import { Line } from "@ant-design/charts";

function Test() {
    const data =
        // 20250212005220
        // http://localhost:3002/sensor_history

        [
            {
                id: "1",
                temperature: 28.5,
                humidity: 65,
                light_intensity: 120,
                timestamp: "2025-02-09T08:05:00Z",
            },
            {
                id: "2",
                temperature: 29.2,
                humidity: 60,
                light_intensity: 110,
                timestamp: "2025-02-09T09:10:00Z",
            },
            {
                id: "3",
                temperature: 27.8,
                humidity: 66,
                light_intensity: 115,
                timestamp: "2025-02-09T10:15:00Z",
            },
            {
                id: "4",
                temperature: 30.1,
                humidity: 58,
                light_intensity: 100,
                timestamp: "2025-02-09T11:20:00Z",
            },
            {
                id: "5",
                temperature: 29.5,
                humidity: 62,
                light_intensity: 105,
                timestamp: "2025-02-09T12:25:00Z",
            },
            {
                id: "6",
                temperature: 28.9,
                humidity: 64,
                light_intensity: 118,
                timestamp: "2025-02-09T13:30:00Z",
            },
            {
                id: "7",
                temperature: 30.5,
                humidity: 59,
                light_intensity: 90,
                timestamp: "2025-02-09T14:35:00Z",
            },
            {
                id: "8",
                temperature: 31,
                humidity: 55,
                light_intensity: 80,
                timestamp: "2025-02-09T15:40:00Z",
            },
            {
                id: "9",
                temperature: 29.8,
                humidity: 61,
                light_intensity: 95,
                timestamp: "2025-02-09T16:45:00Z",
            },
            {
                id: "10",
                temperature: 28.3,
                humidity: 67,
                light_intensity: 130,
                timestamp: "2025-02-09T17:50:00Z",
            },
            {
                id: "11",
                temperature: 27.5,
                humidity: 70,
                light_intensity: 140,
                timestamp: "2025-02-09T18:55:00Z",
            },
            {
                id: "12",
                temperature: 26.9,
                humidity: 72,
                light_intensity: 150,
                timestamp: "2025-02-09T19:00:00Z",
            },
        ];
    const chartData = data.flatMap((item) => [
        {
            timestamp: new Date(item.timestamp).toLocaleString("vi-VN"),
            value: item.temperature,
            type: "Nhiệt độ",
        },
        {
            timestamp: new Date(item.timestamp).toLocaleString("vi-VN"),
            value: item.humidity,
            type: "Độ Ẩm",
        },
        {
            timestamp: new Date(item.timestamp).toLocaleString("vi-VN"),
            value: item.light_intensity,
            type: "Cường Độ Ánh Sáng",
        },
    ]);
    const config = {
        data,
        xField: "timestamp",
        yField: "value",
        seriesField: "type",
        xAxis: {
            type: "time",
        },
        yAxis: {
            label: {
                formatter: (v) => `${v}`,
            },
        },
        legend: {
            position: "top",
        },
        smooth: true,
    };
    return <Line {...config} data={chartData} />;
}
export default Test;
