import { Card, Avatar, Typography, Input, Row, Col } from "antd";
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
        report: "https://link-to-report.com/report.pdf",
        apiDocs: "https://link-to-api-docs.com",
        email: "bachxuantrann@gmail.com",
    };

    // Style tùy chỉnh cho Input bị disabled
    const inputStyle = {
        backgroundColor: "#f5f5f5", // Màu nền nhạt hơn
        color: "#000", // Giữ màu chữ đậm
        opacity: 1, // Loại bỏ hiệu ứng mờ của disabled
        cursor: "not-allowed", // Hiển thị kiểu con trỏ không thể chỉnh sửa
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

                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12}>
                        <Text strong>Họ và Tên</Text>
                        <Input
                            size="large"
                            value={user.name}
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>Ngày Sinh</Text>
                        <Input
                            size="large"
                            value={user.dob}
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                </Row>

                <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                    <Col xs={24} sm={12}>
                        <Text strong>Mã Sinh Viên</Text>
                        <Input
                            size="large"
                            value={user.student_id}
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>GitHub</Text>
                        <Input
                            size="large"
                            value={user.github}
                            suffix={
                                <GithubOutlined style={{ color: "#1890ff" }} />
                            }
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                </Row>

                <Row style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <Text strong>Tiểu Sử</Text>
                        <Input.TextArea
                            size="large"
                            value={user.bio}
                            rows={4}
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                </Row>

                <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                    <Col xs={24} sm={12}>
                        <Text strong>Link Báo Cáo PDF</Text>
                        <Input
                            size="large"
                            value={user.report}
                            suffix={
                                <FilePdfOutlined style={{ color: "red" }} />
                            }
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Text strong>Link API Docs</Text>
                        <Input
                            size="large"
                            value={user.apiDocs}
                            suffix={<LinkOutlined style={{ color: "green" }} />}
                            disabled
                            style={inputStyle}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Profile;
