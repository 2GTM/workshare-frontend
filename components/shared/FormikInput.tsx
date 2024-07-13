import { TextField } from "@mui/material";
import { ErrorMessage, FieldProps } from "formik";
import { HTMLInputTypeAttribute } from "react";

type FormikInputProps = {
    multiline?: boolean;
    type?: HTMLInputTypeAttribute;
    label?: string;
    fullWidth?: boolean;
}

export default function FormikInput(props: FormikInputProps & FieldProps) {
    const { name } = props.field;

    return (
        <TextField
            {...props.field}
            fullWidth={props.fullWidth}
            label={props.label}
            type={props.type}
            multiline={props.multiline}
            rows={props.multiline ? 5 : undefined}
            error={!!props.form.errors[name] && Boolean(props.form.touched[name])}
            helperText={<ErrorMessage name={name} />}
        />
    );
};