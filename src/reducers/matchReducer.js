import { message } from 'antd';
import { NO_OF_OVERS } from '../constants';


import matchEvents from '../commonUtils/matchEvents';
import { guid } from '../commonUtils/commonMethods';

const battingSummary = (newState) => {
    return newState.summary[newState.currentBattingTeam].batting;
};
const currentBatsmanSummary = (newState) => {
    const battingTeam = battingSummary(newState);
    return battingTeam[newState.currentBatsman];
};

const bowlingSummary = (newState) => {
    return newState.summary[newState.currentBowlingTeam].bowling;
};

const currentBowlerSummary = (newState) => {
    const bowlingTeam = bowlingSummary(newState);
    return bowlingTeam[newState.currentBowler];
}


const addBatsman = (action) => {
    return {
        total: action.bowl,
        s1:0,
        s2:0,
        s3:0,
        s4:0,
        s5:0,
        s6:0,
        bowls:1,
        sr: (action.bowl/1)* 100,
        wicket_by: '',
    }
};
const addBowler = (action) => {
    return {
        total: action.bowl,
        s0:0,
        s1:0,
        s2:0,
        s3:0,
        s4:0,
        s5:0,
        s6:0,
        bowls:1,
        wickets: 0,
        wides: 0,
        nbs: 0,
    }
}
export const out = (newState, batsmenInfo, bowlerInfo, action) => {


    const batsmanSummary = currentBatsmanSummary(newState);
    const bowlerSummary =  currentBowlerSummary(newState);

    //batsman changes
    if(batsmanSummary) {
        batsmanSummary.wicket_by = bowlerInfo.name;
        batsmanSummary.bowls++;
        batsmanSummary.sr = Math.floor(batsmanSummary.total/batsmanSummary.bowls)* 100;
    } else {
        const teamBattingSummary = battingSummary(newState);
        teamBattingSummary[newState.currentBatsman] = addBatsman(action);
        teamBattingSummary[newState.currentBatsman].sr = 0;
        teamBattingSummary[newState.currentBatsman].wicket_by =  bowlerInfo.name;
        teamBattingSummary[newState.currentBatsman].total = 0;
    }

    //bowler changes

    if(bowlerSummary) {
        bowlerSummary.wickets++;
        bowlerSummary.bowls++;
        addOversToBowler(bowlerSummary)
    } else {
        const teamBowlingSummary = bowlingSummary(newState);
        teamBowlingSummary[newState.currentBowler] = addBowler(action);
        teamBowlingSummary[newState.currentBowler].wickets++;
        teamBowlingSummary[newState.currentBowler].total = 0;
        addOversToBowler(teamBowlingSummary[newState.currentBowler]);
    }

    newState.summary[newState.currentBattingTeam].wicketsDown++;

    if(!newState.battingQueue.length) {
        newState.isInningsCompleted = true;
        return;
    }
    //match update

    newState.currentBatsman = newState.battingQueue[0];
    newState.battingQueue = newState.battingQueue.slice(1, newState.battingQueue.length);
};

const checkMatchRunsExceeded = (newState) => {
    const battingTeamSummary = newState.summary[newState.currentBattingTeam];
    const bowlingTeamSummary = newState.summary[newState.currentBowlingTeam];
    if(Object.keys(bowlingTeamSummary.batting).length && (bowlingTeamSummary.totalScore < battingTeamSummary.totalScore) ){
        newState.isInningsCompleted = true;
    }
}

const addOversToBowler = (bowler) => {
    const totalBalls = bowler.bowls - (bowler.wides+bowler.nbs);
    bowler.overs = Math.floor(totalBalls / 6) +"."+ (totalBalls % 6)
};

export const runs = (newState, action) => {
    //batsmen cases

    const teamBattingSummary = battingSummary(newState);
    // teamBattingSummary.totalScore += action.bowl;
    newState.summary[newState.currentBattingTeam].totalScore += action.bowl;
    // debugger;



    //batsman changes
    const currentBatsman = currentBatsmanSummary(newState);

    if(currentBatsman) {
        currentBatsman.total += action.bowl;
        currentBatsman["s"+action.bowl]++;
        currentBatsman.bowls++;
        currentBatsman.sr = Math.floor(currentBatsman.total/currentBatsman.bowls)* 100;
    } else {
        teamBattingSummary[newState.currentBatsman] = addBatsman(action);
        teamBattingSummary[newState.currentBatsman]["s"+action.bowl]++;
    }

    //bowler cases

    const teamBowlingSummary = bowlingSummary(newState);

    const currentBowler = currentBowlerSummary(newState);

    if(currentBowler){
        currentBowler.bowls++;
        currentBowler.total += action.bowl;
        currentBowler["s"+action.bowl]++;
        addOversToBowler(currentBowler);
        // currentBowler.overs = 
    } else{
        teamBowlingSummary[newState.currentBowler] = addBowler(action);
        teamBowlingSummary[newState.currentBowler]["s"+action.bowl]++;
        addOversToBowler(teamBowlingSummary[newState.currentBowler]);
    }
    checkMatchRunsExceeded(newState);
};



export const nb = (newState, action) => {
    //batting side
    newState.summary[newState.currentBattingTeam].totalScore++;
    //bowling side
    const currentBowler = currentBowlerSummary(newState)
    if(currentBowler){
        currentBowler.nbs++;
        currentBowler.bowls++;
        currentBowler.total++;
    } else{
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler] = addBowler(action);
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler].nbs++;
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler].total = 1;
    }
    console.log("wide here ", currentBowler, newState.summary[newState.currentBowler] );
    checkMatchRunsExceeded(newState)
};

export const wide = (newState, action) => {
    //batting side
    newState.summary[newState.currentBattingTeam].totalScore++;
    //bowling side
    const currentBowler = currentBowlerSummary(newState)
    if(currentBowler){
        currentBowler.wides++;
        currentBowler.bowls++;
        currentBowler.total++;
    } else{
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler] = addBowler(action);
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler].wides++;
        newState.summary[newState.currentBowlingTeam].bowling[newState.currentBowler].total = 1;
    }
    console.log("wide here ", currentBowler);
    //match
    checkMatchRunsExceeded(newState);

}

export const changeBowler = (newState) => {
    const bowler = Math.floor(Math.random() * 11);
    if(newState.bowlingQueue[bowler] != newState.currentBowler) {
        newState.currentBowler = newState.bowlingQueue[bowler]
    } else {
        changeBowler(newState);
    }
};

export const matchReducer = (state={}, action) => {
    switch(action.type) {
        case 'NEW_MATCH' : {
            const newState = {...state};
            newState.currentBattingTeam = state.yetToBat.pop();
            newState.currentBowlingTeam = state.yetToBowl.pop();
            newState.yetToBat = state.yetToBat;
            newState.yetToBowl = state.yetToBowl;
            newState.teams = action.matchInfo.teams;
            newState.battingQueue = Object.keys(action.matchInfo.teams[newState.currentBattingTeam].players);
            newState.bowlingQueue = Object.keys(action.matchInfo.teams[newState.currentBowlingTeam].players);
            newState.battingQueue.pop();
            newState.currentBatsman = newState.battingQueue[0];
            newState.battingQueue = newState.battingQueue.slice(1,newState.battingQueue.length);
            const bowler = Math.floor(Math.random() * 11);
            newState.currentBowler = newState.bowlingQueue[bowler];
            newState.commentory.unshift(matchEvents.startMatch(newState, action.matchInfo.teams, guid()));
            newState.summary = {
                [newState.currentBowlingTeam]: { wicketsDown:0, batting: {}, bowling: {}, totalScore:0, bowls:0 },
                [newState.currentBattingTeam]: { wicketsDown:0, batting: {}, bowling: {}, totalScore:0, bowls:0 }
            };
            return newState;
        }
        case 'NEW_BOWL': {
            const newState = {...state};
            if(state.summary[state.currentBowlingTeam].bowls < (newState.noOfOvers * 6) ){
                if(action.bowl > 6) {
                    const currentBowler = newState.teams[newState.currentBowlingTeam].players[newState.currentBowler];
                    if(action.bowl == 7) {
                            // wide
                        newState.commentory.unshift(matchEvents.wide(currentBowler, guid()));
                        wide(newState, action);
                        newState.isLastBallIgnored= true;
                    }
                    if(action.bowl == 8 ) {
                        //nobe
                        newState.commentory.unshift(matchEvents.nb(currentBowler, guid()));
                        nb(newState, action);
                        newState.isLastBallIgnored= true;
                        
                    } 
                    if(action.bowl == 9) {
                        // out
                        const currentBatsman = newState.teams[newState.currentBattingTeam].players[newState.currentBatsman];
                        newState.commentory.unshift(matchEvents.out(currentBatsman, currentBowler, guid()));
                        out(newState, currentBatsman, currentBowler, action);
                        newState.summary[newState.currentBowlingTeam].bowls++;
                        newState.isLastBallIgnored= false;
                    }
    
                } else {
                    runs(newState, action);
                    newState.commentory.unshift(matchEvents.runs({ runs: action.bowl }, guid()));
                    newState.summary[newState.currentBowlingTeam].bowls++;
                    newState.isLastBallIgnored= false;
                }
    
                
                if(!newState.isLastBallIgnored && newState.summary[newState.currentBowlingTeam].bowls % 6 == 0){
                    changeBowler(newState);
                    const updatedBowler = newState.teams[newState.currentBowlingTeam].players[newState.currentBowler]
                    newState.commentory.unshift(matchEvents.changeBowler(updatedBowler, guid()));
                }

                // if(newState.summary[newState.currentBattingTeam].totalScore !== state.summary[state.currentBattingTeam].totalScore+action.bowl) {
                //     debugger;
                // }


                return newState;
            } else {
                newState.isInningsCompleted = true;
                return newState
            }

            
        }
        case 'PAUSED': {
            const newState = {...state};
            newState.isMatchPaused = action.status
            return newState
        }
        case 'START_INNINGS': {
            const newState = {...state};
            newState.currentBattingTeam = state.yetToBat.pop();
            newState.currentBowlingTeam = state.yetToBowl.pop();
            newState.yetToBat = state.yetToBat;
            newState.yetToBowl = state.yetToBowl;
            newState.battingQueue = Object.keys(action.matchInfo.teams[newState.currentBattingTeam].players);
            newState.battingQueue.pop();
            newState.bowlingQueue = Object.keys(action.matchInfo.teams[newState.currentBowlingTeam].players);
            newState.currentBatsman = newState.battingQueue[0];
            newState.battingQueue = newState.battingQueue.slice(1,newState.battingQueue.length);
            const bowler = Math.floor(Math.random() * 11);
            newState.currentBowler = newState.bowlingQueue[bowler];
            newState.commentory.unshift(matchEvents.startMatch(newState, action.matchInfo.teams, guid()));
            newState.isInningsCompleted=false;
            return newState;
        }
        case 'SET_OVERS': {
            const newState = {...state};
            newState.noOfOvers = action.overs;
            return newState;
        }
        default:
            return state;
    }
};