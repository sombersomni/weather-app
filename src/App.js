import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//components
import Forecast from './components/Forecast.jsx';
import MainReport from './components/MainReport.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
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
  faCloudMoon
} from '@fortawesome/pro-duotone-svg-icons';
import { faCloud, faSun, faTornado } from '@fortawesome/pro-solid-svg-icons';
import { faCircle } from '@fortawesome/pro-regular-svg-icons';
import './App.css';
library.add(
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function App() {
  const [message, setMessage] = useState('');
  const [savedElevation, setElevation] = useState([]);
  const [savedPeriods, setPeriods] = useState([]);
  const [hourlyPeriods, setHourlyPeriods] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { coords } = pos;
        console.log('Your current position is:');
        console.log(`Latitude : ${coords.latitude}`);
        console.log(`Longitude: ${coords.longitude}`);
        console.log(`More or less ${coords.accuracy} meters.`);
        let query;
        axios.get(`https://api.weather.gov/points/${coords.latitude},${coords.longitude}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              const { forecast, forecastHourly, relativeLocation } = properties;
              setCity(relativeLocation.properties.city);
              setState(relativeLocation.properties.state);
              query = forecast;
              return axios.get(forecastHourly);
            }
          })
          .then(res => {
            if (res.status === 200) {
              const { properties } = res.data;
              const { elevation, periods } = properties;
              setElevation(elevation);
              setHourlyPeriods(periods);
              return axios.get(query);
            }
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              const { elevation, periods } = properties;
              setPeriods(periods);
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
  return (
    <div className='App'>
      <Message>
        {message}
      </Message>
      <Container>
        {hourlyPeriods.length > 0 ?
          <MainReport
            currentReport={hourlyPeriods[0]}
            city={city}
            state={state} /> : null
        }
        {savedPeriods.map(period => <Forecast
          key={period.number.toString()}
          {...period} />)}
      </Container>
    </div>
  );
}
