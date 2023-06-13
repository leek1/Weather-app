import React, {useEffect, useState} from "react";
import {City, DailyForecastDetails, WeatherDetails} from "../weatherAppTypes";
import Grid from '@mui/material/Grid';
import {useLocation} from "react-router-dom";
import {Search} from "../components/Search";
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getCurrentWeather, getForecast} from "../services/weatherService";
import {CurrentWeather} from "../components/CurrentWeather";
import {CardActions, IconButton} from "@mui/material";
import {DailyForecast} from "../components/DailyForecast";
import CardContent from '@mui/material/CardContent';
import {Loader} from "../components/Loader";

export interface HomePageProps {
    favorites: City[];
    setFavorites: React.Dispatch<React.SetStateAction<City[]>>;

    isMetricUnit: boolean;

    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}


export const GridWrapper = styled('div')({
    flexGrow: "1",
    display: "block",
    padding: "15px",
});

export const Wrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
});

const defaultCity: City = {name: "Tel Aviv ,IL", id: "215854"}

export const HomePage = ({favorites, setFavorites, isMetricUnit, setIsError}: HomePageProps) => {
    const [city, setCity] = useState<City>(defaultCity);
    const [isFavorite, setIsFavorite] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherDetails>();
    const [forcastData, setForcastData] = useState<DailyForecastDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const useSearch = () => {
        return new URLSearchParams(useLocation().search);
    };
    const id = useSearch().get('id');

    useEffect(() => {
        const favorite = favorites.find((fav: City) => fav.id === id);
        if (favorite) {
            setCity(favorite);
            setIsFavorite(true);
        } else {
            setCity(defaultCity);
        }

    }, [id]);

    useEffect(() => {
        const getWeatherInformation = async () => {
            if (city) {
                setIsLoading(true);
                const currentWeatherResult = await getCurrentWeather(city.id);
                const currentForcastResult = await getForecast(city.id, isMetricUnit);
                if (currentWeatherResult.errorOccurred || currentForcastResult.errorOccurred) {
                    setIsLoading(false)
                    setIsError(true);
                } else {
                    setWeatherData(currentWeatherResult.result);
                    setForcastData(currentForcastResult.result);
                    setIsFavorite((favorites.find((fav: City) => fav.id === city.id)) !== undefined);
                    setIsError(false);
                    setTimeout(() => setIsLoading(false), 100);
                }
            }
        };

        getWeatherInformation();
    }, [city, setWeatherData, setForcastData, setIsFavorite, setIsError, isMetricUnit])

    const favoriteColor = isFavorite ? "secondary" : "inherit"

    const handleFavoriteButtonClick = () => {
        if (isFavorite) {
            setFavorites(favorites.filter((fav: City) => {
                return fav.id !== city?.id
            }));
            setIsFavorite(false);
        } else {
            setFavorites([...favorites, city]);
            setIsFavorite(true);
        }
    }
    return (
        <GridWrapper>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Wrapper>
                        <Search setCityBySearch={setCity} setIsError={setIsError}/>
                    </Wrapper>
                </Grid>
                {isLoading ? (<Loader/>) :
                    (<Grid item xs={12}>
                            {city && weatherData &&
                              <Wrapper>
                                <CurrentWeather cityName={city.name} weatherData={weatherData}
                                                isMetricUnit={isMetricUnit}/>
                                <CardActions disableSpacing>
                                  <IconButton aria-label="add to favorites" onClick={handleFavoriteButtonClick}>
                                    <FavoriteIcon color={favoriteColor}/>
                                  </IconButton>
                                </CardActions>
                              </Wrapper>
                            }
                        </Grid>
                    )}
            </Grid>
            {!isLoading && forcastData && (
                <Wrapper>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            {forcastData.map((forcast, index) => {
                                return (
                                    <div
                                        key={index}
                                    >
                                        <DailyForecast forcast={forcast}/>
                                    </div>
                                );
                            })}
                        </Grid>
                    </CardContent>
                </Wrapper>
            )}
        </GridWrapper>
    );

};
