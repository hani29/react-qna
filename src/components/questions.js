import React, { Component } from 'react';
import {connect} from 'react-redux';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success:false,
            questList: [
                {
                    "question": "Q: What is the name of the biggest part of the human brain?",
                    "options": ["Cerebrum", "Thalamus"],
                    "answers": [1],
                    "Feedback": "Cerebrum is correct answer."
                },
                {
                    "question": "Q: The shape of DNA is known as?",
                    "options": ["Double helix", "Adenine helix"],
                    "answers": [0],
                    "Feedback": "Adenine helix is correct answer."
                },
                {
                    "question": "Q: The muscles found in the front of your thighs are known as what?",
                    "options": ["Adductor", "Petella"],
                    "answers": [1],
                    "Feedback": "Adductor is correct answer."
                }
            ]
        }
    }
    getData=(event)=>{
        event.preventDefault();
        const {questList}=this.state;
        let questList_len = questList.length;
        let correctAns =1;
        let newData = []
        for(let i=0;i<questList_len;i++){
            let val =document.getElementById("select-"+i).value;
            if(val == questList[i].answers[0]){
                correctAns++;

            }
            newData.push(val);
            console.log("correctAns =", correctAns)
        }
        this.setState({
            success:true
        })
        this.props.dispatch({type:"UPDATE",rData:JSON.stringify(newData)})
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.getData}>
              {this.state.questList.map((item,index)=>{
                return <QuestionData question={item.question} options={item.options} key1={"select-"+index} key={index} />
              })} 
              <div style={{marginTop:20}}>
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
              </div>
              </form>

              {this.state.success && <div className="success">
Successfully submitted!
              </div>}
            </div>

            
        )
    }
}

class QuestionData extends Component {
    render() {
        
    const {question,options,key1} = this.props
        return (
            <div>
                <p>{question}</p>
                <select id={key1}>
                    <option value={0} name="question">
                        {options[0]}
                    </option>
                    <option value={1} name="question">
                        {options[1]}
                    </option>
                </select>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        rData:state.rData,
    }
}
export default connect(mapStateToProps)(Questions);
