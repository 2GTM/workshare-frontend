import { Avatar, Grid, Stack, Typography } from "@mui/material";
import ClientInfo from "@/models/ClientDto";
import { getClientInfo } from "@/services/ClientService";
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import ProjectSection from "@/components/project/project-section";
import { CreateButtonAndDialog } from "@/components/project/create-update-dialog";

export default async function ClientPage({ params }: any) {
    const client: ClientInfo = (await getClientInfo(params.username)).data;
    console.log(client.projects);
    return (
        <>
            {client ?
                <Grid container spacing={2}>
                    <Box
                        position={"relative"}
                        height={1000}
                        width={500}
                        borderRadius={2}
                        sx={{ border: '2px solid grey' }}
                        margin={"auto"}
                        paddingTop={5}
                    >
                        <Box
                            borderRadius={2}
                            height={350}
                            width={350}
                            margin={"auto"}
                        >
                            <Avatar
                                sx={{ width: 350, height: 350 }}
                                variant="rounded"
                            >

                            </Avatar>
                        </Box>
                        <Box
                            marginLeft={9}
                            marginTop={5}
                            marginRight={5}
                        >
                            <Typography
                                fontWeight={"700"}
                                variant="h3"
                                textAlign={"left"}
                            >{client.username}
                            </Typography>
                            <Typography
                                fontWeight={"700"}
                                variant="h6"
                                textAlign={"left"}
                                color={"#bbbbbb"}>
                                {client.bio}
                            </Typography>
                            <MuiLink component={Link} href={client.github}><GitHubIcon style={{fontSize: "50px"}} /></MuiLink>&nbsp;
                                <MuiLink component={Link} href={client.linkedin}><LinkedInIcon style={{fontSize: "50px"}} /></MuiLink>
                            <Typography
                                fontWeight={"bold"}
                                marginTop={"auto"}
                                position={"absolute"}
                                bottom={0}
                                marginLeft={8}
                                marginBottom={2}
                            >
                                IS WORKING ON {client.projects.length} PROJECT(S)
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        height={1000}
                        width={2000}
                        borderRadius={2}
                        sx={{ border: '2px solid grey' }}
                        padding={5}
                    >
                        <ProjectSection
                            projects={client.projects}
                        ></ProjectSection>
                    </Box>
                </Grid>
                :
                <Typography
                    variant="h2"
                    textAlign="center"
                >The user is not found</Typography>

            }
        </>
    );
}