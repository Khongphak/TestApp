import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import _ from 'lodash';

import CheckboxItems from './CheckboxItems'

import Banknote from '../assets/banknote.png';
import cycleArrow from '../assets/cycleArrow.png';
import parcel from '../assets/parcel.png';

const Container = styled.div`
    display:flex;
    flex-direction: column;
`;
const ContentWrapper = styled.div`
    display:flex;
    padding:15px 0px;
`;
const ContentSection = styled.div`
    display:flex;
    flex:1;
    justify-content: ${(props)=>props.alignLeft ? 'flex-start': 'center'}
    
`;
const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const Data=[
    {id:1,image:Banknote,text:'COD +50 THB'},
    {id:2,image:cycleArrow,text:'Return Trip +100 THB'},
    {id:3,image:parcel,text:'Big parcel +200 THB'},
]
function PaymentPopUp({onPressGetService}) {
    const [ValueID, setValueID] = useState([]);
    const handlerGetID=(id,Remove)=>{
        const ExtraOptionsID = [...ValueID];
        let uniqValue=[]
        if(!Remove){
            ExtraOptionsID.push(id);
            uniqValue=_.uniq(ExtraOptionsID)
            setValueID(uniqValue); 
        }else if(Remove){
            const index = ExtraOptionsID.indexOf(id);   
            ExtraOptionsID.splice(index,1);
            setValueID(ExtraOptionsID)
        }
            
    }
    useEffect(()=>{
        onPressGetService(ValueID); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ValueID])

    return (
        <Container>
            {Data.map((item,index)=>{
                return(
                <ContentWrapper key={index}>
                    <ContentSection>
                        <Thumbnail src={item.image} alt="test"/>
                    </ContentSection>
                    <ContentSection alignLeft>
                        <h6>{item.text}</h6>
                    </ContentSection>
                    <ContentSection>
                        <CheckboxItems 
                            itemID={item.id}
                            onPressGetID={(e,r)=>handlerGetID(e,r)} 
                        />
                    </ContentSection>
                </ContentWrapper>
                )
            })}
        </Container>
    )
}

export default PaymentPopUp
