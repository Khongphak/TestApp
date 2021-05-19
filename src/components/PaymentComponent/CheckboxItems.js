import React,{useState} from 'react'

function CheckboxItems({itemID, onPressGetID}) {
    const [takeService, setTakeService] = useState(false)
    
    const handlerTakeService =(e)=>{
        setTakeService(!takeService);
        if(takeService===false){
            onPressGetID(e,false);    
        }else if(takeService===true){
            onPressGetID(e,true);
        }
       
    }
    return (
        <div>
            <button 
                style={{
                    backgroundColor:takeService ? "green" : null,
                    color:takeService ? '#FFFFFF' : null
                }} 
                onClick={()=>handlerTakeService(itemID)}>
                    take
            </button>
        </div>
    )
}

export default CheckboxItems
