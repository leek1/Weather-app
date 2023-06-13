import React from "react";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {WeatherDetails} from "../weatherAppTypes";


interface CurrentWeatherProps {
    cityName: string;
    weatherData: WeatherDetails;
    isMetricUnit: boolean;

}

export const CurrentWeather = ({cityName, weatherData, isMetricUnit}: CurrentWeatherProps) => {
    const unit = isMetricUnit ? "C" : "F";

    const temperatureValue = !weatherData.temperature ? "" : isMetricUnit
        ? weatherData.temperature?.metric.value
        : weatherData.temperature?.imperial.value


    return (
        <CardContent>
            <Typography variant="h3" gutterBottom>
                {cityName}
            </Typography>
            <img src={`https://developer.accuweather.com/sites/default/files/${
                weatherData.weatherIcon < 10 ? `0${weatherData.weatherIcon}` : weatherData.weatherIcon
            }-s.png`} alt={`${weatherData.weatherIcon}`}/>
            <Typography variant="h4" gutterBottom>
                {`${temperatureValue} °${unit}`}
            </Typography>
            <Typography variant="h4" gutterBottom>
                {weatherData.weatherText}
            </Typography>
        </CardContent>
    );
};