import React from "react";
import {Alert, AlertTitle} from "@mui/material";
import styled from '@emotion/styled';
import Snackbar from '@mui/material/Snackbar';

const ErrorWrapper = styled('div')({
    display: "flex",
    justifyContent: "right",
    padding: "15px",
});

export const Error = ({isOpen}: any) => {
    return (
        <ErrorWrapper className={"Error container"}>
            <Snackbar
                open={isOpen}
                autoHideDuration={2000}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                message={"An Error Occurred"}
            >
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Get weather information failed
                </Alert>
            </Snackbar>
        </ErrorWrapper>
    );
}