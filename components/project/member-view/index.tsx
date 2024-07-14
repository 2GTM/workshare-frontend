import { Avatar, Stack, Typography } from "@mui/material";

export default function MemberView(memberName : string) {
    
    return (
        <Stack direction={"row"}>
            <Avatar>{memberName.at(0)}</Avatar>
            <Typography>{memberName}</Typography>
        </Stack>
    )
}