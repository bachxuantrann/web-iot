// components/SensorCharts.js
import { Row, Col, Card } from "antd";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const chartColors = {
  light_intensity: "#facc15",
  temperature: "#ef4444",
  humidity: "#3b82f6",
};

const SensorChart = ({ data, dataKey, title }) => (
  <Card title={title} style={{ height: "100%", width: "100%" }}>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="created_at" tick={false} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={chartColors[dataKey]}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

const SensorCharts = ({ data }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
      <Col span={8}>
        <SensorChart data={data} dataKey="temperature" title="Nhiệt độ (°C)" />
      </Col>
      <Col span={8}>
        <SensorChart data={data} dataKey="humidity" title="Độ ẩm (%)" />
      </Col>
      <Col span={8}>
        <SensorChart data={data} dataKey="light_intensity" title="Ánh sáng (Lux)" />
      </Col>
    </Row>
  );
};

export default SensorCharts;
