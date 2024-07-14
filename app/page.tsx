import { Container, Stack, Typography } from "@mui/material";
import TextTypeWriter from "@/components/shared/TypeWriterText";

export default function Home() {

  return (
    <main>
      <Container>
        <Stack alignItems="center" justifyContent="center"   height={"80vh"}  gap={2}>
          <Typography  fontWeight={700} variant="h1">workshare</Typography>
          <Typography textAlign="center" variant="h2">Why not begin with this
              <TextTypeWriter text={"project idea person "} />
          </Typography> 
        </Stack>
      </Container>
    </main>
  );
}
