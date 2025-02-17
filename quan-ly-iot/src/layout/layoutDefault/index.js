import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import "./layoutDefault.scss";
import logo from "../../images/admin.png";
import { useState } from "react";
import MenuSider from "../../components/Menu";
import { Outlet } from "react-router-dom";
const { Content, Sider } = Layout;

function LayoutDefault() {
    const [collapse, setCollapse] = useState(false);
    console.log(collapse);
    return (
        <>
            <Layout className="layout-default">
                <Sider
                    className="sider"
                    collapsed={collapse}
                    theme="dark"
                    width={250}
                >
                    <div className="sider__logo">
                        <img
                            src={logo}
                            alt="Logo"
                            className="sider__logo--img"
                        />
                    </div>
                    <MenuSider />
                </Sider>
                <Layout>
                    <header className="header">
                        <i
                            className="header__icon"
                            onClick={() => setCollapse(!collapse)}
                        >
                            {collapse ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )}
                        </i>
                        <h1 className="header__title">Quản lý ứng dụng</h1>
                    </header>
                    <Content className="content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}
export default LayoutDefault;
