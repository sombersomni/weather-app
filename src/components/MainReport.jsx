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
`;

const WeatherFeature = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    background: #DDD;
`;

const Description = styled.p`
    text-align: left;
    justify-content: newspaper;
    &:first-letter {
        font-size: 2em;
        color: ${props => props.color || '#00ACF9'}
    }
`;
export default function MainReport({ city, state, currentReport, detailedForecast, elevation }) {
    console.log(currentReport);
    function setColor(temp) {
        if(temp >= 80) {
            return '#E9A139';
        } else if (temp >= 50 && temp < 80) {
            return '#7FDAF4';
        } else {
            return '#3492fb'
        }
    }
    const { 
        temperature, 
        temperatureUnit, 
        windSpeed, 
        windDirection } = currentReport;
    return (
        <ReportContainer>
            <TempContainer color={setColor(temperature)}>
                <Temperature temperature={temperature} unit={temperatureUnit} />
                <h4 style={{ width: '50%', textAlign: 'center' }}>{city}, {state}</h4>
            </TempContainer>
            <WeatherFeature>
                <div>
                    <div style={{ float: 'left' }}>
                        <Forecast {...currentReport} />
                    </div>
                    <Description
                        color={setColor(temperature)}>{currentReport.detailedForecast.length > 0 ? currentReport.detailedForecast : detailedForecast}</Description>
                </div>
                <WeatherStats
                    windDir={windDirection}
                    wind={windSpeed}
                    elevation={elevation} />
            </WeatherFeature>
        </ReportContainer>
    )
}