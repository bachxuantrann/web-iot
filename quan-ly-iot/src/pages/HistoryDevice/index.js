import { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { getDeviceHistory } from "../../services/deviceHistoryService";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

function HistoryDevice() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
    });
    const [searchTime, setSearchTime] = useState("");

    const fetchData = async (page, limit, datetime) => {
        try {
            const history = await getDeviceHistory(page, limit, datetime);
            if (!history || history.formattedData.length === 0) {
                setData([]);
                return;
            }
            setData(history.formattedData || []);
            setPagination((prev) => ({
                ...prev,
                current: history.pagination?.currentPage || 1,
                total: history.pagination?.total || 0,
                pageSize: limit,
            }));
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(data);

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, "");
    }, []);

    // Xử lý thay đổi trang
    const handleTableChange = (newPagination) => {
        fetchData(newPagination.current, newPagination.pageSize, searchTime);
    };
    const handleReset = () => {
        setSearchTime("");
        // Gọi lại dữ liệu từ đầu (trang 1, không có bộ lọc)
        fetchData(pagination.current, pagination.pageSize, "");
    };

    const handleInput = (e) => {
        if (e.target.value === "") {
            fetchData(pagination.current, pagination.pageSize, "");
        } else {
            setSearchTime(e.target.value);
            console.log(e.target.value);
        }
    };
    // Chuyển đổi thời gian từ định dạng nhập vào sang ISO
    const handleSearch = () => {
        if (!searchTime) return;
        // Chuyển đổi định dạng từ "HH:mm:ss DD/MM/YYYY" sang ngày hợp lệ
        if (typeof searchTime !== "string") {
            alert(
                "Vui lòng nhập thời gian đúng định dạng: YYYY/MM/DD HH:mm:ss"
            );
            return;
        }
        // Chuyển đổi searchTime sang đối tượng dayjs với định dạng mong muốn
        const parsedDate = dayjs(searchTime, "YYYY-MM-DD HH:mm:ss", true);
        // Nếu định dạng không hợp lệ, cảnh báo lỗi
        if (!parsedDate.isValid()) {
            alert(
                "Định dạng thời gian không hợp lệ! Vui lòng nhập theo định dạng: YYYY/MM/DD HH:mm:ss"
            );
            return;
        }
        fetchData(1, pagination.pageSize, searchTime);
    };

    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
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
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    return (
        <>
            <h1>Lịch sử thiết bị</h1>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Nhập thời gian (YYYY-MM-DD HH:mm:ss)"
                    value={searchTime}
                    onChange={handleInput}
                    style={{ width: 300, marginRight: 8 }}
                />
                <Button
                    type="primary"
                    onClick={handleSearch}
                    style={{ marginRight: 8 }}
                >
                    Tìm kiếm
                </Button>
                <Button type="default" onClick={handleReset}>
                    Reset
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"],
                }}
                onChange={handleTableChange}
            />
        </>
    );
}

export default HistoryDevice;
