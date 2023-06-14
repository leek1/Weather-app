import {City, CurrentWeatherResponse, FavoriteWeatherDetails} from "../weatherAppTypes";
import React, {useEffect, useState} from "react";
import {getCurrentWeather} from "../services/weatherService";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import {GridWrapper, Wrapper} from "./HomePage";
import {Favorite} from "../components/Favorite";
import {Loader} from "../components/Loader";


interface FavoritesPageProps {
    favorites: City[];

    isMetricUnit: boolean;

    setIsError: React.Dispatch<React.SetStateAction<boolean>>;

}

export const FavoritesPage = ({favorites, isMetricUnit, setIsError}: FavoritesPageProps) => {
    const [favoritesWeatherData, setFavoritesWeatherData] = useState<(FavoriteWeatherDetails)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const getFavoritesData = async () => {
            if (favorites) {
                setIsLoading(true);
                const favoritesData: FavoriteWeatherDetails[] = [];
                const res = await Promise.all(favorites.map(async (fav: City) => {
                    return await getCurrentWeather(fav.id);
                }));
                res.forEach((data: CurrentWeatherResponse, index) => {
                    if (data.errorOccurred) {
                        setIsError(true);
                    } else {
                        favoritesData.push({favorite: favorites[index], ...data.result})
                        setIsError(false);
                    }

                });
                setFavoritesWeatherData(favoritesData);
                setTimeout(() => setIsLoading(false), 100);

            }
        };
        getFavoritesData();
    }, [favorites, isMetricUnit, setIsError]);

    return (
        <GridWrapper>
            {isLoading ? (<Loader/>) : (
                <Wrapper>
                    {favoritesWeatherData && (
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                {favoritesWeatherData.map((favInfo, index) => {
                                    return (
                                        <Wrapper key={index}>
                                            <Grid item xs={12} key={index}>
                                                <Favorite favoriteCity={favInfo.favorite} weatherData={favInfo}
                                                          isMetricUnit={isMetricUnit}/>
                                            </Grid>
                                        </Wrapper>

                                    );
                                })}
                            </Grid>
                        </CardContent>
                    )}
                </Wrapper>
            )}
        </GridWrapper>
    );

};