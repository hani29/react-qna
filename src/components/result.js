import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.dispatch({type:"UPDATE",rData:"Hi"})
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    render() {
        return (
            <div className="Result">
                <div>
                    hi bixby
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        rData: state.rData,
    }
}
export default connect(mapStateToProps)(Result);
