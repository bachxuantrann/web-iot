// src/pages/dashboard/index.jsx
import { Col, Row } from "antd";
import CardItem from "../../components/CardItem";
import { useEffect, useState } from "react";
import { getChartData, getLatestData } from "../../services/dataService";

import DevicesControl from "../../components/DevicesControl";
import BlinkingLEDStatus from "../../components/BlinkingLEDStatus/BlinkingLEDStatus";
import SensorCharts from "../../components/SensorChart/index.js";
import lightIcon from "../../icons/light.png";
import tempIcon from "../../icons/temp.png";
import humidityIcon from "../../icons/humidity.png";
import { getDevice } from "../../services/deviceService";
import { io } from "socket.io-client";
import { formatDateData } from "../../utils/formatData";

function Dashboard() {
  const [dataLatest, setDataLatest] = useState({});
  const [sensorHistory, setSensorHistory] = useState([]);
  const [devices, setDevices] = useState([]);
  const [blinkingLEDs, setBlinkingLEDs] = useState({
    led4: false,
    led6: false,
    led7: false,
  });

  useEffect(() => {
    // 1. Lần đầu fetch chart + latest + devices
    (async () => {
      try {
        const chart = await getChartData();
        console.log(chart);
        // chart.sensorHistory là mảng ban đầu
        setSensorHistory(chart.sensorHistory || []);
        setDataLatest(await getLatestData());
        setDevices(await getDevice());
      } catch (e) {
        console.error(e);
      }
    })();

    // 2. Kết nối socket để realtime
    const socket = io("http://localhost:5555");
    socket.on("sensorData", (data) => {
      const tempThreshold = 20;
      const humidityThreshold = 20;
      const lightThreshold = 250;
        console.log(data);
      // cập nhật blinking
      setBlinkingLEDs({
        led4: data.temperature > tempThreshold,
        led6: data.humidity > humidityThreshold,
        led7: data.light_intensity > lightThreshold,
      });

      // cập nhật latest
      setDataLatest({
        temperature: `${data.temperature}°C`,
        humidity: `${data.humidity}%`,
        light: `${data.light_intensity} lx`,
        time: new Date(data.createdAt).toLocaleString(
          "vi-VN",
          formatDateData
        ),
      });

      // cập nhật biểu đồ
      setSensorHistory((prev) =>
        [...prev, {
          created_at: data.created_at,
          temperature: data.temperature,
          humidity: data.humidity,
          light_intensity: data.light_intensity
        }]
        // .slice(-50) // nếu muốn chỉ giữ 50 điểm gần nhất
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // prepare card data
  const temp = { title: "Nhiệt độ", desc: dataLatest.temperature, color: "#ef4444" };
  const humidity = { title: "Độ ẩm", desc: dataLatest.humidity, color: "#3b82f6" };
  const light = { title: "Ánh Sáng", desc: dataLatest.light, color: "#facc15" };

  return (
    <>
      <h1>Tổng Quan</h1>

      {/* Control bật/tắt LED 1–3 */}
      <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
        <DevicesControl />
      </Row>

      {/* Hiển thị trạng thái nhấp nháy LED 4–6–7 */}
      <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
        <BlinkingLEDStatus blinkingLEDs={blinkingLEDs} />
      </Row>

      {/* 3 Card thông số latest */}
      <Row gutter={[16, 16]} style={{ marginTop: 20, marginBottom: 20}}>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <CardItem data={temp} icon={tempIcon} />
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <CardItem data={humidity} icon={humidityIcon} />
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <CardItem data={light} icon={lightIcon} />
        </Col>
      </Row>

      {/* 3 biểu đồ trên 1 hàng */}
      <SensorCharts data={sensorHistory} />
    </>
  );
}

export default Dashboard;
