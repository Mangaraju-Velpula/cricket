import React from 'react';
import {Table} from 'antd';
import { connect } from 'react-redux';

const { Column  } = Table;

class BowlingScoreCard extends React.Component {
    render() {
        const { scoreCardTable } = this.props;
        return(
            <Table
                dataSource = { scoreCardTable }
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
        )
    }
};
const mapStateToProps = (state) => {
    const { match, teams } = state;
    const currentBowlingTeamSummary = match.summary[match.currentBowlingTeam];
    if(!currentBowlingTeamSummary) {
        return []
    } else {
        const bowlingSummary = currentBowlingTeamSummary.bowling;
        const scoreCardTable = Object.keys(bowlingSummary).map(key => {
            return {...bowlingSummary[key], ...teams[match.currentBowlingTeam].players[key]};
        });
        return {scoreCardTable};
    }
};
export default connect(mapStateToProps)(BowlingScoreCard);