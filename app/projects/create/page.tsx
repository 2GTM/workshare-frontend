"use client";

import FormikInput from "@/components/shared/FormikInput";
import { getAllUsernames } from "@/services/ClientService";
import { CheckBox } from "@mui/icons-material";
import { Autocomplete, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { array, object, string } from "yup";
import DeleteIcon from '@mui/icons-material/Delete';
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";

export default function CreateProject() {
    const router = useRouter();
    const [usernames, setUsernames] = useState<string[]>([]);

    useEffect(
        () => {
            getAllUsernames().then(
                res => {
                    if (res.data) setUsernames(res.data);
                }
            );
        }, []
    );

    return (
        <Dialog open={true} onClose={() => router.back()} fullScreen>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    members: [],
                    links: new Array<{ content: string, visibility: number }>()
                }}
                onSubmit={(values) => {

                }}
                validationSchema={object({
                    title: string().required("title is required."),
                    description: string().required("description is required."),
                    members: array().max(10, "Your project cannot have more than 10 members.")
                })}
            >
                {({ handleBlur, errors, touched, setFieldValue, values, handleChange }) => (
                    <>
                        <DialogTitle>Create Project</DialogTitle>
                        <Divider />

                        <DialogContent>
                            <Form>
                                <Stack spacing={2}>
                                    <Field name="title" component={FormikInput} label="Title" />
                                    <Field name="description" component={FormikInput} multiline label="Description" />

                                    <Autocomplete
                                        options={usernames}
                                        multiple
                                        noOptionsText="No user found"
                                        onChange={(e, value) => {
                                            setFieldValue("members", value)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={"Members"}
                                                name="members"
                                                onBlur={handleBlur}
                                                error={(errors.members && Boolean(touched.members)) as boolean}
                                                helperText={<ErrorMessage name="members" />}
                                            />
                                        )}
                                    >
                                    </Autocomplete>

                                    <FieldArray
                                        name="links"
                                    >
                                        {({ push, remove }) => (
                                            <>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="subtitle1">Links</Typography>
                                                    <Button onClick={() => push({ content: "", visibility: "PUBLIC" })}>Add link</Button>
                                                </Stack>

                                                {values.links.map((l, index) => (
                                                    <Stack key={index} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                                        <IconButton onClick={() => remove(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>

                                                        <Field name={`links[${index}].content`} component={FormikInput} fullWidth />

                                                        <RadioGroup defaultValue={l.visibility}>
                                                            <Stack direction="row">
                                                                <FormControlLabel onChange={handleChange} name={`links[${index}].visibility`} value="PUBLIC" control={<Radio />} label="Public" />
                                                                <FormControlLabel onChange={handleChange} name={`links[${index}].visibility`} value="MEMBERS" control={<Radio />} label="Members" />
                                                                <FormControlLabel onChange={handleChange} name={`links[${index}].visibility`} value="PRIVATE" control={<Radio />} label="Private" />
                                                            </Stack>
                                                        </RadioGroup>
                                                    </Stack>
                                                ))}
                                            </>
                                        )}
                                    </FieldArray>
                                </Stack>
                            </Form>
                        </DialogContent>
                        <Divider />

                        <DialogActions>
                            <Button variant="text">Cancel</Button>
                            <Button form="">Update</Button>
                        </DialogActions>
                    </>
                )}
            </Formik>
        </Dialog>
    );
}