import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import TextTypeWriter from "@/components/shared/TypeWriterText";

export default function NotFound() {
    return (
        <Stack alignItems="center" justifyContent="center" textAlign="center"  height={"80vh"}>
            <span style={{ fontSize: "200px", textAlign: "center"}}>
                <TextTypeWriter text={"404"} />
            </span>
            <Typography textAlign="center" variant="h2">You are not supposed to be there</Typography>
        </Stack>
    )

}