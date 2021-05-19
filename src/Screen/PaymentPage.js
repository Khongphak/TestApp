import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import _ from 'lodash';

import Banknote from '../assets/banknote.png';
import cycleArrow from '../assets/cycleArrow.png';
import parcel from '../assets/parcel.png';

import CustomButton from '../components/reusable/CustomButton';
import CustomModal from '../components/reusable/CustomModal';
import PaymentPopUp from '../components/PaymentComponent/PaymentPopUp';
import PaymentConfirmPopUP from '../components/PaymentComponent/PaymentConfirmPopUP';

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
    margin-bottom:20px;
`;
const InputSectionBottom = styled.div`
    display: flex;
    margin-top:-15px;
    margin-bottom:30px;
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

const Thumbnail = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;
function PaymentPage() {
    const history=useHistory();

    const FromStore=state=>state.DataForCompute;
    const LocationName= useSelector(FromStore);
    const DistanceFromStore=state=>state.DistantSummary;
    const DistanceSum= useSelector(DistanceFromStore);

    const [inputList, setInputList] = useState()
    const [valueServices, setValueServices] = useState();
    const [ExtraServices, setExtraServices] = useState();

    const [showModal, setShowModal] = useState(false);
    const handleShowModal=()=>setShowModal(true);
    const handleCloseModal=()=>setShowModal(false);

    const [showModal2, setShowModal2] = useState(false);
    const handleShowModal2=()=>setShowModal2(true);
    const handleCloseModal2=()=>setShowModal2(false);
    
    const CheckUser = _.map(inputList, 'user');
    const CheckMobile =_.map(inputList, 'mobile');
    const checkUndefined = !_.some(CheckUser, _.isEmpty) && !_.some(CheckMobile, _.isEmpty)
    
    const handleAdd =()=>{
        let ObjectInUseState= []
        for(let i=0; i<LocationName.length;i++){
            ObjectInUseState.push({
                user:"",
                mobile:"",
                location:LocationName[i]
            });
        }  
        setInputList(ObjectInUseState);
    }

    useEffect(() => {
        handleAdd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit=()=>{
        handleShowModal2();
    }
    
    const handleChange =(e,index)=>{
        const {name, value} =e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }
   
    const handlerComputeFee=(e)=>{
        let total;
        let COD=0;
        let RTrip=0;
        let BParcel=0;
        if(_.includes(e,1) && _.includes(e,2) && _.includes(e,3)){
            COD=50;
            RTrip=100;
            BParcel=200;
        }
        else if(_.includes(e,2) && _.includes(e,3)){
            RTrip=100;
            BParcel=200;
        }else if(_.includes(e,1) && _.includes(e,2)){
            COD=50;
            RTrip=100;
        }
        else if(_.includes(e,2)){
            RTrip=100;
        }
        else if(_.includes(e,3)){
            BParcel=200;
        }
        else if(_.includes(e,1)){
            COD=50;
        }

        total = (DistanceSum*15)+COD+RTrip+BParcel;
        return <p>{total} THB</p>
    }

    const getExtraService=(e)=>{
        setValueServices(e)
    }
    const ConfirmServices =()=>{
        handleCloseModal();
        setExtraServices(valueServices);
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
                                    <input 
                                        type="text" 
                                        name="user" 
                                        placeholder="user"
                                        onChange={(e)=>handleChange(e,index)} 
                                    />
                                </InputSubSection>
                                <InputSubSection >
                                    <input 
                                        type="text" 
                                        name="mobile"
                                        placeholder="mobile"
                                        onChange={(e)=>handleChange(e,index)} 
                                    />
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
                        {_.includes(ExtraServices,1)?<Thumbnail src={Banknote} />:null}
                        {_.includes(ExtraServices,2)?<Thumbnail src={cycleArrow} />:null}
                        {_.includes(ExtraServices,3)?<Thumbnail src={parcel} />:null}
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
                           {handlerComputeFee(ExtraServices)}
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
                                disable={!checkUndefined}
                                title="Confirm" 
                                color={!checkUndefined? 'grey': 'green'} 
                                fontColor="#FFFFFF" 
                                onPressButton={()=>handleSubmit()} 
                            />
                        </BottomSubContentContainer>   
                    </BottomContentContainer>
                </BottomContainer>
            </ContentContainer>


            <CustomModal headerTitle="Extra Services" showProps={showModal} onHide={handleCloseModal}>
                <PaymentPopUp onPressGetService={(e)=>getExtraService(e)} />
                <div style={{display:'flex',justifyContent:'center'}}>
                    <CustomButton 
                        title="Confirm" 
                        color="green" 
                        fontColor="#FFFFFF" 
                        onPressButton={()=>ConfirmServices()} 
                    />
                </div>
            </CustomModal>

            <CustomModal headerTitle="Success" showProps={showModal2} onHide={handleCloseModal2}>
                {_.isNil(inputList) ? 
                    <div>No Item</div> :
                    <div>
                        {inputList.map((item,index)=>{
                        return(
                            <div key={index}>
                                <PaymentConfirmPopUP data={item}/>
                            </div>
                        )
                    })}
                    </div>
                }
                <div style={{display:'flex',justifyContent:'center'}}>
                    <CustomButton 
                        title="Confirm" 
                        color="green" 
                        fontColor="#FFFFFF" 
                        onPressButton={()=>handleCloseModal2()} 
                    />
                </div>
            </CustomModal>
        </Container>
    )
}

export default PaymentPage
