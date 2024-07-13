import ProjectSection from "@/components/project/project-section"
import { searchProjects } from "@/services/ProjectService"
import { Container, Typography } from "@mui/material"
import { Suspense } from "react"

export default async function SearchProjects() {
    const projects = (await searchProjects()).data

    return (
        <Container>
            <Typography variant="h4">Search Projects</Typography>
            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectSection projects={projects} />
            </Suspense>
        </Container>
    )    
}