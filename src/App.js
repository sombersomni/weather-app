import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//components
import Forecast from './components/Forecast.jsx';
import MainReport from './components/MainReport.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTemperatureHot,
  faMountains,
  faCompass,
  faFog,
  faCloudHail,
  faCloudSnow,
  faCloudShowers,
  faCloudSun,
  faSunCloud,
  faClouds,
  faThunderstormSun,
  faThunderstormMoon,
  faCloudsMoon,
  faCloudMoon,
  faWind
} from '@fortawesome/pro-duotone-svg-icons';
import { faCloud, faSun, faTornado } from '@fortawesome/pro-solid-svg-icons';
import { faCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import './App.css';
library.add(
  faTimes,
  faTemperatureHot,
  faMountains,
  faCompass,
  faWind,
  faCircle,
  faTornado,
  faCloudHail,
  faCloudSnow,
  faCloudShowers,
  faCloudSun,
  faSunCloud,
  faCloud,
  faClouds,
  faCloudsMoon,
  faCloudMoon,
  faSun,
  faFog,
  faThunderstormSun,
  faThunderstormMoon);

const Message = styled.div`
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 25px;
`;

export default function App() {
  const [message, setMessage] = useState('');
  const [weatherStats, setWeatherStats] = useState({});
  const [savedPeriods, setPeriods] = useState([]);
  const [hourlyPeriods, setHourlyPeriods] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  function setColor(temp) {
    if (temp >= 80) {
      return '#E9A139';
    } else if (temp >= 50 && temp < 80) {
      return '#7FDAF4';
    } else {
      return '#3492fb'
    }
  }
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { coords } = pos;
        let query = [];
        axios.get(`https://api.weather.gov/points/${coords.latitude},${coords.longitude}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              const { forecast, forecastHourly, forecastGridData, relativeLocation } = properties;
              setCity(relativeLocation.properties.city);
              setState(relativeLocation.properties.state);
              query[0] = forecast;
              query[1] = forecastGridData;
              return axios.get(forecastHourly);
            }
          })
          .then(res => {
            if (res.status === 200) {
              const { properties } = res.data;
              const { periods } = properties;
              setHourlyPeriods(periods);
              return axios.get(query[0]);
            }
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              const { periods } = properties;
              setPeriods(periods);
              return axios.get(query[1]);
            }
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              setWeatherStats(properties);
            }
          })
          .catch(err => {
            setMessage(err.message);
          })
      }, err => {
        console.log(err);
        setMessage(err.message);
      }, options);
    } else {
      setMessage('Geolocation is not supported in this browser')
    }
  }, [])

  const primaryColor = hourlyPeriods && hourlyPeriods.length > 1 ? setColor(hourlyPeriods[0].temperature) : "#00A9FC"
  return (
    <div className='App'>
      <Message>
        {message}
      </Message>
      <Container>
        {hourlyPeriods.length > 0 ?
          <MainReport
            primaryColor={primaryColor}
            weatherStats={weatherStats}
            detailedForecast={savedPeriods.length > 0 ? savedPeriods[0].detailedForecast : null}
            currentReport={hourlyPeriods[0]}
            city={city}
            state={state} /> : null
        }
        <h3>Weekly Report</h3>
        <PeriodContainer>
          {savedPeriods.map(period => <Forecast
            key={period.number.toString()}
            disable={false}
            primaryColor={primaryColor}
            {...period} />)}
        </PeriodContainer>
      </Container>
    </div>
  );
}
