import { Avatar, Stack, Tooltip, Typography } from "@mui/material";

export default function MemberView(memberName : string) {
    
    return (
        <Stack direction={"row"}>
            <Tooltip title={memberName} placement="top-start">
                <Avatar>{memberName.at(0)}</Avatar>
            </Tooltip>
        </Stack>
    )
}