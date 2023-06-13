import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader = () => {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: "center",
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingTop: "40px"
        }}>
            <CircularProgress size={70}/>
        </Box>
    );
}