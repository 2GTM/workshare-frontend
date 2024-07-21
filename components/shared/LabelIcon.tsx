import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function LabelIcon(props: { label: string, icon?: ReactNode }) {
    return (
        <Stack direction="row" alignItems="center" spacing={0.15}>
            {props.icon}
            <label>{props.label}</label>
        </Stack>
    );
}