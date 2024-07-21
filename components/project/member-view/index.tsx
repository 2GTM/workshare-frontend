import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";

export default function MemberView(props : any) {

    return (
        <Stack direction={"row"}>
            <MuiLink underline="none" href={`/clients/${props.name}`}>
                <Tooltip title={props.name} placement="top-start">
                    <Avatar>{props.name.at(0)}</Avatar>
                </Tooltip>
            </MuiLink>
        </Stack>
    )
}