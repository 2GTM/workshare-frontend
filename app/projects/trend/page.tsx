import ProjectSection from "@/components/project/project-section"
import ProjectView from "@/components/project/project-view"
import { getTrendingProjects } from "@/services/ProjectService"
import { Container, Stack, Typography } from "@mui/material"
import { Suspense } from "react"

export default async function TrendPage() {
    const trends = (await getTrendingProjects()).data

    return (
        <Container>
            <Typography fontSize={30}>Top 5 of the most liked ideas ! </Typography>
            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectSection projects={trends} />
            </Suspense>
        </Container>
    )    
}