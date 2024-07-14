import { Avatar, Typography } from "@mui/material";
import ClientInfo from "@/models/ClientDto";
import { getClientInfo } from "@/services/ClientService";
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

export default async function ClientPage({ params }: any) {
    const client: ClientInfo = (await getClientInfo(params.username)).data;
    return (
        <>
            {client ?
                <Box
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
                        >{client.username}&nbsp;
                            <MuiLink component={Link} href={client.github}><GitHubIcon fontSize="large"/></MuiLink>
                        </Typography>
                        <Typography
                            fontWeight={"700"}
                            variant="h6"
                            textAlign={"left"}
                            color={"#bbbbbb"}>
                            {client.bio}
                        </Typography>
                        <Typography
                            marginTop={5}
                            fontWeight={"bold"}
                        >
                            IS WORKING ON {client.projectsCount} PROJECT(S)
                        </Typography>
                    </Box>
                </Box>
                :
                <Typography
                    variant="h2"
                    textAlign="center"
                >The user is not found</Typography>
            }
        </>
    );
}