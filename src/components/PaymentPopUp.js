import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import _ from 'lodash';

import CheckboxItems from './CheckboxItems'

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
const Data=[
    {id:1,icon:'',text:'COD +50 THB'},
    {id:2,icon:'',text:'Return Trip +100 THB'},
    {id:3,icon:'',text:'Big parcel +200 THB'},
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
                        <h3>Icon ... </h3>
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
