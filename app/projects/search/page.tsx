import { CreateButtonAndDialog } from "@/components/project/create-update-dialog"
import ProjectSection from "@/components/project/project-section"
import { searchProjects } from "@/services/ProjectService"
import { Container, Stack, Typography } from "@mui/material"
import { Suspense } from "react"

export default async function SearchProjects() {
    const projects = (await searchProjects()).data

    return (
        <Container component={Stack} spacing={2}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">Search Projects</Typography>
                <CreateButtonAndDialog />
            </Stack>

            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectSection projects={projects} />
            </Suspense>
        </Container>
    )
}