import axios from 'axios';
// const API_KEY = 'hsWAFGRSMohkBSGGUscKCism61T888ov';
 const API_KEY = 'Pyxcj0HtReQ2uWZE6mgzuF6PvP1khQKc';
// const API_KEY = "Pyxcj0HtReQ2uWZE6mgz6PvP1khQKc";

export const getWeatherConditions = async (cityId: string) => {
    const response = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${API_KEY}`
    );
    return response.data[0];
};

export const getFiveDayForecast = async (cityId: string, isMetricUnit: boolean) => {
    const response = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?metric=${isMetricUnit}&apikey=${API_KEY}`
    );
    return response.data.DailyForecasts;
};

export const getAutoComplete = async (city: string) => {
    const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}`
    );
    return response.data;
};
