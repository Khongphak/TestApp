import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:15px;
  
`;
const ContentContainer = styled.div`
    display:flex;
    flex:0.5;
    justify-content: flex-end;

`;
const SubContent = styled.div`
    display-flex;
    flex:1;
 
`;

function PaymentConfirmPopUP({data}) {
    return (
        <Container>
            <ContentContainer>
                <SubContent>
                    <h5> name:</h5>
                    <h5> mobile:</h5>
                    <h5> location:</h5>  
                </SubContent>
                <SubContent>
                    <h5> {data.user}</h5>
                    <h5> {data.mobile}</h5>
                    <h5> {data.location}</h5>  
                </SubContent>
            </ContentContainer>
        </Container>
    )
}

export default PaymentConfirmPopUP
