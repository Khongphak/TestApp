import React,{useState} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';


import AddIcon from '../../assets/AddIcon.png';
import RemoveIcon from '../../assets/RemoveIcon.png';
import GoIcon from '../../assets/GoIcon.png';

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

const ButtonSection = styled.div`
    display:flex;
    flex-direction: column;
    margin-top:-5px;
    margin-right:15px;  


`; 
const InputStyled = styled.input`
    display:flex;
    flex:1;
`;

const Thumbnail = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10px;
`;

function InputLocation() {
    const ReadytoCompute = state => state.ReadyToCompute;
    const CheckToCompute = useSelector(ReadytoCompute);
    const DataFromStore = state => state.DataForPlaceHolder;
    const DataForPlaceHolder = useSelector(DataFromStore);
    const [inputList, setinputList] = useState(DataForPlaceHolder);
    const dispatch = useDispatch();

    let mappItem=inputList.map((item)=>item.location);
    const lastIndex=mappItem[mappItem.length-1]
    console.log(_.isEmpty(lastIndex));

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
        const PreparedData=_.map(inputList, 'location')

        dispatch({type: 'ADD_DATA', payload: {result}});
        dispatch({type:'COMPUTED_DATA', payload: PreparedData});
        dispatch({type:'READY_TO_COMPUTE', payload: !CheckToCompute});
        dispatch({type:'DATA_FOR_PLACEHOLDER', payload: inputList})
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
                                        // placeholder={DataForPlaceHolder[index]}
                                        value={item.location}
                                        onChange={(e)=>handleChange(e,index)} 
                                    />
                                </div>        
                            </SubBodyContent>
                            <SubBodyContent>
                                <ButtonSection>
                                    {index !== 0 &&(
                                        <Thumbnail src={RemoveIcon} alt="test" onClick={()=>handleRemoveInput(index)}/>    
                                    )}
                                    {inputList.length-1 === index &&  
                                        <Thumbnail src={AddIcon} alt="test" onClick={handleAddInput}/>  
                                    } 
                                    {inputList.length-1 === index && index !== 0 &&  !_.isEmpty(lastIndex) &&
                                        <Thumbnail src={GoIcon} alt="test" onClick={handleFormat }/>
                                    } 
                                </ButtonSection>
                            </SubBodyContent>        
                        </SubBodySection>
                    </BodySection>
                );
            })}
           </SubContainer>
           </ContentContainer>
        </Container>
    )
}

export default InputLocation
