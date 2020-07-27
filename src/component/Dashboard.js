import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Tabs  } from 'antd';
import BattingScoreCard from './BattingScoreCard';
import BowlingScoreCard from './BowlingScoreCard';


class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Row>
                
            <Col span={1}> <Divider type="vertical"  style={{ color: '#000000', fontWeight: 'normal' }} /></Col>
            <Col span={11}>
                <Divider >
                    Batting: {this.props.batting}
                </Divider>
                <BattingScoreCard />
            </Col>
            <Col span={1}> 
                <Divider type="vertical" />
            </Col>
            <Col span={11}>
                <Divider >Bowling: {this.props.bowling}</Divider>
                <BowlingScoreCard />
            </Col>
        </Row>
        )
    }
}
const mapStateToProps = (state) => {
    if(!state.match.currentBowler) {
        return {
            batting: '',
            bowling: ''
        }
    }
    return{
        batting: state.match.teams[state.match.currentBattingTeam].name,
        bowling: state.match.teams[state.match.currentBowlingTeam].name
    }
}
export default connect(mapStateToProps)(Dashboard);