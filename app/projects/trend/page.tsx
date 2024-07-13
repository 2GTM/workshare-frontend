import ProjectView from "@/components/project/project-view"
import { getTrendingProjects } from "@/services/ProjectService"
import { Container, Stack, Typography } from "@mui/material"

export default async function TrendPage() {

    const trends = (await getTrendingProjects()).data

    return (
        <Container>
            <Typography fontSize={30}>Top 5 of the most liked ideas ! </Typography>
            <Stack gap={1}>
                {
                    trends.map((project, index) => 
                        <ProjectView 
                            key={index} {...project} 
                        />
                    )
                }
            </Stack>
        </Container>
    )    
}