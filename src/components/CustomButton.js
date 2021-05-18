import React from 'react'
import styled from 'styled-components';
const Container = styled.div`
    display:flex;
    width:200px;
    height:30px;
    justify-content: center;
    align-items:center;
    border-radius:5px;
    background-color: ${(props)=> props.color || '#ebeced'};
`;
const TextButton = styled.div`
    color: ${(props)=> props.fontColor || null};
`;
function CustomButton({title, onPressButton, color,fontColor, disable}) {
    return (
        <Container color={color} onClick={disable?null:onPressButton}>
            <TextButton fontColor={fontColor}>{title}</TextButton>
        </Container>
    )
}

export default CustomButton
