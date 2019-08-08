import React from 'react';
import Forecast from './Forecast.jsx';
import Temperature from './Temperature.jsx';
import WeatherStats from './WeatherStats.jsx';
import styled from 'styled-components';

const TempContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.color || '#00ACF9'}
`;

const ReportContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    max-width: 100vw;
    background: #222;
`;

const WeatherFeature = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    background: #DDD;
    width: 100%;
`;

const Description = styled.p`
    text-align: left;
    justify-content: newspaper;
    &:first-letter {
        font-size: 2em;
        color: ${props => props.color || '#00ACF9'}
    }
`;
export default function MainReport({ city, state, currentReport, detailedForecast, weatherStats, primaryColor }) {
    const { 
        temperature, 
        temperatureUnit, 
        windSpeed, 
        windDirection } = currentReport;
    const {
        elevation,
        heatIndex
    } = weatherStats; 

    return (
        <ReportContainer>
            <TempContainer color={primaryColor}>
                <Temperature temperature={temperature} unit={temperatureUnit} />
                <h4 style={{ width: '50%', textAlign: 'center' }}>{city}, {state}</h4>
            </TempContainer>
            <WeatherFeature>
                <div>
                    <div style={{ float: 'left' }}>
                        <Forecast {...currentReport} disable={true}/>
                    </div>
                    <Description
                        color={primaryColor}>{currentReport.detailedForecast.length > 0 ? currentReport.detailedForecast : (detailedForecast || "No description was found")}</Description>
                </div>
                <WeatherStats
                    heatIndex={heatIndex}
                    windDir={windDirection}
                    wind={windSpeed}
                    elevation={elevation} />
            </WeatherFeature>
        </ReportContainer>
    )
}