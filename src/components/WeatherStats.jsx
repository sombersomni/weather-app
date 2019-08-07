import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const StatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;
const Stat = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 10px 5px 10px;
`;

const StatText = styled.h1`
    margin: -5px 0px;
    padding-bottom: 10px;
`;

const StatTitle = styled.h5`
    background: white;
    padding: 5px;
    border-radius: 5px;
`;
export default function WeatherStats({wind, windDir, elevation}) {
    console.log(elevation)
    const windStat = wind.split(' ');
    const windSpeed = windStat[0].trim();
    const windSpeedUnit = windStat[1].trim();
    const { value, unitCode } = elevation;
    const elevationUnit = unitCode.slice(5);
    return (
        <StatsContainer>
            <Stat>
                <StatTitle>Wind Speed</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    icon={['fad', 'wind']} />
                    <StatText>
                        {windSpeed} 
                        <span style={{ fontSize: '0.5em'}}>
                            {windSpeedUnit}
                        </span>
                    </StatText>
            </Stat>
            <Stat>
                <StatTitle>Wind Direction</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    icon={['fad', 'compass']} />
                    <StatText>
                        {windDir} 
                    </StatText>
            </Stat>
            <Stat>
                <StatTitle>Elevation</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    icon={['fad', 'mountains']} />
                     <StatText>
                        {value.toFixed(2)} 
                        <span style={{ fontSize: '0.5em'}}>
                            {elevationUnit}
                        </span>
                    </StatText>
            </Stat>
        </StatsContainer>
    )
}