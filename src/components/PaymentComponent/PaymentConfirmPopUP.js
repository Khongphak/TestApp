import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
    padding:15px;
  
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
                    <div> name:</div>
                    <div> mobile:</div>
                    <div> location:</div>  
                </SubContent>
                <SubContent>
                    <div> {data.user}</div>
                    <div> {data.mobile}</div>
                    <div> {data.location}</div>  
                </SubContent>
            </ContentContainer>
        </Container>
    )
}

export default PaymentConfirmPopUP
