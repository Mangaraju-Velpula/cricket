import React from 'react';
import { connect } from 'react-redux';
import { Timeline, Row, Col } from 'antd';

class Commentory extends React.Component{
    constructor(props){
        super(props);
    };
    render() {

        const { commentory } = this.props.match;
        return(
        <Row>
            <Col span={9}></Col>
            <Col span={6}>
                <Timeline mode="left">
                    {
                        commentory.map(Comment => {
                            console.log("comment ", Comment)
                            return Comment;
                        })
                    }
                </Timeline>
            </Col>
            <Col span={9}></Col>
        </Row>
        )
    }
};

const mapStateToProps = (state) => {
    // console.log("update state is here", state.match );
    return{
        match: state.match
    }
};
export default connect(mapStateToProps)(Commentory);