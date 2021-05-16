const initialState ={
    result:{
        Origin:{location:"Bangkok"},
        Destination:{location:"Loei"},
        Waypoints:[{location:"Nakhonsawan"},{location:"Saraburi"}]
    }
}
const reducer =(state= initialState,action)=>{
    switch(action.type){
        case `ADD_DATA`: 
            const addedState={
                ...state,
                result:action.payload.result
            };
            console.log('Check action FromReducer', addedState)
            return addedState;
        default:
            break;
    }
    return state;
}
export default reducer;