import React from 'react'
import { Row, Col, Typography, Card, Input, TimePicker} from 'antd';
import moment from 'moment';

import styles from '../App.css'
import "react-datetime/css/react-datetime.css";

//global class element
const { Text } = Typography
const { TextArea } = Input;
const format = 'HH:mm';



class ModalOther extends React.Component {
    state = {
        name: "",
        activities: "",
    };

    render() {
        console.log(this.state)

        return (
            <div className={styles.sitecard_borderless_wrapper}>
                <Card bordered={false}>
                    <div style={{ fontSize: "12px" }}>
                        {/* Col 24 */}
                        <Row style={{ marginTop: "0.5em" }}>
                            <Col span={2}>
                                <Text>TIME</Text>
                            </Col>
                            <Col span={21}>
                                <TimePicker
                                    size={"small"}
                                    defaultValue={moment('00:00', format)}
                                    format={format}
                                    style={{ width: "80px" }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "0.5em" }}>
                            <Col span={2}>
                                <Text>ACTIVITIES</Text>
                            </Col>
                            <Col span={21}>
                                <TextArea name="note" placeholder="Additional notes ..." value={this.state.note} onChange={this.handleInputChange} style={{ height: "auto", width: "500px" }} rows={10} />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div >
        )
    }
}
export default ModalOther;