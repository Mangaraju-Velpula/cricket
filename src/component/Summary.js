import React from 'react';
import { Row, Col, Typography, Table, Divider } from 'antd';
import { connect } from 'react-redux';

const { Text } = Typography;
const { Column  } = Table;

class Summary extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
		const { firstTeam, secondTeam} = this.props;
		console.log("Final Summary ", firstTeam, secondTeam);
        return (
		<>
		<Divider> {firstTeam.name}</Divider>
            <Row>
                <Col span={24}>
					<Row>
						<Col span={11}>
							<center>
								<Text strong>
									Batting Score Card
									<Table
										dataSource = { firstTeam.battingSummary }
										pagination = { false }
									>
										<Column title="Batsman" dataIndex="name" />
										<Column title="Total" dataIndex="total" />
										<Column title="Bowls" dataIndex="bowls" />
										<Column title="4s" dataIndex="s4" />
										<Column title="6s" dataIndex="s6" />
										<Column title="Wicket By" dataIndex="wicket_by" />
										<Column title="S Rate" dataIndex="sr" />
									</Table>
								</Text>
							</center>
							
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<center>
								<Text strong>
									Bowling Score Card
									<Table
										dataSource = { firstTeam.bowlingSummary }
										pagination = { false }
									>
										<Column title="Bowler" dataIndex="name" />
										<Column title="Overs" dataIndex="overs" />
										<Column title="Runs" dataIndex="total" />
										{/* <Column title="Bowls" dataIndex="bowls" /> */}
										<Column title="0s" dataIndex="s0" />
										<Column title="4s" dataIndex="s4" />
										<Column title="6s" dataIndex="s6" />
										<Column title="Wickets" dataIndex="wickets" />
										<Column title="Wides" dataIndex="wides" />
										<Column title="No Ball" dataIndex="nbs" />
									</Table>
								</Text>
							</center>
						</Col>
					</Row>
                </Col>
            </Row>
			<Divider> {secondTeam.name}</Divider>
            <Row>
                <Col span={24}>
					<Row>
						<Col span={11}>
							<center>
								<Text strong>
									Batting Score Card
									<Table
										dataSource = { secondTeam.battingSummary }
										pagination = { false }
									>
										<Column title="Batsman" dataIndex="name" />
										<Column title="Total" dataIndex="total" />
										<Column title="Bowls" dataIndex="bowls" />
										<Column title="4s" dataIndex="s4" />
										<Column title="6s" dataIndex="s6" />
										<Column title="Wicket By" dataIndex="wicket_by" />
										<Column title="S Rate" dataIndex="sr" />
									</Table>
								</Text>
							</center>
							
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<center>
								<Text strong>
									Bowling Score Card
									<Table
										dataSource = { secondTeam.bowlingSummary }
										pagination = { false }
									>
										<Column title="Bowler" dataIndex="name" />
										<Column title="Overs" dataIndex="overs" />
										<Column title="Runs" dataIndex="total" />
										{/* <Column title="Bowls" dataIndex="bowls" /> */}
										<Column title="0s" dataIndex="s0" />
										<Column title="4s" dataIndex="s4" />
										<Column title="6s" dataIndex="s6" />
										<Column title="Wickets" dataIndex="wickets" />
										<Column title="Wides" dataIndex="wides" />
										<Column title="No Ball" dataIndex="nbs" />
									</Table>
								</Text>
							</center>
						</Col>
					</Row>
                </Col>
            </Row>
			<br/><br/><br/><br/><br/><br/><br/><br/>
		</>
        )
    }
}
const mapStateToProps = (state) => {
	let firstTeamSummary = state.match.summary[state.match.matchBetween.firstTeam];
	let firstTeamDetails = state.teams[state.match.matchBetween.firstTeam];
	const firstTeam = { ...firstTeamSummary, ...firstTeamDetails} 

	let secondTeamSummary = state.match.summary[state.match.matchBetween.secondTeam];
	let secondTeamDetails = state.teams[state.match.matchBetween.secondTeam];
	const secondTeam = {...secondTeamSummary, ...secondTeamDetails};
	if(firstTeam.batting){
		firstTeam.battingSummary =  Object.keys(firstTeam.batting).map(key => {
			return {...firstTeam.batting[key], ...state.teams[state.match.matchBetween.firstTeam].players[key]};
		});

		secondTeam.battingSummary =  Object.keys(secondTeam.batting).map(key => {
			return {...secondTeam.batting[key], ...state.teams[state.match.matchBetween.secondTeam].players[key]};
		});
	}
	if(firstTeam.bowling) {
		firstTeam.bowlingSummary =  Object.keys(firstTeam.bowling).map(key => {
			return {...firstTeam.bowling[key], ...state.teams[state.match.matchBetween.firstTeam].players[key]};
		});
		secondTeam.bowlingSummary =  Object.keys(secondTeam.bowling).map(key => {
			return {...secondTeam.bowling[key], ...state.teams[state.match.matchBetween.secondTeam].players[key]};
		});
	}

	return { firstTeam, secondTeam }
}
export default connect(mapStateToProps)(Summary);