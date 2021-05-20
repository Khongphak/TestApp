import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import _ from 'lodash';

import Banknote from '../assets/banknote.png';
import cycleArrow from '../assets/cycleArrow.png';
import parcel from '../assets/parcel.png';
import AddIcon from '../assets/AddIcon.png';

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
    margin-bottom:15px; 
`
const BottomSubContentContainer = styled.div`
    display:flex;
    flex:1;
    padding:0px 15px;
    justify-content:${(props)=>props.alignRight? 'flex-end': 'flex-start'};
`;

const Thumbnail = styled.img`
  width: ${(props)=>props.wide?props.wide:'90px'};
  height: ${(props)=>props.high?props.high:'90px'};
  margin-left:15px;
  border-radius: 10px;
`;

const TextSection = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:15px;
  
`;
const TextContentContainer = styled.div`
    display:flex;
    flex:0.6;
    justify-content: flex-end;
    padding:15px;
`;
const TextSubContent = styled.div`
    display-flex;
    flex:1;
    text-align:${(props)=>props.AlignRight?'right':'left'};
`;
function PaymentPage() {
    const history=useHistory();
    const dispatch=useDispatch();

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

    const handleRemoveService=(id)=>{
        let ServiceList =[...ExtraServices]
        let ServicesLeft= _.remove(ServiceList,function(e){
            return e!==id;
        })
        setExtraServices(ServicesLeft)
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
        return `${total} THB`
    }

    const getExtraService=(e)=>{
        setValueServices(e)
    }
    const ConfirmServices =()=>{
        handleCloseModal();
        setExtraServices(valueServices);
    }
    const handlerSubmit=()=>{
        console.log(inputList);
        console.log(DistanceSum);
        console.log(handlerComputeFee(ExtraServices));
        let AllSummary={
            Reciever:inputList,
            Distant:DistanceSum,
            Price:handlerComputeFee(ExtraServices)
        }
        dispatch({type:'SET_SUMMARY_DATA',payload:AllSummary})
        history.push('/');
       
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
                                        type="number" 
                                        pattern="[0-9]*"
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
                        <div style={{display:'flex',alignItems:'center'}}>
                            <h4>Extra services</h4>
                            
                            <Thumbnail wide="40px" high="40px" src={AddIcon} onClick={()=>handleShowModal()} />
                        </div>
                        
                    </MiddleContentContainer>
                    <MiddleContentContainer>
                        {_.includes(ExtraServices,1)?<Thumbnail src={Banknote} onClick={()=>handleRemoveService(1)} />:null}
                        {_.includes(ExtraServices,2)?<Thumbnail src={cycleArrow} onClick={()=>handleRemoveService(2)} />:null}
                        {_.includes(ExtraServices,3)?<Thumbnail src={parcel} onClick={()=>handleRemoveService(3)} />:null}
                        {!_.isEmpty(ExtraServices)?<sup>*click for deleting</sup>:null}
                    </MiddleContentContainer>
                </MiddleContainer>
                <BottomContainer>
                    <BottomContentContainer>
                        <BottomSubContentContainer>
                            <h6>Total distance</h6>
                        </BottomSubContentContainer>
                        <BottomSubContentContainer alignRight>
                            <p>{DistanceSum} KM</p>
                        </BottomSubContentContainer>
                    </BottomContentContainer>
                    <BottomContentContainer>
                        <BottomSubContentContainer>
                            <h6>Fee</h6>
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
                        <TextSection> 
                           <TextContentContainer>
                            <TextSubContent>
                                <h5>Total distance </h5>
                                <h5>Total price is </h5>
                            </TextSubContent>
                            <TextSubContent AlignRight>
                                <h5>{DistanceSum} KM</h5>
                                <h5>{handlerComputeFee(ExtraServices)}</h5>
                            </TextSubContent>
                           </TextContentContainer>   
                        </TextSection>
                    </div>
                    
                }
                <div style={{display:'flex',justifyContent:'center'}}>
                    <CustomButton 
                        title="Confirm" 
                        color="green" 
                        fontColor="#FFFFFF" 
                        onPressButton={()=>handlerSubmit()} 
                    />
                </div>
            </CustomModal>
        </Container>
    )
}

export default PaymentPage
