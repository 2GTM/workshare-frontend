
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Box, Button, Container, Typography } from "@mui/material";
import ProjectView from "../project-view";
import { getRandomProject } from "@/services/ProjectService";
import { useEffect } from "react";

export default async function RandomProject(randomProject : ProjectViewDto) {

    var post = ((await getRandomProject())?.data);

    return (
        <Container>
            <Typography variant="h2">Here's a project we choose for you</Typography>
            <ProjectView {...post}/>
        </Container>
    )
}