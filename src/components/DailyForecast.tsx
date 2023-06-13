import React from "react";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {DailyForecastDetails} from "../weatherAppTypes";

interface DailyForecastProps {
    forcast: DailyForecastDetails;
}

export const DailyForecast = ({forcast}: DailyForecastProps) => {
    const minTemperatureValue = !forcast.temperature
        ? "" : forcast.temperature?.min.value

    const maxTemperatureValue = !forcast.temperature
        ? "" : forcast.temperature?.max.value

    const unit = !forcast.temperature ? "" : forcast.temperature?.min.unit;

    const prettyDate = !forcast.date ? "" : new Date(forcast.date).toDateString();

    return (
        <CardContent>
            <Typography variant="h5" gutterBottom>
                {`${prettyDate}`}
            </Typography>
            <img src={`https://developer.accuweather.com/sites/default/files/${
                forcast.dayIcon < 10 ? `0${forcast.dayIcon}` : forcast.dayIcon
            }-s.png`} alt={`${forcast.dayIcon}`}/>
            <Typography variant="h4" gutterBottom>
                {`${minTemperatureValue} - ${maxTemperatureValue} °${unit}`}
            </Typography>
            <Typography variant="h4" gutterBottom>
                {forcast.dayIconPhrase}
            </Typography>
        </CardContent>
    );
};