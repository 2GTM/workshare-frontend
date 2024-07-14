import { Container, Stack, Typography } from "@mui/material";

export default async function Home() {

  return (
    <main>
      <Container>
        <Stack alignItems="center" justifyContent="center"   height={"80vh"}  gap={2}>
          <Typography  fontWeight={700} variant="h1">WorkShare</Typography>
        </Stack>
      </Container>
    </main>
  );
}
