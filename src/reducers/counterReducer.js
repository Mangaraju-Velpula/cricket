
const admin = (state = {}, action) => {
    console.log("stat is here ", state);
    switch(action.type) {
        case 'INCREMENT': {
            console.log("Increment Reducer")
            return state+1;
        }
    }
	return state;
};

export default admin;
