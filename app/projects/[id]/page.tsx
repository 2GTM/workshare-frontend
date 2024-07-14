import MemberView from "@/components/project/member-view";
import ShareLink from "@/components/shared/ShareLink";
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { getProjectById } from "@/services/ProjectService";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";

export default async function ProjectPage({params} : any) {

    const project : ProjectViewDto = (await getProjectById(params.id)).data;
    
    return (
        <Container>
            <Stack gap={3}>
                <Stack gap={5} >
                    <Typography fontWeight={700} variant="h1">{project.title}</Typography>
                    <Typography variant="h4" >{project.description}</Typography>
                </Stack>

                <Divider/>

                <Box>
                    <Typography fontSize={30} mb={1}>Members</Typography>
                    <Stack direction={"row"} gap={2}>
                        {project.membersUsername.length !== 0 ?
                            project.membersUsername.map((name, index) => 
                                <MemberView key={index} name={name} />
                            )
                         : <Typography>No members</Typography>}
                    </Stack>
                </Box>
                
                <Stack>
                    <Typography fontSize={30}>Useful Links for the project</Typography>
                    {
                        project.linksContent.map((link,index) =>
                            <> 
                                {
                                    (link.visibility === "PUBLIC") ? <ShareLink {...link}/> : <></>
                                }
                            </>
                        )
                    }
                </Stack>
            </Stack>
        </Container>
    );
}