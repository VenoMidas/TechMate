const technicianStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TECH_STATUS':
            return action.payload;
        default:
            return state;
    };
};


export default technicianStatusReducer;