"use client";

import FormikInput from "@/components/shared/FormikInput";
import { getAllUsernames } from "@/services/ClientService";
import { createProject } from "@/services/ProjectService";
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { array, object, string } from "yup";
import config from "@/config.json";

export function BaseCreateDialog(props: { closeAction?: any }) {
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
        <Formik
            initialValues={{
                title: "",
                description: "",
                membersUsername: [],
                linksContent: new Array<{ content: string, visibility: number }>(),
                tagsContent: []
            }}
            onSubmit={async (values) => {
                (values as any)["publisherName"] = config.publisherName;
                await createProject(values as any);
                props.closeAction?.();
                router.refresh();
            }}
            validationSchema={object({
                title: string()
                    .required("title is required.")
                    .min(5, "title should have at least 5 characters.")
                    .max(30, "title should have at most 30 characters.")
                ,
                description: string()
                    .required("description is required.")
                    .min(10, "description should have at least 10 characters.")
                    .max(50, "description should have at most of 50 characters."),
                membersUsername: array().max(10, "Your project cannot have more than 10 members."),
                linksContent: array().of(
                    object({
                        content: string().required("link cannot be empty.").url("link need to enter a valid url.")
                    })
                ),
                tagsContent :
                    array()
            })}
        >
            {({ handleBlur, errors, touched, setFieldValue, values, handleChange }) => (
                <>
                    <DialogTitle>Create Project</DialogTitle>
                    <Divider />

                    <DialogContent>
                        <Form id="project-save">
                            <Stack spacing={3}>
                                <Field name="title" component={FormikInput} label="Title" />
                                <Field name="description" component={FormikInput} multiline label="Description" />

                                <Autocomplete
                                    freeSolo
                                    options={[]}
                                    value={values.tagsContent}
                                    multiple
                                    onChange={(e, value) => {
                                        setFieldValue("tagsContent", value)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={"Tags"}
                                            name="tagsContent"
                                            onBlur={handleBlur}
                                            error={(errors.tagsContent && Boolean(touched.tagsContent)) as boolean}
                                            helperText={<ErrorMessage name="tagsContent" />}
                                        />
                                    )}
                                >
                                </Autocomplete>

                                <Autocomplete
                                    defaultValue={[]}
                                    options={usernames}
                                    multiple
                                    noOptionsText="No user found"
                                    onChange={(e, value) => {
                                        setFieldValue("membersUsername", value)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={"Members"}
                                            name="membersUsername"
                                            onBlur={handleBlur}
                                            error={(errors.membersUsername && Boolean(touched.membersUsername)) as boolean}
                                            helperText={<ErrorMessage name="membersUsername" />}
                                        />
                                    )}
                                >
                                </Autocomplete>

                                <FieldArray
                                    name="linksContent"
                                >
                                    {({ push, remove }) => (
                                        <Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1">Links : </Typography>
                                                <Button onClick={() => push({ content: "", visibility: "PUBLIC" })}>Add link</Button>
                                            </Stack>

                                            {values.linksContent.map((link, index) => (
                                                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                                    <IconButton onClick={() => remove(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>

                                                    <Field
                                                        name={`linksContent[${index}].content`}
                                                        component={FormikInput}
                                                        fullWidth
                                                        error={!!errors.linksContent?.[index] && Boolean(touched.linksContent?.[index])}
                                                    />

                                                    <RadioGroup
                                                        defaultValue={link.visibility}
                                                        onChange={handleChange}
                                                        name={`linksContent[${index}].visibility`}
                                                    >
                                                        <FormControlLabel value="PUBLIC" control={<Radio />} label="Public" />
                                                        <FormControlLabel value="MEMBERS" control={<Radio />} label="Members" />
                                                        <FormControlLabel value="PRIVATE" control={<Radio />} label="Private" />
                                                    </RadioGroup>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Stack>
                        </Form>
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button variant="text" onClick={() => props.closeAction?.()}>Cancel</Button>
                        <Button type="submit" form="project-save">Update</Button>
                    </DialogActions>
                </>
            )}
        </Formik>
    );
}

export function CreateButtonAndDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Create</Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <BaseCreateDialog closeAction={() => setOpen(false)} />
            </Dialog>
        </>
    );
}