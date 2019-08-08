import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const Message = styled.h5`
  opacity: 0.8;
  width: 200px;
  font-weight: 100;
`;

const LoadContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function LoadScreen({ message, isCoords, isGeo, retry }) {
    const [lattitude, setLattitude] = useState('');
    const [longitude, setLongitude] = useState('');
    return (
        <LoadContainer>
            <h1 style={{ fontFamily: 'Bungee Shade' }}> Weather Report</h1>
            <h3 style={{ marginTop: -10 }}>A React App Demo</h3>
            {isGeo || isCoords ? <Message>{message}</Message> : null}
            {isCoords ? (<div>
                <Button
                    onClick={() => { retry(34.068038, -118.403659) }}
                    variant="outlined"
                    color="primary">Los Angeles Example</Button>
                <div>
                    <br />
                    <Input
                        onChange={e => { setLattitude(e.target.value)}}
                        placeholder="Enter Lattitude"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                    />
                    <Input
                        onChange={e => { setLongitude(e.target.value)}}
                        placeholder="Enter Longitude"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                    />
                    <Button
                    onClick={() => { retry(lattitude.trim(), longitude.trim()) }}
                    variant="outlined"
                    color="default">Get Weather</Button>
                </div>
            </div>) : null}
        </LoadContainer>
    )
}