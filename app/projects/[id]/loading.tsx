'use client';

import { CircularProgress, Container, Stack } from "@mui/material";

export default function LoadingSpecificProject() {
    return (
        <Stack alignItems="center" justifyContent="center" textAlign="center"  height={"80vh"}>
            <CircularProgress />
        </Stack>
    )
}