import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
    font-size: 1em;
`;
export default function AnswerMessage({ show, correct, answer }) {
    return (
        <Message>
            { show ? (correct ?  'Well done!' : `The answer is ${answer}`) : null}
        </Message>
    )
}