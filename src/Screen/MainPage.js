import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import CustomButton from '../components/reusable/CustomButton';
import MyMapComponent from '../components/MainPageComponent/MyMapComponent';
import DistantCompute from '../components/MainPageComponent/DistantCompute';
import InputLocation from '../components/MainPageComponent/InputLocation';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    z-index:-1;
    margin-top:15px;
`;
const TopContent = styled.div`
    display:flex;
    justify-content:center;
`;
const TopContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:15px;
    z-index:1;
`;
const MiddleContent = styled.div`
   display:flex;
   flex-direction:column;
   position: absolute;
   margin-top:35%;
   padding:15px;
`;
const MapSection = styled.div`
    display:flex;
    width:800px;
    height:550px;
`;

const MapBottomContent = styled.div`
    display:flex;
    width:100%;
    z-index:1;
`;

const MapBottomSection = styled.div`
    display:flex;
    flex:1;
    justify-content: ${(props)=>props.AlignLeft? 'flex-start': 'flex-end'};
`;
function MainPage() {
    const history=useHistory();
    const FromState = state=>state.DataForCompute;
    const DataFromState = useSelector(FromState);

    return (
        <Container>
            <TopContent>
                <TopContentWrapper>
                    <InputLocation/>
                </TopContentWrapper>
            </TopContent>
            <MiddleContent>
                <MapSection>
                    <MyMapComponent/>
                </MapSection>
                <MapBottomContent>
                    <MapBottomSection AlignLeft>
                       <DistantCompute/>
                    </MapBottomSection>
                    <MapBottomSection>
                        <CustomButton
                            disable={_.isEmpty(DataFromState)}
                            onPressButton={()=>history.push('/payment')} 
                            title="Next" 
                            fontColor="#FFFFFF" 
                            color={_.isEmpty(DataFromState) ? 'grey' : 'green'}
                        />
                    </MapBottomSection>
                </MapBottomContent>
            </MiddleContent>
        </Container>
    )
}

export default MainPage
