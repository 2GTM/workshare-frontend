import ProjectView from "@/components/project/project-view";
import TextTypeWriter from "@/components/shared/TypeWriterText";
import { getRandomProject } from "@/services/ProjectService";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";

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
