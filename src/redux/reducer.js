const initialState ={
    result:{
        Origin:{location:"Bangkok"},
        Destination:{location:"Loei"},
        Waypoints:[{location:"Nakhonsawan"},{location:"Saraburi"}]
    },
    DataForCompute:[],
    ReadyToCompute:false,
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
        default:
            break;
    }
    return state;
}
export default reducer;