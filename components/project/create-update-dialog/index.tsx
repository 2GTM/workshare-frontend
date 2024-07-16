"use client";

import FormikInput from "@/components/shared/FormikInput";
import { getAllUsernames } from "@/services/ClientService";
import { createProject } from "@/services/ProjectService";
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { array, object, string } from "yup";
import config from "@/config.json";
import Tags from "./components/tags";
import LabelIcon from "@/components/shared/LabelIcon";
import PeopleIcon from '@mui/icons-material/People';
import LinkIcon from '@mui/icons-material/Link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from "js-cookie";

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
                await createProject(values as any, Cookies.get("token")!);
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
                tagsContent:
                    array()
            })}
        >
            {({ handleBlur, errors, touched, setFieldValue, values, handleChange }) => (
                <>
                    <DialogTitle variant="h4">Create Project</DialogTitle>
                    <Divider />

                    <DialogContent>
                        <Form id="project-save">
                            <Stack spacing={3}>
                                <Typography variant="h5">Project informations</Typography>

                                <Field name="title" component={FormikInput} label="Title" />
                                <Field name="description" component={FormikInput} multiline label="Description" />

                                <Tags name="tagsContent" />

                                <Autocomplete
                                    defaultValue={[]}
                                    options={usernames}
                                    multiple
                                    noOptionsText="No user found"
                                    onChange={(e, value) => {
                                        setFieldValue("membersUsername", value)
                                    }}
                                    renderTags={(values, getTagProps) => (
                                        values.map((member, index) => (
                                            <Chip {...getTagProps({ index })} label={member} avatar={<Avatar>{member?.at(0)}</Avatar>} />
                                        ))
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={<LabelIcon icon={<PeopleIcon />} label="Members" />}
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
                                            <Stack direction="row" alignItems="center">
                                                <Typography variant="h5">Links</Typography>

                                                <IconButton onClick={() => push({ content: "", visibility: "PUBLIC" })}>
                                                    <AddCircleIcon color="primary" fontSize="medium" />
                                                </IconButton>
                                            </Stack>

                                            {values.linksContent?.length == 0 ?
                                                <p>Press the plus button to add links.</p> :
                                                (
                                                    values.linksContent.map((link, index) => (
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
                                                    ))
                                                )
                                            }
                                        </Stack>
                                    )}
                                </FieldArray>
                            </Stack>
                        </Form>
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button variant="text" onClick={() => props.closeAction?.()}>Cancel</Button>
                        <Button type="submit" form="project-save">Create</Button>
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
                fullScreen
            >
                <BaseCreateDialog closeAction={() => setOpen(false)} />
            </Dialog>
        </>
    );
}