import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForecastContainer = styled.div`
    width: 150px;
    margin: 5px;
    font-size: 0.8em;
`;
export default function Forecast({ icon, name, shortForecast, detailedForecast }) {
    function setIcon(weather, time) {
        console.log(weather);
        const w = weather.toLowerCase();
        const isNight = time.toLowerCase().includes('night');
        const isThuderStorm = w.includes('thunderstorm');
        const isShowers = w.includes('showers');
        const isFog = w.includes('fog');
        switch(w) {
            case 'mostly sunny':
                return ['fad', 'sun-cloud']
            case 'sunny':
                return ['fas', 'sun']
            case 'partly cloudy':
                return isNight? ['fad', 'cloud-moon'] : ['fad', 'clouds']
            default:
                if(isThuderStorm) {
                    return isNight? ['fad', 'thunderstorm-moon'] : ['fad', 'thunderstorm-sun']
                }
                if(isShowers) {
                    return ['fad', 'cloud-showers']
                }
                if(isFog) {
                    return ['fad', 'fog']
                }
                return isNight? ['fad', 'clouds-moon'] : ['fad', 'cloud-sun']
        }
    }
    
    return (
        <ForecastContainer>
            {shortForecast.toLowerCase().split('and').filter(each => each !== 'and').map(forecast => 
            {
                const newForecast = forecast.trim();
                console.log(newForecast);
                return <FontAwesomeIcon 
                size='4x'
                icon={setIcon(newForecast, name)} />
            })}
            <h3>{name}</h3>
            <p>{shortForecast}</p>
        </ForecastContainer>
    )
}