const initialState ={
    result:{
        Origin:{location:""},
        Destination:{location:""},
        Waypoints:[{location:""},]
    },
    DataForPlaceHolder:[{location:""}],
    DataForCompute:[],
    ReadyToCompute:false,
    DistantSummary:0
}
const reducer =(state= initialState,action)=>{
    switch(action.type){
        case `ADD_DATA`: 
            const addedState={
                ...state,
                result:action.payload.result
            };
            return addedState;
        case `COMPUTED_DATA`:
            const computedState={
                ...state,
                DataForCompute:action.payload
            };
            return computedState;
        case `READY_TO_COMPUTE`:
            const computedDistance={
                ...state,
                ReadyToCompute:action.payload
            };
            return computedDistance;
        case `DATA_FOR_PLACEHOLDER`:
            const placeholderValues={
                ...state,
                DataForPlaceHolder:action.payload
            }
            return placeholderValues;
        case `SET_DISTANT_SUM`:
            const distantsum={
                ...state,
                DistantSummary:action.payload
            }
            return distantsum;
        default:
            break;
    }
    return state;
}
export default reducer;