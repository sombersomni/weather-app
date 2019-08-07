import React from 'react';
import Forecast from './Forecast.jsx';
import Temperature from './Temperature.jsx';

export default function MainReport({city, state, currentReport}) {
    console.log(currentReport);
    const {temperature, temperatureUnit} = currentReport;
    return (
        <div>
            <Temperature temperature={temperature} unit={temperatureUnit} />
            <h4>{city}, {state}</h4>
            <Forecast {...currentReport} />
        </div>
    )
}