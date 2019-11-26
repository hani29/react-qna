import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from 'react-bar-chart';
import questList from './Data' //Importing question, answers and options from data.js file.

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            width: 500,
            correctAnswer:0,
            incorrectAnswer: 0,
            reset: false,
            isgraph:false,
          
        }
    }
    
    // Get and set data into form and graph
    getData = (event) => {
        event.preventDefault();
        let questList_len = questList.length;
        let correctAns = 0;
        let newData = []
        for (let i = 0; i < questList_len; i++) {
            let val = document.getElementById("select-" + i).value;
            if (val == questList[i].answers[0]) {
                correctAns++;
            }
            //This is for validation
            if (val == 'select') {
                document.getElementById("quest-" + i).style.color = 'red'
                this.setState({
                    isgraph: false
                })
            }
            else {
                document.getElementById("quest-" + i).style.color = 'white';
                this.setState({
                    isgraph: true
                })
            }
            // Push the data into an array
            newData.push(val);
            console.log("correctAns =", correctAns)
        }
        this.setState({
            success: true,
            correctAnswer:correctAns,
            incorrectAnswer:questList_len-correctAns
        })
        this.props.dispatch({ type: "UPDATE", rData: JSON.stringify(newData) }) //Sending data to different pages [for future use when work with multiple pages]
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    //This is written to reset all values and graph
    reset=(event)=>{
        event.preventDefault();
        let questList_len = questList.length;
        for (let i = 0; i < questList_len; i++) {
            let val = document.getElementById("select-" + i).value;
            document.getElementById("select-" + i).value ="select";
            if (val == 'select') {
                document.getElementById("quest-" + i).style.color = 'white'
            }
        }
            this.setState({reset: true,correctAnswer:0,incorrectAnswer:0})
    }
    render() {
           //Destructure state
           const{isgraph,correctAnswer,incorrectAnswer}=this.state; 

        //Setting the graph data/value
        const data = [
            { text: 'correct', value: correctAnswer },
            { text: 'wrong', value: incorrectAnswer}
        ];
     
        return (
            <div className='main'>
                <form onSubmit={this.getData}>
                    {questList.map((item, index) => {
                        return <QuestionData question={item.question} options={item.options} key1={"select-" + index}
                            key2={"quest-" + index} key={index} />
                    })}
                    <div style={{ marginTop: 20 }}>
                        <button type="submit" className='btn1' style={{ backgroundColor: '#4CAF50' }}>Submit</button>
                        <button type="reset" onClick={this.reset} className='btn1' style={{ backgroundColor: 'red' }}>Reset</button>
                    </div>
                </form>
           {isgraph &&
                    <div style={{ width: '50%' }}>
                        <BarChart ylabel='Number'
                            width={this.state.width}
                            height={500}
                            margin={margin}
                            data={data} />
                </div>}
            </div>
        )
    }
}


class QuestionData extends Component {
    render() {
        const { question, options, key1, key2 } = this.props
        return (
            <div >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.81)', color: 'white', padding: '0px', border: '1px solid black' }}>
                    <p id={key2}>{question}</p>
                </div>
                <div className='questions' style={{ marginBottom: 40 }}>
                    <select id={key1}>
                        <option value='select'>select</option>
                        <option value={0} name="question">
                            {options[0]}
                        </option>
                        <option value={1} name="question">
                            {options[1]}
                        </option>
                    </select>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        rData: state.rData,
    }
}

export default connect(mapStateToProps)(Questions);
