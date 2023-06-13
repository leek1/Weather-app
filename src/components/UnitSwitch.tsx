import * as React from 'react';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const Wrapper = styled('div')({
    display: "flex",
});

interface UnitSwitchProps {
    isMetricUnit: boolean;

    setIsMetricUnit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UnitSwitch = ({isMetricUnit, setIsMetricUnit}: UnitSwitchProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMetricUnit(event.target.checked);
    };

    return (
        <Wrapper>
            <Typography variant="h6" gutterBottom>
                {"F"}
            </Typography>
            <Switch
                checked={isMetricUnit}
                onChange={handleChange}
                inputProps={{'aria-label': 'controlled'}}
                color={"default"}
            />
            <Typography variant="h6" gutterBottom>
                {"C"}
            </Typography>
        </Wrapper>
    );
}