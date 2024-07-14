'use client';

import { IconButton, Stack, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";

export default function ShareLink(props : any) {

    const handleCopyClipboard = (linkContent : string) => {
        navigator.clipboard.writeText(linkContent);
        toast("the link has been copied to clipboard");
    }

    return (
        <> 
            { 
                <Stack direction="row" gap={1}>
                    <Typography color="gray">{props.content}</Typography> 
                    <IconButton onClick={() => handleCopyClipboard(props.content)}> 
                        <ContentCopyIcon/>
                    </IconButton>
                </Stack>
            }
        </>
    )    
}