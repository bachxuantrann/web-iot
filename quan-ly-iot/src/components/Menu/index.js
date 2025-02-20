import { Menu } from "antd";
import {
    HomeOutlined,
    ThunderboltOutlined,
    SignalFilled,
    UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
function MenuSider() {
    const navigate = useNavigate();
    const location = useLocation();
    let selectedKey = "tong-quan";
    if (location.pathname === "/") {
        selectedKey = "tong-quan";
    } else if (location.pathname.includes("/lich-su-thiet-bi")) {
        selectedKey = "lich-su-thiet-bi";
    } else if (location.pathname.includes("/lich-su-thong-so")) {
        selectedKey = "lich-su-thong-so";
    } else if (location.pathname.includes("/trang-ca-nhan")) {
        selectedKey = "trang-ca-nhan";
    }
    const items = [
        {
            label: "Tổng quan",
            key: "tong-quan",
            icon: <HomeOutlined />,
            onClick: () => navigate("/"),
        },
        {
            label: "Lịch sử Thiết bị",
            key: "lich-su-thiet-bi",
            icon: <ThunderboltOutlined />,
            onClick: () => navigate("/lich-su-thiet-bi"),
        },
        {
            label: "Lịch sử thông số ",
            key: "lich-su-thong-so",
            icon: <SignalFilled />,
            onClick: () => navigate("/lich-su-thong-so"),
        },
        {
            label: "Trang cá nhân ",
            key: "trang-ca-nhan",
            icon: <UserOutlined />,
            onClick: () => navigate("/trang-ca-nhan"),
        },
    ];
    return (
        <>
            <Menu
                items={items}
                theme="dark"
                selectedKeys={selectedKey}
                mode="inline"
            >
                <div>hello</div>
            </Menu>
        </>
    );
}
export default MenuSider;
