import React from 'react';
import {Table, Space, Button} from 'antd';
import { connect } from 'react-redux';

const { Column  } = Table;

class BattingScoreCard extends React.Component {
    render() {
        const { scoreCardTable } = this.props;
        return(
            <Table
                dataSource = { scoreCardTable }
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
        )
    }
};
const mapStateToProps = (state) => {
    const { match, teams } = state;
    const currentBattingTeamSummary = match.summary[match.currentBattingTeam];
    if(!currentBattingTeamSummary) {
        return []
    } else {
        const battingSummary = currentBattingTeamSummary.batting;
        const scoreCardTable = Object.keys(battingSummary).map(key => {

            return {...battingSummary[key], ...teams[match.currentBattingTeam].players[key]};
        });
        return {scoreCardTable};
    }
};
export default connect(mapStateToProps)(BattingScoreCard);