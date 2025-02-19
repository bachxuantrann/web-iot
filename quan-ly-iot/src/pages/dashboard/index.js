import { Col, Row } from "antd";
import CardItem from "../../components/CardItem";
import { useEffect, useState } from "react";
import { getChartData, getLatestData } from "../../services/dataService";

import DashBoardChart from "../../components/Chart";
import lightIcon from "../../icons/light.png";
import tempIcon from "../../icons/temp.png";
import humidityIcon from "../../icons/humidity.png";
import DevicesControl from "../../components/DevicesControl";
import { getDevice } from "../../services/deviceService";

function Dashboard() {
    const [dataLatest, setDataLatest] = useState({});
    const [dataChart, setDataChart] = useState([]);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chart = await getChartData();
                setDataChart(chart);
                const latest = await getLatestData();
                setDataLatest(latest);
                const devices = await getDevice();
                setDevices(devices);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchData();
    }, []);
    console.log("dataLatest", dataLatest);
    console.log("datachart", dataChart.sensorHistory);
    console.log("data devices", devices);
    // Các thông số hiện tại dùng cho các CardItem
    const temp = {
        title: "Nhiệt độ",
        desc: dataLatest.temperature,
        color: "#ef4444",
    };
    const humidity = {
        title: "Độ ẩm",
        desc: dataLatest.humidity,
        color: "#3b82f6",
    };
    const light = {
        title: "Ánh Sáng",
        desc: dataLatest.light,
        color: "#facc15",
    };
    return (
        <>
            <h1>Tổng Quan</h1>
            <Row
                style={{
                    maxWidth: "100%",
                    marginTop: "20px",
                }}
            >
                <DevicesControl />
            </Row>
            <Row
                gutter={[10, 10]}
                style={{
                    maxWidth: "100%",
                    marginTop: "20px",
                    marginBottom: "30px",
                }}
            >
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
            <Row style={{ marginTop: "20px" }}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div style={{ height: "400px", width: "100%" }}>
                        <DashBoardChart data={dataChart.sensorHistory} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
