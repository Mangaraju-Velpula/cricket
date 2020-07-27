import React from 'react';
import { connect } from 'react-redux';
import { Typography, Row, Col, Button, message } from 'antd';

const { Text, Link } = Typography;
class ScoreCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag: true,
        }
    }

    matchStatus = (match, teams) => {
        const { matchBetween  } = match
        if(match.summary[matchBetween.firstTeam].totalScore > match.summary[matchBetween.secondTeam].totalScore){
            return teams[matchBetween.firstTeam].name+ " Won the match";
        } else if(match.summary[matchBetween.firstTeam].totalScore < match.summary[matchBetween.secondTeam].totalScore){
            return teams[matchBetween.secondTeam].name + " Won the match";
        } else {
            return "Match Tied";
        }

    }
    isMatchCompleted = (match) => {
        return match.isInningsCompleted && !match.yetToBat.length
    }

    overs = (team) => {
        const totalBalls = team.bowls;
        const overs = Math.floor(totalBalls / 6) +"."+ (totalBalls % 6)
        console.log("team $%^&* ", team.bowls);
        return overs;
    }

    render() {
        const { teams, match } = this.props;
        const { yetToBat } = match;
        if(!match.currentBattingTeam) {
            return null
        }
        return(
            <>
        <Text strong > 
            {teams[match.matchBetween.firstTeam].name}
                : 
            {match.summary[match.matchBetween.firstTeam].totalScore}
            / 
            {match.summary[match.matchBetween.firstTeam].wicketsDown} 
            &nbsp;&nbsp;&nbsp;&nbsp;
            Overs: {this.overs(match.summary[match.matchBetween.secondTeam])}
        </Text><br/><br/>
        <Text strong > {
                teams[match.matchBetween.secondTeam].name}
                : 
            {match.summary[match.matchBetween.secondTeam].totalScore}
                /
            {match.summary[match.matchBetween.secondTeam].wicketsDown} 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            Overs: {this.overs(match.summary[match.matchBetween.firstTeam])}
        </Text><br/><br/>
        {
            this.isMatchCompleted(match) && 
            <Text strong mark>
                {this.matchStatus(match, teams)}<br/><br/>
            </Text> 
        }
        </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        teams: state.teams,
        match: state.match,
    }
};
export default connect(mapStateToProps)(ScoreCard);
