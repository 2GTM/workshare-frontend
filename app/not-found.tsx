import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import TextTypeWriter from "@/components/shared/TypeWriterText";

export default function NotFound() {
    return (
        <Container>
            <Typography fontSize={450} textAlign={"center"}>
                <TextTypeWriter text={"404"} />
            </Typography>
            <Typography textAlign="center" variant="h2">You are not supposed to be there</Typography>
        </Container>
    )

}