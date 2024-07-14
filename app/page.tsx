import ProjectView from "@/components/project/project-view";
import RandomProject from "@/components/project/random";
import { getRandomProject } from "@/services/ProjectService";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Home() {

  var randomProject = (await getRandomProject()).data;
  
  return (
    <main>
      <Container>
        <Stack alignItems="center" justifyContent="center"   height={"80vh"}  gap={2}>
          <Typography  fontWeight={700} variant="h1">WorkShare</Typography>

          <RandomProject {...randomProject}/>
          
        </Stack>
      </Container>
    </main>
  );
}
