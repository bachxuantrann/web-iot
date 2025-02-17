import { Card, Avatar, Typography, Input, Button, Row, Col } from "antd";
import {
    UserOutlined,
    GithubOutlined,
    FilePdfOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import avatar from "../../images/avatar.jpg"; // Đường dẫn ảnh đại diện của bạn

const { Text } = Typography;

const Profile = () => {
    const user = {
        avatar: "tran xuan bach", // Bạn có thể thay bằng URL hoặc giữ nguyên nếu dùng hình ảnh cục bộ
        name: "Trần Xuân Bách",
        dob: "20/10/2003",
        student_id: "B21DCPT056",
        github: "https://github.com/bachxuantrann",
        bio: "Sinh viên năm 4 chuyên ngành Phát triển ứng dụng",
        report: "https://link-to-report.com/report.pdf",
        apiDocs: "https://link-to-api-docs.com",
        email: "bachxuantrann@gmail.com",
    };

    return (
        <>
            <div style={{ padding: 40, maxWidth: 1200, margin: "auto" }}>
                <Card
                    style={{
                        borderRadius: 16,
                        boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
                        padding: 32,
                        width: "100%",
                    }}
                >
                    {/* Hình ảnh Avatar và tên hiển thị ở đầu card */}
                    <Row
                        align="middle"
                        gutter={32}
                        style={{ marginBottom: 32 }}
                    >
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

                    {/* Các trường thông tin */}
                    <Row gutter={[32, 32]}>
                        {/* Họ và Tên */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Họ và Tên
                            </Text>
                            <Input
                                size="large"
                                value={user.name}
                                placeholder="Nhập họ và tên"
                            />
                        </Col>
                        {/* Ngày Sinh */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Ngày Sinh
                            </Text>
                            <Input
                                size="large"
                                value={user.dob}
                                placeholder="Nhập ngày sinh"
                            />
                        </Col>
                    </Row>

                    <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                        {/* Mã Sinh Viên */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Mã Sinh Viên
                            </Text>
                            <Input
                                size="large"
                                value={user.student_id}
                                placeholder="Nhập mã sinh viên"
                            />
                        </Col>
                        {/* GitHub */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                GitHub
                            </Text>
                            <Input
                                size="large"
                                value={user.github}
                                placeholder="Nhập link GitHub"
                                suffix={
                                    <GithubOutlined
                                        style={{ color: "#1890ff" }}
                                    />
                                }
                            />
                        </Col>
                    </Row>

                    {/* Tiểu sử */}
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Tiểu Sử
                            </Text>
                            <Input.TextArea
                                size="large"
                                value={user.bio}
                                placeholder="Nhập tiểu sử"
                                rows={4}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
                        {/* Link Báo Cáo PDF */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Link Báo Cáo PDF
                            </Text>
                            <Input
                                size="large"
                                value={user.report}
                                placeholder="Nhập link báo cáo"
                                suffix={
                                    <FilePdfOutlined style={{ color: "red" }} />
                                }
                            />
                        </Col>
                        {/* Link API Docs */}
                        <Col xs={24} sm={12}>
                            <Text strong style={{ fontSize: "1.1rem" }}>
                                Link API Docs
                            </Text>
                            <Input
                                size="large"
                                value={user.apiDocs}
                                placeholder="Nhập link API Docs"
                                suffix={
                                    <LinkOutlined style={{ color: "green" }} />
                                }
                            />
                        </Col>
                    </Row>

                    {/* Nút Lưu */}
                    <Row justify="end" style={{ marginTop: 32 }}>
                        <Button type="primary" size="large">
                            Lưu Thay Đổi
                        </Button>
                    </Row>
                </Card>
            </div>
        </>
    );
};

export default Profile;
