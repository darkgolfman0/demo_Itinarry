import React, { useState, useEffect } from 'react'
import { Card, Avatar, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const rowStype = {
    position: "absolute",
    display: "flex",
    width: "46em",
    top: "9em",
    columns: "auto 2",
    overflowY: "scroll",
    height: "256px",
}
const AccomImage = (props, state) => {
    return (
        <React.Fragment>
            <div>
                <Row style={rowStype}>
                    {
                        props.itemAccom.map(res => {
                            return (
                                <Col span={12} >
                                    <Card
                                        size={'small'}
                                        style={{ width: "16em", height: "240px" }}
                                        cover={
                                            <img
                                                style={{ height: "145px" }}
                                                alt="example"
                                                src={res.image}
                                            />
                                        }
                                        actions={[
                                            // <SettingOutlined key="setting" />,
                                            // <EditOutlined key="edit" />,
                                            // <EllipsisOutlined key="ellipsis" />,
                                            <p>Detail</p>
                                        ]}
                                    >
                                    </Card>
                                </Col>
                            )
                        })}
                </Row>
            </div>
        </React.Fragment >
    )
}
export default AccomImage