import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {City, WeatherDetails} from "../weatherAppTypes";
import {useNavigate} from 'react-router-dom';
import {CardActions, IconButton} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from '@mui/material/Tooltip';

interface FavoriteProps {
    favoriteCity: City;
    weatherData: WeatherDetails;
    isMetricUnit: boolean;

}

export const Favorite = ({favoriteCity, weatherData, isMetricUnit}: FavoriteProps) => {

    const navigate = useNavigate();

    const unit = isMetricUnit ? "C" : "F";

    const temperatureValue = !weatherData.temperature ? "" : isMetricUnit
        ? weatherData.temperature?.metric.value
        : weatherData.temperature?.imperial.value

    const showDetails = () => {
        navigate(`/?id=${favoriteCity.id}`);
    };
    return (
        <CardContent>
            <Typography variant="h5" gutterBottom>
                {favoriteCity.name}
            </Typography>
            <img src={`https://developer.accuweather.com/sites/default/files/${
                weatherData.weatherIcon < 10 ? `0${weatherData.weatherIcon}` : weatherData.weatherIcon
            }-s.png`} alt={`${weatherData.weatherIcon}`}/>
            <Typography variant="h6" gutterBottom>
                {`${temperatureValue} °${unit}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {weatherData.weatherText}
            </Typography>
            <CardActions disableSpacing>
                <Tooltip title="Weather information">
                    <IconButton aria-label="show info" onClick={showDetails}>
                        <InfoIcon/>
                    </IconButton>
                </Tooltip>
            </CardActions>
        </CardContent>
    );
};
