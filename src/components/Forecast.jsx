import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForecastContainer = styled.div`
    width: 150px;
    margin: 5px;
    font-size: 0.8em;
`;
export default function Forecast({ icon, name, shortForecast, detailedForecast, isDaytime }) {
    function setIcon(weather, isDay) {
        const w = weather.toLowerCase();
        const isThuderStorm = w.includes('thunderstorm');
        const isShowers = w.includes('showers');
        const isTornado = w.includes('tornado');
        const isHail = w.includes('hail');
        const isSnowy = w.includes('snow');
        const isFog = w.includes('fog');
        switch(w) {
            case 'mostly sunny':
                return ['fad', 'sun-cloud']
            case 'sunny':
                return ['fas', 'sun']
            case 'partly cloudy':
                return !isDay ? ['fad', 'cloud-moon'] : ['fad', 'clouds']
            default:
                if(isThuderStorm) {
                    return !isDay ? ['fad', 'thunderstorm-moon'] : ['fad', 'thunderstorm-sun']
                }
                if(isShowers) {
                    return ['fad', 'cloud-showers']
                }
                if(isFog) {
                    return ['fad', 'fog']
                }
                if(isSnowy) {
                    return ['fad', 'cloud-snow']
                }
                if(isHail) {
                    return ['fad', 'cloud-hail']
                }
                if(isTornado) {
                    return ['fas', 'tornado']
                }
                return !isDay ? ['fad', 'clouds-moon'] : ['fad', 'cloud-sun']
        }
    }
    
    return (
        <ForecastContainer>
            {shortForecast.toLowerCase().split('and').filter(each => each !== 'and').map(forecast => 
                <FontAwesomeIcon
                key={forecast.trim()} 
                size='4x'
                icon={setIcon(forecast.trim(), isDaytime)} />
            )}
            <h3>{name}</h3>
            <p>{shortForecast}</p>
        </ForecastContainer>
    )
}