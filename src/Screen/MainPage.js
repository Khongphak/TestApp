import React from 'react';
import styled from 'styled-components';

import MyMapComponent from '../components/MyMapComponent';
import DistantCompute from '../components/DistantCompute';
import CustomButton from '../components/CustomButton';
import InputLocation from '../components/InputLocation';

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
                        <CustomButton title="Next" fontColor="#FFFFFF" color="green" />
                    </MapBottomSection>
                </MapBottomContent>
            </MiddleContent>
        </Container>
    )
}

export default MainPage
