import { Switch, Row, Col, notification } from "antd";

import { useEffect, useState } from "react";
import "./DevicesControl.scss";
import {
    postDeviceHistory,
    getLatestDeviceStatus,
} from "../../services/deviceHistoryService";

function DevicesControl() {
    const showNotification = (content, action, type = "success") => {
        notification[type]({
            message: "Thông báo",
            description:
                type === "success"
                    ? `Bạn đã ${action} thành công ${content}`
                    : `Không thể ${action} ${content}. Vui lòng thử lại!`,
            duration: 2,
        });
    };
    const [devices, setDevices] = useState([
        {
            id: "led1",
            name: "Đèn LED 1",
            status: "Tắt",
        },
        {
            id: "led2",
            name: "Đèn LED 2",
            status: "Tắt",
        },
        {
            id: "led3",
            name: "Đèn LED 3",
            status: "Tắt",
        },
    ]);
    const fetchDeviceStatus = async () => {
        try {
            const response = await getLatestDeviceStatus();
            if (response && response.devices) {
                setDevices(
                    response.devices.map((device) => ({
                        id: device.device_id,
                        name: device.device_name,
                        status: device.status,
                    }))
                );
            }
        } catch (error) {
            console.log("Lỗi lấy trạng thái thiết bị", error);
        }
    };
    useEffect(() => {
        fetchDeviceStatus();
    }, []);
    const handleSwitch = async (device) => {
        const { id, name, status } = device;
        let action = status === "Bật" ? "tắt" : "bật";
        let reponse = await postDeviceHistory(id, name, status);
        if (reponse) {
            setDevices((prevDevices) =>
                prevDevices.map((device) =>
                    device.id === id
                        ? {
                              ...device,
                              status: device.status === "Bật" ? "Tắt" : "Bật",
                          }
                        : device
                )
            );
            fetchDeviceStatus();
            showNotification(name, action, "success");
        } else {
            showNotification(name, action, "error");
        }
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
                                    checked={device.status === "Bật"}
                                    checkedChildren="Bật"
                                    unCheckedChildren="Tắt"
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
