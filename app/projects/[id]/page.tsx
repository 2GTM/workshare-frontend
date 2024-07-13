import { ProjectViewDto } from "@/models/ProjectViewDto";
import { getProjectById } from "@/services/ProjectService";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function ProjectPage({params} : any) {

    const project : ProjectViewDto = (await getProjectById(params.id)).data;
    
    return (
        <Container>

            <Stack >
                <Typography variant="h3">{project.title}</Typography>
                <Typography variant="h5" >{project.description}</Typography>
                <Divider/>
            </Stack>
            
            <Box border={1} p={2}>
                <Typography>Members</Typography>
                
                <Stack>
                    {
                        project.membersUsername.map((name, index) => 
                            <Link key={index} href={`/clients/${name}`}>{name}</Link>
                        )
                    }
                </Stack>
            </Box>
        </Container>
    );
}