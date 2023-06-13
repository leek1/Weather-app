import React, {useCallback, useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {City} from "../weatherAppTypes";
import {debounce} from "@mui/material";
import {getAutoCompleteLocations} from "../services/weatherService";

interface Props {
    setCityBySearch: any;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;

}

export const Search = ({setCityBySearch, setIsError}: Props) => {
    const [locations, setLocations] = useState<City[]>([]);

    const getLocationsByAutocomplete = useCallback(
        debounce((city: string) => {
            getAutoCompleteLocations(city).then(res => {
                if (res.errorOccurred) {
                    setIsError(true);
                } else {
                    setLocations(res.result);
                }
            })
        }, 600),
        [setIsError, setLocations]
    );

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        getLocationsByAutocomplete(ev.currentTarget.value);
    };

    const handleAutoComplete = (
        ev: React.ChangeEvent<{}>,
        location: City | null
    ) => {
        if (!location) return;
        setCityBySearch(location);
    };

    return (
        <div className="flex justify-center search-container">
            <Autocomplete
                options={locations}
                size="medium"
                onChange={handleAutoComplete}
                getOptionLabel={location => location.name}
                style={{width: 300}}
                renderInput={params => (
                    <TextField
                        {...params}
                        onChange={handleChange}
                        label="Search city"
                        variant="outlined"
                    />
                )}
            />
        </div>
    );
};