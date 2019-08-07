import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//components
import Forecast from './components/Forecast.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFog, faCloudShowers, faCloudSun, faSunCloud, faClouds, faThunderstormSun, faThunderstormMoon, faCloudsMoon, faCloudMoon } from '@fortawesome/pro-duotone-svg-icons'
import { faCloud, faSun } from '@fortawesome/pro-solid-svg-icons'
import './App.css';
library.add(
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
        axios.get(`https://api.weather.gov/points/39.938039,-75.183536`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              return axios.get(properties.forecast);
            }
          })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const { properties } = res.data;
              const { elevation, periods } = properties;
              setElevation(elevation);
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
        {savedPeriods.map(period => <Forecast
          key={period.number.toString()}
          {...period} />)}
      </Container>
    </div>
  );
}
