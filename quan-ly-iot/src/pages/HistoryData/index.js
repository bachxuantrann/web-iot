import { Table, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getHistoryData } from "../../services/dataService";
const { Option } = Select;
function HistoryData() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
    });
    const [searchField, setSearchField] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const fetchData = async (page, limit, search, sortObj) => {
        try {
            const history = await getHistoryData(page, limit, search, sortObj);
            if (!history || history.total === 0) {
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

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, {}, {});
    }, [pagination.current]);
    const handleTableChange = (newPagination) => {
        fetchData(
            newPagination.current,
            newPagination.pageSize,
            searchField ? { [searchField]: searchValue } : {},
            sortField ? { sort: sortField, order: sortOrder } : {}
        );
    };
    // console.log(data);
    // console.log(pagination);
    // console.log(searchValue);
    const handleSearch = () => {
        if (searchValue === "") {
            setSearchField("");
        }
        if (!searchField) {
            alert("Vui lòng chọn trường tìm kiếm");
            return;
        }
        fetchData(1, pagination.pageSize, { [searchField]: searchValue }, {});
    };

    const handleInput = (e) => {
        if (e.target.value === "") {
            setSearchField("");
            setSearchValue("");
            fetchData(1, pagination.pageSize, {});
        } else {
            setSearchValue(e.target.value);
        }
    };
    const handleSortChange = () => {
        fetchData(
            1,
            pagination.pageSize,
            searchField ? { [searchField]: searchValue } : {},
            sortField ? { sort: sortField, order: sortOrder } : {}
        );
    };

    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
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
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    gap: "8px",
                }}
            >
                <Select
                    value={searchField}
                    onChange={(value) => {
                        setSearchField(value);
                        setSearchValue("");
                    }}
                    style={{ width: 180 }}
                >
                    <Option value="" disabled>
                        Tìm kiếm theo
                    </Option>
                    <Option value="temperature">Nhiệt độ (°C)</Option>
                    <Option value="humidity">Độ ẩm (%)</Option>
                    <Option value="light_intensity">
                        Cường độ ánh sáng (lx)
                    </Option>
                </Select>
                <Input
                    placeholder="Nhập giá trị"
                    value={searchValue}
                    onChange={handleInput}
                    style={{ width: 120 }}
                    disabled={!searchField}
                />
                <Button
                    type="primary"
                    onClick={handleSearch}
                    disabled={!searchField}
                >
                    Tìm kiếm
                </Button>
                <Select
                    value={sortField}
                    onChange={(value) => setSortField(value)}
                    style={{ width: 180 }}
                >
                    <Option value="" disabled>
                        {" "}
                        Sắp xếp theo
                    </Option>
                    <Option value="temperature">Nhiệt độ (°C)</Option>
                    <Option value="humidity">Độ ẩm (%)</Option>
                    <Option value="light_intensity">
                        Cường độ ánh sáng (lx)
                    </Option>
                    <Option value="created_at">Thời gian</Option>
                </Select>
                <Select
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    style={{ width: 120 }}
                    disabled={!sortField}
                >
                    <Option value="asc">Tăng dần</Option>
                    <Option value="desc">Giảm dần</Option>
                </Select>
                <Button
                    type="primary"
                    onClick={handleSortChange}
                    disabled={!sortField}
                >
                    Sắp xếp
                </Button>
            </div>

            <Table
                dataSource={data}
                columns={columns}
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
export default HistoryData;
