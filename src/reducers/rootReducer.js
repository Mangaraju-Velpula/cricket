import { combineReducers } from 'redux';
import { matchReducer as match } from './matchReducer';

const teams = (state= {}) => {
    return state;
};

export default combineReducers({ 
            teams, 
            match,
});