import LabelIcon from "@/components/shared/LabelIcon";
import { Autocomplete, TextField } from "@mui/material";
import { ErrorMessage, useFormikContext } from "formik";
import TagIcon from '@mui/icons-material/Tag';

export default function Tags(props: {name: string}) {
    const formik = useFormikContext<any>();

    return (
        <Autocomplete
            freeSolo
            options={[]}
            value={formik.values.tagsContent}
            multiple
            onChange={(_, value) => {
                formik.setFieldValue(props.name, value)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={
                        <LabelIcon label="Tags" icon={<TagIcon />} />
                    }
                    onBlur={formik.handleBlur}
                    error={(formik.errors[props.name] && Boolean(formik.touched[props.name])) as boolean}
                    helperText={<ErrorMessage name={props.name} />}
                />
            )}
        />
    );
}