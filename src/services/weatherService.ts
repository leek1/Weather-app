import {getAutoComplete, getFiveDayForecast, getWeatherConditions} from "./accuweatherService";
import {
    AutoCompleteLocationsResponse,
    City, CurrentWeatherResponse,
    DailyForecastDetails, ForcastResponse,
    TemperatureByUnits,
    WeatherDetails
} from "../weatherAppTypes";

export const getAutoCompleteLocations = async (searchQuery: string): Promise<AutoCompleteLocationsResponse> => {
    let locations: City[] = [];

    try {
        if (searchQuery) {
            const res = await getAutoComplete(searchQuery);
            locations = res.map((location: any) => {
                return {name: `${location.LocalizedName} ,${location.Country.ID}`, id: location.Key} as City;
            });
        }
        return {
            result: locations,
            errorOccurred: false,
        };
    } catch (err) {
        console.log("Error on getting locations by search query ", err);
        return {
            result: locations,
            errorOccurred: true,
        };
    }
};


export const getCurrentWeather = async (cityId: string): Promise<CurrentWeatherResponse> => {
    try {
        const res = await getWeatherConditions(cityId);
        return {
            result: {
                weatherText: res.WeatherText,
                weatherIcon: res.WeatherIcon,
                temperature: {
                    metric: {value: res.Temperature.Metric.Value, unit: res.Temperature.Metric.Unit},
                    imperial: {value: res.Temperature.Imperial.Value, unit: res.Temperature.Imperial.Unit},
                } as TemperatureByUnits
            } as WeatherDetails,
            errorOccurred: false,
        }

    } catch (err) {
        console.log("Error on getting locations by search query ", err);
        return {
            result: {} as WeatherDetails,
            errorOccurred: true,
        }
    }
};
export const getForecast = async (cityId: string, isMetricUnit: boolean): Promise<ForcastResponse> => {
    let forecasts: DailyForecastDetails[] = [];
    try {
        if (cityId) {
            const res = await getFiveDayForecast(cityId, isMetricUnit);
            forecasts = res.map((forcast: any) => {
                return {
                    date: forcast.Date,
                    temperature: {
                        min: {
                            value: forcast.Temperature.Minimum.Value,
                            unit: forcast.Temperature.Minimum.Unit
                        },
                        max: {
                            value: forcast.Temperature.Maximum.Value,
                            unit: forcast.Temperature.Maximum.Unit
                        }
                    },
                    dayIcon: forcast.Day.Icon,
                    dayIconPhrase: forcast.Day.IconPhrase,
                } as DailyForecastDetails;
            });
        }
        return {
            result: forecasts,
            errorOccurred: false,
        };
    } catch (err) {
        console.log("Error on getting locations by search query ", err);
        return {
            result: forecasts,
            errorOccurred: true,
        };

    }
};
