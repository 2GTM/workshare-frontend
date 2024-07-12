import ProjectView from "@/components/project/project-view"
import { Container, Stack } from "@mui/material"

export default function TrendPage() {

    const testData = [
        {
            id: 1,
            title: "cool idea",
            description: "cool description",
            date: "01/05/2024"
        },
        {
            id: 2,
            title: "cool stuff",
            description: "cool description",
            date: "01/05/2024"
        },
        {
            id: 3,
            title: "cool mania",
            description: "cool description",
            date: "01/05/2024"
        },
    ]
    
    return (
        <Container >
            <Stack gap={5}>
                <h1> Trending project ideas ! </h1>
                {
                    testData.map(data => 
                        <ProjectView {...data} />
                    )
                }
            </Stack>
        </Container>
    )    
}