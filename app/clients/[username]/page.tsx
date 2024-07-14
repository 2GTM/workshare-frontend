import { Avatar, Typography } from "@mui/material";
import ClientInfo from "@/models/ClientDto";
import { getClientInfo } from "@/services/ClientService";
import Box from '@mui/material/Box';

export default async function ClientPage({ params }: any) {

    const client: ClientInfo = (await getClientInfo(params.username)).data;

    return (
        <>
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
                        sx={{ width: 350, height: 350}}
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
                        variant="h3"
                        textAlign={"left"}
                    >Username</Typography>
                    <Typography
                        variant="h6"
                        textAlign={"left"}
                        color={"#bbbbbb"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium purus et enim ultricies, eget ultricies velit vehicula. Pellentesque id mollis ex, eu suscipit mauris.
                    </Typography>
                    <Typography
                    marginTop={5}
                    fontWeight={"bold"}
                    >
                        IS WORKING ON 5 PROJECTS
                    </Typography>
                    </Box>
            </Box>
        </>
    );
}