import { Chip, Stack } from "@mui/material";


export default function TagChips(props : any) {
    return (
        <Stack direction="row">
            {
                props.tags?.map((tag : string) => 
                    <Chip key={tag} label={tag}/>
                )
            }
        </Stack>
    )
}