import React from 'react';
import { Row, Col, Divider, Tabs  } from 'antd';
import ScoreCard from './ScoreCard';

import Dashboard from './Dashboard';
import Commentory from './Commentory';
import Summary from './Summary';

const { TabPane } = Tabs;

class Stats extends React.Component {
    render() {
        return(
        <>
            <Row>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <center>
                        <Divider>Score</Divider>
                        <ScoreCard />
                    </center>
                </Col> 
                <Col span={8}>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Score Cards" key="1">
                    <Dashboard />
                </TabPane>
                <TabPane tab="Commentary" key="2">
                    <Commentory />
                </TabPane>
                <TabPane tab="Summary" key="3">
                    <Summary />
                </TabPane>
            </Tabs>

        </>
        )
    }
};
export default (Stats);