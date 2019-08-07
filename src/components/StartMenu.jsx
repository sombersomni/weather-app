import React from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justiy-content: center;
    align-items: center;
    width: 300px;
`;
export default function StartMenu({setStart}) {
    return (
        <Container>
            <h1>Quiz App Demo</h1>
            <p>Created this component to allow for creating easy Quizes with barely any work</p>
            <Button onClick={() => { setStart(true) }}>Start</Button>
        </Container>
    )
}