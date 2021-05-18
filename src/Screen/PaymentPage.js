import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import {Modal} from 'react-bootstrap';

import CustomButton from '../components/CustomButton'
import PaymentPopUp from '../components/PaymentPopUp'
const Container = styled.div`
    display:flex;
    justify-content: center;
    margin-top:15px;
`;
const ContentContainer = styled.div`
    display: flex;
    flex-direction:column;

`;
const TopContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:30px;
`;
const TopContentContainer = styled.div`
    display:flex;
`;
const InputSection = styled.div`
    display:flex;
    flex-direction:column;
    padding:0px 15px;
`;
const InputSectionTop = styled.div`
    display:flex;
`;
const InputSectionBottom = styled.div`
    display: flex;
    margin-top:-15px;
    margin-bottom:15px;
    align-self:center; 
    padding:0px 15px;
`;
const InputSubSection = styled.div`
    display:flex;
    background-color: yellow;
    align-items:${(props)=>props.alignRight? 'flex-end': 'center'};   
    margin-right:15px
    
`;

const MiddleContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom:15px;
`;
const MiddleContentContainer = styled.div`
    display: flex;
    margin-bottom:15px;
    padding:0px 15px;
`;
const BottomContainer = styled.div`
    display:flex;
    flex-direction: column;
`;

const BottomContentContainer = styled.div`
    display:flex; 
`
const BottomSubContentContainer = styled.div`
    display:flex;
    flex:1;
    padding:0px 15px;
    justify-content:${(props)=>props.alignRight? 'flex-end': 'flex-start'};
`;
function PaymentPage() {
    const history=useHistory();

    const FromStore=state=>state.DataForCompute;
    const LocationName= useSelector(FromStore);
    const DistanceFromStore=state=>state.DistantSummary;
    const DistanceSum= useSelector(DistanceFromStore);
    console.log('DistanceSum', DistanceSum);

    const [showModal, setShowModal] = useState(false);
    const handleShowModal=()=>{
        setShowModal(true);
    }
    const handleCloseModal=()=>{
        setShowModal(false)
    }
    const handlerComputeFee=()=>{
        let total;
        total = DistanceSum*15;
        return (
            <p>{total} THB</p>
        )
    }
    const RenderLocation=()=>{
        return( 
            <>
                {LocationName.map((item,index)=>{
                    return(
                        <TopContentContainer key={index}>
                        <InputSection >
                            <InputSectionTop>
                                <h3>{item}</h3>
                            </InputSectionTop>
                            <InputSectionBottom>
                                <InputSubSection>
                                    <input/>
                                </InputSubSection>
                                <InputSubSection >
                                    <input/>
                                </InputSubSection>
                            </InputSectionBottom>
                        </InputSection>
                        </TopContentContainer>
                    )
                })}
            </>
        )
    }
    return (
        <Container>
            <ContentContainer>
                <TopContainer>
                   {RenderLocation()}
                </TopContainer>
                <MiddleContainer>
                    <MiddleContentContainer>
                        <p>Extra services</p>
                        <CustomButton 
                            title="Extra Services" 
                            onPressButton={()=>handleShowModal()} 
                        />
                    </MiddleContentContainer>
                    <MiddleContentContainer>
                        <p>div</p>
                        <p>div</p>
                    </MiddleContentContainer>
                </MiddleContainer>
                <BottomContainer>
                    <BottomContentContainer>
                        <BottomSubContentContainer>
                            <p>Total distance</p>
                        </BottomSubContentContainer>
                        <BottomSubContentContainer alignRight>
                            <p>{DistanceSum} KM.</p>
                        </BottomSubContentContainer>
                    </BottomContentContainer>
                    <BottomContentContainer>
                        <BottomSubContentContainer>
                            <p>Fee</p>
                        </BottomSubContentContainer>
                        <BottomSubContentContainer alignRight>
                           {handlerComputeFee()}
                        </BottomSubContentContainer>    
                    </BottomContentContainer>
                    <BottomContentContainer>
                        <BottomSubContentContainer>
                            <CustomButton 
                                title="Back" 
                                onPressButton={()=>history.push('/')}
                            />
                        </BottomSubContentContainer>  
                        <BottomSubContentContainer>
                            <CustomButton 
                                title="Confirm" 
                                color="green" 
                                fontColor="#FFFFFF" 
                                onPressButton={()=>console.log("Confrim")} 
                            />
                        </BottomSubContentContainer>   
                    </BottomContentContainer>
                </BottomContainer>
            </ContentContainer>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body style={{justifyItems:'center'}} >
                    <h1>Extra Services</h1>
                    <PaymentPopUp/>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <CustomButton 
                            title="Confirm" 
                            color="green" 
                            fontColor="#FFFFFF" 
                            onPressButton={()=>handleCloseModal()} 
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default PaymentPage
