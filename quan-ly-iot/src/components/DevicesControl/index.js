import { Switch, Row, Col, notification } from "antd";

import { useState } from "react";
import "./DevicesControl.scss";

function DevicesControl() {
    const showNotification = (content, action) => {
        notification.success({
            message: "Thông báo",
            description: `Bạn đã ${action} thành công ${content}`,
            duration: 3,
            type: "success",
        });
    };
    const [devices, setDevices] = useState([
        {
            id: 1,
            name: "Đèn phòng khách",
            type: "light",
            status: "on",
        },
        {
            id: 2,
            name: "Quạt trần",
            type: "fan",
            status: "off",
        },
        {
            id: 3,
            name: "Đèn phòng ngủ",
            type: "light",
            status: "off",
        },
    ]);
    const handleSwitch = (device) => {
        const { id, name, status } = device;
        let action = status === "on" ? "tắt" : "bật";
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id
                    ? {
                          ...device,
                          status: device.status === "on" ? "off" : "on",
                      }
                    : device
            )
        );
        showNotification(name, action);
    };
    return (
        <>
            <Row gutter={[16, 16]} className="control-buttons">
                {devices.map((device) => (
                    <Col key={device.id} span={8}>
                        <div className="control-card">
                            <div className="control-info">
                                <p>{device.name}</p>
                            </div>
                            <div className="control-btn">
                                <Switch
                                    checked={device.status === "on"}
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    size="default"
                                    className="btn"
                                    onChange={() => handleSwitch(device)}
                                />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default DevicesControl;
