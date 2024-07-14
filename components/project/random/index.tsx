
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Box, Button, Container, Typography } from "@mui/material";
import ProjectView from "../project-view";
import { getRandomProject } from "@/services/ProjectService";
import { useEffect } from "react";

export default async function RandomProject(randomProject : ProjectViewDto) {

    var post = ((await getRandomProject())?.data);

    return (
        <Container>
            <Typography variant="h2">Why not begin with this project?</Typography>
            <ProjectView {...post}/>
        </Container>
    )
}