import { Table } from "antd";
import { useEffect, useState } from "react";
import { getHistoryData } from "../../services/dataService";

function HistoryData() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const history = await getHistoryData();
            setData(history);
        };
        fetchData();
    }, []);
    // console.log(data);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nhiệt độ",
            dataIndex: "temperature",
            key: "temperature",
        },
        {
            title: "Độ ẩm",
            dataIndex: "humidity",
            key: "humidity",
        },
        {
            title: "Cường độ ánh sáng",
            dataIndex: "light",
            key: "light",
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
        },
    ];

    return (
        <>
            <h1>Thông số cảm biến</h1>
            <Table dataSource={data} columns={columns} rowKey="id" />
        </>
    );
}
export default HistoryData;
