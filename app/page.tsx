import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";

export default async function Home() {

  //const projects = (await getAllProjects()).data;
  
  return (
    <main>
        <Box sx={{flexGrow: 1, p: 2}}>
          <Grid
            container
            spacing={2}
            sx={{borderColor: 'divider'}}
          >

          </Grid>
        </Box>
    </main>
  );
}
