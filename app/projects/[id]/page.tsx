import { ProjectViewDto } from "@/models/ProjectViewDto";
import { getProjectById } from "@/services/ProjectService";
import { Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function ProjectPage({params} : any) {

    const project : ProjectViewDto = (await getProjectById(params.id)).data;
    
    return (
        <Container>
            <Typography>Members</Typography>
            <Stack>
                {
                    project.membersUsername.map((name) => 
                        <Link href={`/clients/${name}`}>{name}</Link>
                    )
                }
            </Stack>
        </Container>
    );
}