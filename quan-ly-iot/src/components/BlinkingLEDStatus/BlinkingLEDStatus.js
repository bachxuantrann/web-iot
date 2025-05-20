import { Card, Col, Row } from "antd";
import "./BlinkingLEDStatus.scss"; // nếu cần hiệu ứng blinking

const ledMap = [
    { id: "led4", label: "Đèn LED 4 (Nhiệt độ)", color: "#ef4444" },
    { id: "led6", label: "Đèn LED 6 (Độ ẩm)", color: "#3b82f6" },
    { id: "led7", label: "Đèn LED 7 (Ánh sáng)", color: "#facc15" },
];

function BlinkingLEDStatus({ blinkingLEDs }) {
    return (
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {ledMap.map((led) => (
                <Col key={led.id} xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                    <Card
                        bordered
                        className={`led-card ${blinkingLEDs[led.id] ? "blinking" : ""}`}
                        bodyStyle={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "120px",
                            padding: "20px",
                        }}
                        
                    >
                        <h3 style={{ color: led.color, marginBottom: "10px" }}>{led.label}</h3>
                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                            {blinkingLEDs[led.id] ? "Cảnh báo ! 🔆" : "Bình thường"}
                        </span>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default BlinkingLEDStatus;
