import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import convertDegs from '../helper/convertDegs';
import { rotate } from './Animations';

const ForecastIcon = styled.div`
    animation: ${props => Math.round(1/props.speed * 4) || 4}s ${rotate} ease-in-out both;
`;

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
export default function WeatherStats({wind, windDir, elevation, heatIndex, humidity}) {
    const windStat = wind.split(' ');
    const windSpeed = windStat[0].trim();
    const windSpeedUnit = windStat[1].trim();
    return (
        <StatsContainer>
            <Stat>
                <StatTitle>Wind Speed</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    style={{ color: '#009CFC'}}
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
                <ForecastIcon 
                    speed={parseInt(windSpeed)}>
                    <FontAwesomeIcon 
                        size='2x'
                        style={{ color: '#362E52' }}
                        icon={['fad', 'compass']} />
                </ForecastIcon>
                    <StatText>
                        {windDir} 
                    </StatText>
            </Stat>
            { elevation ? 
            ( <Stat>
                <StatTitle>Elevation</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    style={{ color: '#ADC7DC' }}
                    icon={['fad', 'mountains']} />
                     <StatText>
                        {elevation.value.toFixed(2)} 
                        <span style={{ fontSize: '0.5em'}}>
                            {elevation.unitCode.slice(5)}
                        </span>
                    </StatText>
            </Stat> ) : null }
            { heatIndex && heatIndex.values.length > 1 ? 
            ( <Stat>
                <StatTitle>Heat Index</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    style={{ color: '#AC2900'}}
                    icon={['fad', 'temperature-hot']} />
                     <StatText>
                        {heatIndex.uom.includes('degC') ? 
                            convertDegs(heatIndex.values[0].value).toFixed(2) : 
                            heatIndex.values[0].value.toFixed(2)} 
                        <span style={{ fontSize: '0.5em', position: 'relative'}}>
                            {heatIndex.sourceUnit}
                            <FontAwesomeIcon
                                size='1x'
                                style={{ 
                                    fontSize: '0.5em',
                                    position: 'absolute',
                                    top: 3,
                                    marginLeft: 2        
                                }}
                                icon={['far', 'circle']} />
                        </span>
                        
                    </StatText>
            </Stat> ) : null }
            { humidity && humidity.values.length > 1 ? 
            ( <Stat>
                <StatTitle>Humidity</StatTitle>
                <FontAwesomeIcon 
                    size='2x'
                    style={{ color: '#009CFC'}}
                    icon={['fad', 'humidity']} />
                     <StatText>
                        { humidity.values[0].value.toFixed(2)} %      
                    </StatText>
            </Stat> ) : null }
        </StatsContainer>
    )
}