import './App.css';
import React, {useState} from "react";
import {NavBar} from './components/NavBar';
import {HashRouter , Route, Routes} from "react-router-dom";
import {City} from "./weatherAppTypes";
import {HomePage} from "./pages/HomePage";
import styled from "@emotion/styled";
import {FavoritesPage} from "./pages/FavoritesPage";
import {Error} from "./components/Error";

const Container = styled('div')({
    backgroundImage: "linear-gradient(to top, #72edf342 10% , #1274f4b5 100%)",
    height: "100vh",
});
const App = () => {

    const [favorites, setFavorites] = useState<City[]>([]);
    const [isMetricUnit, setIsMetricUnit] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    return (
        <Container>
            <HashRouter>
                <NavBar isMetricUnit={isMetricUnit} setIsMetricUnit={setIsMetricUnit}/>
                <Error isOpen={isError}/>
                <Routes>
                    <Route path="/" element={< HomePage favorites={favorites} setFavorites={setFavorites}
                                                        isMetricUnit={isMetricUnit} setIsError={setIsError}/>}/>
                    <Route path="/favorites" element={< FavoritesPage favorites={favorites} isMetricUnit={isMetricUnit}
                                                                      setIsError={setIsError}/>}/>
                </Routes>
            </HashRouter>
        </Container>
    );
};

export default App;