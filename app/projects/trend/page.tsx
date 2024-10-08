import ProjectSection from "@/components/project/project-section"
import ProjectView from "@/components/project/project-view"
import { getTrendingProjects } from "@/services/ProjectService"
import { Container, Divider, Stack, Typography } from "@mui/material"

export default async function TrendPage() {
    const trends = (await getTrendingProjects()).data

    return (
        <Container>
            <ProjectSection 
                title={<Typography fontWeight={700} variant="h2">Top 5 of the most liked ideas ! ❤️️ </Typography>} 
                projects={trends}
            />
        </Container>
    )
}