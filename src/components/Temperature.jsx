import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TempContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    align-items: top;
    justify-content: center;
    background: #00A9FC;
    width: 50px;
    height: 50px;
`;

const IconContainer = styled.div`
    display: block;
    position: relative;
`;

export default function Temperature({temperature, unit}) {
    return (
        <div>
            <h5>temperature</h5>
            <TempContainer>
                <h1>{temperature}</h1>
                <IconContainer>
                    <h5>{unit} 
                    <FontAwesomeIcon
                        size='1x'
                        style={{ 
                            fontSize: '0.5em',
                            position: 'absolute',
                            marginLeft: 2
                        }}
                        icon={['far', 'circle']} />
                        </h5>      
                </IconContainer>
            </TempContainer>

        </div>
    )
}