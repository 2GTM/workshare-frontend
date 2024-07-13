import { Typography } from "@mui/material";

export default function ClientPage({params} : any) {
    return (
        <>
            <Typography>{params.username}</Typography>
        </>
    );
}