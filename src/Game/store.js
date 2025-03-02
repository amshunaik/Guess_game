import {createStore} from 'redux'

const counterred=(state={totscore:0},action)=>{
    if(action.type==='updated'){
        return{
            totscore:state.totscore+action.val,
        };
    }
    return state;
};

const store=createStore(counterred);

export default store;