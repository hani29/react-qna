import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//Passing store props to "provide" which will in return provide props to rest of the react app.
function App2(){
    return <Provider store={store}>  
        <App/>
    </Provider>
}
const initialState ={
    rData:''
}
//The reducer is a pure function that takes the previous state and an action, and returns the next stat
function reducer(state=initialState,action){
    switch(action.type){
        case 'UPDATE':
            return{
                rData:action.rData,
            }
            default:
                return state;
    }
}
const store = createStore(reducer);
ReactDOM.render(<App2 />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
