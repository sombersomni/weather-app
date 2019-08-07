import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.input`
    min-width: 200px;
    max-width: 80vw;
    padding: 5px;
    border-radius: 5px;
`;

export default function InputChoice({setInputAnswer}) {
    return (
        <React.Fragment>
            <InputContainer 
                type='text' 
                placeholder='Type your answer here'
                onChange={e => { setInputAnswer(e.target.value) }}/>
        </React.Fragment>
    )
}