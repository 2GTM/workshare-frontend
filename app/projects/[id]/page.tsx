import { ProjectViewDto } from "@/models/ProjectViewDto";
import { getProjectById } from "@/services/ProjectService";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function ProjectPage({params} : any) {

    const project : ProjectViewDto = (await getProjectById(params.id)).data;
    
    return (
        <Container>
            <Stack gap={3}>
                <Stack >
                    <Typography fontWeight={700} variant="h1">{project.title}</Typography>
                    <Typography variant="h4" >{project.description}</Typography>
                </Stack>
                <Divider/>
                <Box border={2} borderRadius={2}  p={2}>
                    <Typography fontSize={30}>Members</Typography>
                    <Stack direction={"row"} gap={2}>
                        {
                            project.membersUsername.map((name, index) => 
                                <Link key={index} href={`/clients/${name}`}>{name}</Link>
                            )
                        }
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}