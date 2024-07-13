import ProjectView from "@/components/project/project-view"
import { getTrendingProjects } from "@/services/ProjectService"
import { Container, Stack } from "@mui/material"

export default async function TrendPage() {

    const trends = (await getTrendingProjects()).data

    return (
        <Container >
            <Stack gap={3}>
                <h1> Trending project ideas ! </h1>
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