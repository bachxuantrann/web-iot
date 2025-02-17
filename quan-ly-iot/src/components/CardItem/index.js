import "./CardItem.scss";
import { Card } from "antd";
function CardItem(props) {
    const { data, icon } = props;
    const { title, desc, color } = data;

    return (
        <Card bordered={true} className="card">
            <div className="card-item">
                <img className="icon" src={icon} alt="icon" />
                <div className="card-content">
                    <h3>{title}</h3>
                    <h1 style={{ color }}>{desc}</h1>
                </div>
            </div>
        </Card>
    );
}

export default CardItem;
