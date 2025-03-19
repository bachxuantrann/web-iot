import { Card, Avatar, Typography, Row, Col } from "antd";
import {
    UserOutlined,
    GithubOutlined,
    FilePdfOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import avatar from "../../images/avatar.jpg";

const { Text } = Typography;

const Profile = () => {
    const user = {
        avatar: "tran xuan bach",
        name: "Trần Xuân Bách",
        dob: "20/10/2003",
        student_id: "B21DCPT056",
        github: "https://github.com/bachxuantrann",
        bio: "Sinh viên năm 4 chuyên ngành Phát triển ứng dụng",
        report: "https://smallpdf.com/vi/file#s=5f38fbd6-8556-43f7-bb25-bf10dd168cbb",
        apiDocs: "http://localhost:5555/api-docs/",
        email: "bxt203@gmail.com",
    };

    const textStyle = {
        display: "block",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "6px",
        userSelect: "none",
    };

    return (
        <div style={{ padding: 40, maxWidth: 1200, margin: "auto" }}>
            <Card
                style={{
                    borderRadius: 16,
                    boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
                    padding: 32,
                    width: "100%",
                }}
            >
                {/* Ảnh đại diện & thông tin cơ bản */}
                <Row align="middle" gutter={32} style={{ marginBottom: 32 }}>
                    <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                        <Avatar
                            size={120}
                            src={avatar}
                            icon={<UserOutlined />}
                        />
                    </Col>
                    <Col xs={24} sm={18}>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                            {user.name}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: "1rem" }}>
                            {user.email}
                        </Text>
                    </Col>
                </Row>

                {/* Thông tin cá nhân */}
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12}>
                        <Text strong>Họ và Tên</Text>
                        <Text style={textStyle}>{user.name}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>Ngày Sinh</Text>
                        <Text style={textStyle}>{user.dob}</Text>
                    </Col>
                </Row>

                <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                    <Col xs={24} sm={12}>
                        <Text strong>Mã Sinh Viên</Text>
                        <Text style={textStyle}>{user.student_id}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>GitHub</Text>
                        <Text style={{ ...textStyle, cursor: "pointer" }}>
                            <a
                                href={user.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#1890ff",
                                    textDecoration: "none",
                                }}
                            >
                                <GithubOutlined /> {user.github}
                            </a>
                        </Text>
                    </Col>
                </Row>

                <Row style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <Text strong>Bio</Text>
                        <Text style={textStyle}>{user.bio}</Text>
                    </Col>
                </Row>

                <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                    <Col xs={24} sm={12}>
                        <Text strong>Link Báo Cáo PDF</Text>
                        <Text style={{ ...textStyle, cursor: "pointer" }}>
                            <a
                                href={user.report}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "red", textDecoration: "none" }}
                            >
                                <FilePdfOutlined /> Xem link báo cáo PDF online
                            </a>
                        </Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>Link API Docs</Text>
                        <Text style={{ ...textStyle, cursor: "pointer" }}>
                            <a
                                href={user.apiDocs}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "green",
                                    textDecoration: "none",
                                }}
                            >
                                <LinkOutlined /> Xem tài liệu API
                            </a>
                        </Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Profile;
