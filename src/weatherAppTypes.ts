export interface City {
    name: string;
    id: string;
}

export interface WeatherDetails {
    weatherText: string;
    temperature: TemperatureByUnits;
    weatherIcon: number;
}

export interface FavoriteWeatherDetails extends WeatherDetails {
    favorite: City;
}

export interface TemperatureByUnits {
    metric: Temperature;
    imperial: Temperature;
}

export interface Temperature {
    value: number;
    unit: string;
}

export interface DailyForecastDetails {
    date: string;
    temperature: { min: Temperature, max: Temperature };
    dayIcon: number;
    dayIconPhrase: string;
}

export interface BaseApiResponse {
    errorOccurred: boolean;
}

export interface CurrentWeatherResponse extends BaseApiResponse {
    result: WeatherDetails;
}

export interface AutoCompleteLocationsResponse extends BaseApiResponse {
    result: City[]
}

export interface ForcastResponse extends BaseApiResponse {
    result: DailyForecastDetails[];
}