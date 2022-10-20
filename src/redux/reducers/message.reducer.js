const messageStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return action.payload;
        default:
            return state;
    };
};

// status will be on the redux state at:
// state.status
export default messageStatusReducer;