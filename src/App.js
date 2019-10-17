import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//components
import Forecast from './components/Forecast.jsx';
import MainReport from './components/MainReport.jsx';
import LoadScreen from './components/LoadScreen.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fadeIn } from './components/Animations';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHumidity,
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
import { faCloud, faSun, faTornado, faMapMarkerCheck } from '@fortawesome/pro-solid-svg-icons';
import { faCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(
  faMapMarkerCheck,
  faHumidity,
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 2s ease-in both;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 25px;
  align-items: center;
  justify-content: center;
`;

const BG = styled.div`
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  trasition: background 1s;
`;

const Title = styled.h3`
  background: white;
  padding:  5px 10px;
  border-radius: 10px;
`;
export default function App() {
  const [message, setMessage] = useState('');
  const [weatherStats, setWeatherStats] = useState({});
  const [savedPeriods, setPeriods] = useState([]);
  const [hourlyPeriods, setHourlyPeriods] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCoords, setIsCoords] = useState(false);
  const [coordsArr, setCoords] = useState([]);
  const [isGeo, setIsGeo] = useState(false);
  function setColor(temp) {
    if (temp >= 80) {
      return '#E9A139';
    } else if (temp >= 50 && temp < 80) {
      return '#7FDAF4';
    } else {
      return '#3492fb'
    }
  }
  function handleRequest(coordinates) {
    let query = [];
    axios.get(`https://api.weather.gov/points/${coordinates}`)
      .then(res => {
        if (res.status === 200) {
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
          const { properties } = res.data;
          const { periods } = properties;
          setPeriods(periods);
          return axios.get(query[1]);
        }
      })
      .then(res => {
        if (res.status === 200) {
          const { properties } = res.data;
          setWeatherStats(properties);
        }
      })
      .catch(err => {
        setMessage("Your location may be out of range❗ App works with US 🌎territories only. Enter in coordinates below (try using google maps or example below)");
        setIsCoords(true);
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function retry(lattitude, longitude) {
    setIsCoords(false);
    setLoading(true);
    setCoords([lattitude, longitude])
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if(!isCoords && coordsArr.length === 2) {
      const coordinates = coordsArr[0] + ',' + coordsArr[1];
      handleRequest(coordinates);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const { coords } = pos;
          const coordinates = coords.latitude + ',' + coords.longitude;
          handleRequest(coordinates);
  
        }, err => {
          console.log(err.message);
          setMessage("Your location may be out of range❗ App works with US 🌎territories only. Enter in coordinates below (try using google maps or example below)");
          setIsCoords(true);
          setLoading(false);
        }, options);
      } else {
        setMessage('Geolocation is not supported in this browser❗ Try a different browser');
        setIsGeo(true);
        setLoading(false);
      }
    }
  }, [isCoords])

  const primaryColor = hourlyPeriods && hourlyPeriods.length > 1 ? setColor(hourlyPeriods[0].temperature) : "#00A9FC"
  const cloudPositions = [
    {dir: 'right', x: 100, y: 100, size: 4}, 
    {dir: 'left', x: 100, y:100, size: 6 },
    {dir: 'left', x: '50%', y: 200, size: 8},
    {dir: 'left', x: 0, y: 250, size: 8},
    {dir: 'right', x: -50, y: 250, size: 8}
  ];
  function renderClouds(positions) {
    const cloudStyle = {
      position: "absolute"
    }
   return positions.map(pos => <FontAwesomeIcon 
            size={`${pos.size}x`}
            icon={['fas', 'cloud']} 
            style={{
              ...cloudStyle,
              top: pos.y,
              [pos.dir]: pos.x
            }}/>);
  }
  return (
    <div 
      className='App'
      style={{
        background: `linear-gradient(#ffffff,${primaryColor || "#ffffff"})`
      }}>
      <BG>
        {renderClouds(cloudPositions)}
      </BG>
      <LoadScreen
        retry={retry}
        message={message}
        isCoords={isCoords}
        isGeo={isGeo} />
      {
        loading ? <CircularProgress color="primary" /> :
          (!isCoords || !isGeo ? <Container>
            {hourlyPeriods.length > 0 ?
              <MainReport
                primaryColor={primaryColor}
                weatherStats={weatherStats}
                detailedForecast={savedPeriods.length > 0 ? savedPeriods[0].detailedForecast : null}
                currentReport={hourlyPeriods[0]}
                city={city}
                state={state} /> : null
            }
            <Title>Weekly Report</Title>
            <PeriodContainer>
              {savedPeriods.map(period => <Forecast
                key={period.number.toString()}
                disable={false}
                primaryColor={primaryColor}
                {...period} />)}
            </PeriodContainer>
            <h5 style={{ width: 100 }}>Created using weather.gov api, React and ❤️</h5>
          </Container> : null)
      }
    </div>
  );
}
