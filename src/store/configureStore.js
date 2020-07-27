import {createStore,compose,applyMiddleware} from 'redux';
import { guid } from '../commonUtils/commonMethods';
import rootReducer from '../reducers/rootReducer';


const getInitailState = () =>({
    teams : {
        team_a : {
            players: {
                [guid()] : {
                    name: 'Ms Dhoni',
                },
                [guid()] : {
                    name: 'Suresh Raina',
                },
                [guid()] : {
                    name: 'Dwayne Bravo',
                },
                [guid()] : {
                    name: 'Francois Du Plessis',
                },
                [guid()]: {
                    name: 'Ravindra Jadeja',
                },
                [guid()] : {
                    name: 'Shane Watson',   
                }, 
                [guid()] : {
                    name: 'Ambati Rayudu',
                },
                [guid()] : {
                    name: 'Imran Tahir',
                },
                [guid()] : {
                    name: 'Murali Vijay',
                },
                [guid()] : {
                    name: 'Deepak Chahar',
                },
                [guid()] : {
                    name: 'Harbhajan Singh',
                }
            },
            name: 'Chennai Super Kings',
        },
        team_b: {
            players: {
                [guid()] : {
                    name: 'David Warner',
                }, 
                [guid()] : {
                    name: 'Kane WilliamSon',
                },
                [guid()] : {
                    name: 'Rashid Khan'
                },
                [guid()] : {
                    name: 'Bhuvneshwar Kumar',
                },
                [guid()]: {
                    name: 'Manish Pandey',
                },
                [guid()] : {
                    name: 'Vijay Sankar',
                },
                [guid()] : {
                    name: 'Siddarth Kaul',
                },
                [guid()] : {
                    name: 'Abhishekh Sharma',
                },
                [guid()] : {
                    name: 'Sandeep Sharma',
                },
                [guid()] : {
                    name: 'Mohamad Nabi',
                },
                [guid()]: {
                    name: 'Priyam Garg',
                }
            },
            name: 'Sunrisers Hyderabad'
        }
    },
    match: {
        currentBattingTeam: null,
        currentBowlingTeam: null,
        yetToBat: ['team_a', 'team_b'],
        yetToBowl: ['team_b', 'team_a'],
        matchBetween: {
            firstTeam: 'team_a',
            secondTeam: 'team_b'
        },
        commentory:[],
        summary: {},
        isMatchPaused: false,
        isInningsCompleted: false,
    },
    
});

const initialState = getInitailState();
console.log(guid(), initialState);
export function configureStores(initialState){
    return createStore(
        rootReducer,
        initialState
    )
}

export default configureStores(initialState);