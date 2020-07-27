import React from 'react';
import { Timeline, message } from 'antd';

const matchEvents = {
    startMatch: (info, teams, id) => {
        const batsman = teams[info.currentBattingTeam];
        return (
            <Timeline.Item key={id} color="green">
                <p>Batting:- {teams[info.currentBattingTeam].name}</p>
                <p>Bowling:- {teams[info.currentBowlingTeam].name}</p>
                <p>Current Batsman {teams[info.currentBattingTeam].players[info.currentBatsman].name}</p>
                <p>Current Bowler {teams[info.currentBowlingTeam].players[info.currentBowler].name}</p>
            </Timeline.Item>
        )
    },
    runs : (info, id) => {
        return (
            <Timeline.Item key={id}>
                RUN(S):- {info.runs } from the ball
            </Timeline.Item>
        )
    },
    out: (batsman, bowler, id) => {
        // message.error(bowler.name+ " took the wicket of " +batsman.name);
        return (
            <Timeline.Item key={id} color="red">
                <p>OUT:- {bowler.name} took the wicket of { batsman.name}  </p>
            </Timeline.Item>
        )
    },
    wide: (bowler, id) => {
        return(
            <Timeline.Item key={id}>
                <p>WIDE BALL:- Wide ball by {bowler.name} </p>
            </Timeline.Item>
        )
    }, 
    nb: (bowler, id) => {
        return(
            <Timeline.Item key={id}>
                <p>NO BALL:- No ball by {bowler.name} </p>
            </Timeline.Item>
        )
    },
    changeBowler: (bowler, id) => {
        // message.info(bowler.name+ " came to ball");
        return(
            <Timeline.Item key={id}>
                <p>BOWLER CHANGE:- {bowler.name} came to ball</p>
            </Timeline.Item>
        )
    }
};
export default matchEvents;