import React from 'react'
import styled from 'styled-components';

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
function PaymentPopUp() {
    return (
        <Container>
            <ContentWrapper>
                <ContentSection>
                    <h3>Icon ... </h3>
                </ContentSection>
                <ContentSection alignLeft>
                    <h6>COD +50 THB</h6>
                </ContentSection>
                <ContentSection>
                    <p>A</p>
                </ContentSection>
            </ContentWrapper>
            <ContentWrapper>
                <ContentSection>
                    <h3>Icon ... </h3>
                </ContentSection>
                <ContentSection alignLeft>
                  <h6>Return Trip +100 THB</h6>
                </ContentSection>
                <ContentSection>
                  <p>B</p>
                </ContentSection>
            </ContentWrapper>
            <ContentWrapper>
                <ContentSection>
                    <h3>Icon ... </h3>
                </ContentSection>
                <ContentSection alignLeft>
                  <h6>Big parcel +200 THB</h6>
                </ContentSection>
                <ContentSection>
                  <p>C</p>
                </ContentSection>
            </ContentWrapper>
        </Container>
    )
}

export default PaymentPopUp
