import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import styled from '@emotion/styled';
import {Link} from "react-router-dom";
import {UnitSwitch} from "./UnitSwitch";

const NavLink = styled(Link)({
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    padding: "10px",
    underline: "none",
    "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
    }
});

const NavLinksContainer = styled('div')({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(80% + 20px);",
});

interface NavBarProps {
    isMetricUnit: boolean;
    setIsMetricUnit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBar = ({isMetricUnit, setIsMetricUnit}: NavBarProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4">
                    Weather App
                </Typography>
                <NavLinksContainer>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/favorites">
                        Favorites
                    </NavLink>
                </NavLinksContainer>
                <UnitSwitch isMetricUnit={isMetricUnit} setIsMetricUnit={setIsMetricUnit}/>
            </Toolbar>
        </AppBar>
    );
};
