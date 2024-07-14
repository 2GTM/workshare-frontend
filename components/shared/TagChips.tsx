import { Chip, Stack } from "@mui/material";


export default function TagChips(props : any) {
    return (
        <Stack direction="row" gap={0.5}>
            {
                props.tags?.map((tag : string) => 
                    <Chip style={{borderRadius: "5px"}} variant="outlined" key={tag} label={tag}/>
                )
            }
        </Stack>
    )
}