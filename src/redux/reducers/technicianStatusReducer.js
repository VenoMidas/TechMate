const technicianStatusReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TECH_STATUS':
            return action.payload;
        default:
            return state;
    };
};

// techStatus will be on the redux state at:
// state.techStatus
export default technicianStatusReducer;