import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeviceData } from "../../services/deviceService";
import { Table } from "antd";

function HistoryDevice() {
    const { name } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const history = await getDeviceData(name);
            setData(history);
        };
        fetchData();
    }, [name]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên thiết bị",
            dataIndex: "device_name",
            key: "device_name",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Thời gian",
            dataIndex: "timestamp",
            key: "timestamp",
        },
    ];
    return (
        <>
            <h1>Lịch sử thiết bị </h1>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    );
}
export default HistoryDevice;
