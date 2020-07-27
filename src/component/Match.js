import React from 'react';
import { connect } from 'react-redux';
import { Typography, Row, Col, Button, message, Select } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { startMatch, newBowl, matchPausedStatus, startInnings, setOvers } from '../actions';

const { Text, Link } = Typography;
const { Option } = Select;
class Match extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInningsCompleted: false,
            isMatchStarted: false,
        }
    };

    componentDidMount() {
        this.props.setOvers(20);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.isInningsCompleted) {
            this.checkMatchStatus(nextProps);
            clearInterval(this.playTimer);
        }
    }

    checkMatchStatus = (props) => {
        if(props.match.yetToBat.length) {
            this.setState({isInningsCompleted: true});
            const { teams } = this.props;
            this.props.startInnings({ teams });
            setTimeout(() => {
                this.setState({isInningsCompleted: false});
                this.play();
            },2000)
        } else {
            this.setState({ isMatchCompleted : true});
        }
    }

    bowl = () => {
        const bowl = Math.floor((Math.random() * 10));
        console.log("bowlingbowlingherenana ", bowl);
        this.props.newBowl(bowl);
    };

    play = () => {
        this.playTimer = setInterval(this.bowl,1000);
    };

    onStartMatch = () => {
        const { teams } = this.props;
        this.props.startMatch({teams});
        setTimeout(this.play, 1000);
        if(!this.state.isMatchStarted) {
            this.setState({ isMatchStarted: true });
        }
        // this.play();
    }

    onPauseMatch = () => {
        clearInterval(this.playTimer);
        this.props.matchPausedStatus(true);
    }

    onContinueMatch = () => {
        this.props.matchPausedStatus(false);
        this.play();
    }

    matchStatus = (match, teams) => {
        const { matchBetween  } = match
        if(match.summary[matchBetween.firstTeam].totalScore > match.summary[matchBetween.secondTeam].totalScore){
            return teams[matchBetween.firstTeam].name+ "Won the match";
        } else if(match.summary[matchBetween.firstTeam].totalScore < match.summary[matchBetween.secondTeam].totalScore){
            return teams[matchBetween.secondTeam].name + "Won the match";
        } else {
            return "Match Tied";
        }

    }

    setOvers = (selection) => {
        console.log("selection changed ", selection.value);
        this.props.setOvers(selection.value);
    }


    render() {
        const { teams, match } = this.props;
        const { matchBetween , currentBattingTeam, isMatchPaused } = this.props.match;
        return(

            <Row>
                <Col span={16}> 
                    <center>            
                        <Text strong>
                            { teams[matchBetween.firstTeam].name } vs { teams[matchBetween.secondTeam].name }
                        </Text>
                        
                        
                    </center>
                </Col>
                <Col span={4}>
                <Select
                    labelInValue
                    defaultValue={{ value: 20 }}
                    style={{ width: 120 }}
                    onChange={this.setOvers}
                    disabled={this.state.isMatchStarted}
                >
                    <Option value={2}>2 Overs</Option>
                    <Option value={5}>5 Overs</Option>
                    <Option value={10}>10 Overs</Option>
                    <Option value={20}>20 Overs</Option>
                </Select>
                </Col>
                <Col span={4}>   
                    { (() => {
                        if(this.state.isMatchCompleted) {
                            return  <><Button type="primary" disabled>
                                Match Completed
                            </Button>
                        </>
                        }
                        if(this.state.isInningsCompleted) {
                            return <Button type="primary" loading>
                                2nd Innings Loading...
                          </Button>
                        }else if(isMatchPaused) {
                            return <Button 
                                        type="primary" 
                                        icon={<PlayCircleOutlined />}
                                        onClick={this.onContinueMatch}
                                    > 
                                        Continue Match
                                    </Button>
                        } else if(currentBattingTeam) {
                            return <Button 
                                    type="danger" 
                                    icon={<PauseCircleOutlined />}
                                    onClick={this.onPauseMatch}

                                >
                                    Pause Match
                                </Button>
                        } else{
                            return <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />}
                            onClick={this.onStartMatch}
                        >
                            Start Match
                        </Button>
                        }
                        })()
                    }
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return { teams : state.teams, 
            match: state.match}
};
export default connect(mapStateToProps, {startMatch, newBowl, matchPausedStatus, startInnings, setOvers} )(Match);