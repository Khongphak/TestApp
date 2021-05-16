import React,{useState} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import MyMapComponent from './MyMapComponent';

const Container = styled.div`
    display:flex;
    padding-top:15px;
    justify-content:center;
`;
const ContentContainer = styled.div`
    display:flex;
    justify-content:center;
    z-index:1;
`;
const SubContainer = styled.div`
    display:flex;
    flex-direction:column;
`;
const MapArea = styled.div`
    position: absolute;
    margin-top:30px;
    width:800px;
    height:500px;
    z-index:-1;
    align-items:center;
    justify-content: center;
    background:purple;
`;
const BodySection = styled.div`
    display:flex;
    padding:0px 5px 5px 5px;
`;

const SubBodySection = styled.div`
    display:flex;
    flex:1; 
`;

const SubBodyContent = styled.div`
    display:flex;
    flex:1;
    justify-content:center;
`;
const SubBodyContent2 = styled.div`
    display:flex;
    flex:1;
    justify-content:center;
`;

const ButtonSection = styled.div`
    display:flex;
    flex-direction: column;
    margin-right:15px;  
`; 
const InputStyled = styled.input`
    display:flex;
    flex:1;
`;

const FromStore = state => state.result;

function InputLocation() {
    const [inputList, setinputList] = useState([{location:""}]);
    const dispatch = useDispatch();
    const test = useSelector(FromStore);
    console.log("FromStore: ",test)
    const handleChange =(e,index)=>{
        const {name, value} =e.target;
        const list = [...inputList];
        list[index][name] = value;
        setinputList(list);
    }
    const handleAddInput=()=>{
        setinputList([...inputList,{location:""}]);
    }
    const handleRemoveInput=(index)=>{
        const list = [...inputList];
        list.splice(index,1);
        setinputList(list);
    }
    const handleFormat=()=>{
        let result={};
        const Origin = inputList[0];
        const lastValueIndex = inputList[inputList.length-1];
        const Destination = _.isEmpty(lastValueIndex.location) ? inputList[inputList.length-2] : lastValueIndex
        let Waypoints;
        if(inputList.length>2 && !_.isEmpty(lastValueIndex.location)){
            Waypoints=inputList.slice(1,-1);
        }else if(inputList.length>2 && _.isEmpty(lastValueIndex.location)){
            Waypoints=inputList.slice(1,-2);
        }
        result={
            Origin:Origin,
            Destination:Destination,
            Waypoints:Waypoints
        }

        dispatch({type: 'ADD_DATA', payload: {result}})
        return result
    }
   
    return (
        <Container>
            <ContentContainer>
            <SubContainer> 
            {inputList.map((item, index)=>{
                return (
                    <BodySection key={index}>
                        <SubBodySection> 
                            <SubBodyContent>
                                <div style={{marginRight:15}}>
                                    <InputStyled 
                                        type="text" 
                                        name="location"  
                                        placeholder="location" 
                                        value={item.location}
                                        onChange={(e)=>handleChange(e,index)} 
                                    />
                                </div>        
                            </SubBodyContent>
                            <SubBodyContent2>
                                <ButtonSection>
                                    {index !== 0 &&(
                                        <Button
                                            variant="danger"
                                            onClick={()=>handleRemoveInput(index)} 
                                        >Remove</Button>              
                                    )}
                                    {inputList.length-1 === index &&  
                                        <>
                                            <Button
                                                variant="success"
                                                onClick={handleAddInput} 
                                            >ADD</Button>
                                            <Button
                                                variant="primary"
                                                onClick={handleFormat} 
                                            >Test</Button>
                                        </>
                                    } 
                                </ButtonSection>
                            </SubBodyContent2>        
                        </SubBodySection>
                    </BodySection>
               
                );
            })}
           </SubContainer>
           {/* <MapArea>
               <MyMapComponent/>
           </MapArea> */}
           <MapArea/>
           </ContentContainer>
        </Container>
    )
}

export default InputLocation
