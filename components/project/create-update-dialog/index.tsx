"use client";

import FormikInput from "@/components/shared/FormikInput";
import LabelIcon from "@/components/shared/LabelIcon";
import config from "@/config.json";
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { getAllUsernames } from "@/services/ClientService";
import { createProject, updateProject } from "@/services/ProjectService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { array, object, string } from "yup";
import Tags from "./components/tags";

export function CreateEditCard(props: { project?: ProjectViewDto, projectId?: number }) {
    const router = useRouter();
    const isEdit = props.project != undefined;

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
        <Container>
            <Formik
                initialValues={{
                    title: props.project?.title ?? "",
                    description: props.project?.description ?? "",
                    membersUsername: props.project?.membersUsername ?? [],
                    linksContent: props.project?.linksContent ?? new Array<{ content: string, visibility: number }>(),
                    tagsContent: props.project?.tagsContent ?? []
                }}
                onSubmit={async (values) => {
                    (values as any)["publisherName"] = config.publisherName;

                    if (props.project) {
                        await updateProject(values as any, props.projectId!, Cookies.get("token")!);
                        router.push("/projects/search?content=");
                    }

                    else {
                        await createProject(values as any, Cookies.get("token")!);
                        router.push("/projects/search?content=");

                        // Added router.refresh() because when testing, sometime the frontend re get the data.
                        router.refresh();
                    }
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
                    <Form id="project-save">
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h4">{isEdit ? "Edit Project" : "Create Project"}</Typography>
                                }
                            />

                            <Divider />

                            <CardContent>
                                <Stack spacing={3}>
                                    <Typography variant="h6">Project informations</Typography>

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
                                                    <Typography variant="h6">Links</Typography>

                                                    <IconButton onClick={() => push({ content: "", visibility: "PUBLIC" })}>
                                                        <AddCircleIcon color="primary" fontSize="medium" />
                                                    </IconButton>
                                                </Stack>

                                                {values.linksContent?.length == 0 ?
                                                    <Typography variant="body1">Press the plus button to add links.</Typography> :
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
                            </CardContent>
                            <Divider />

                            <CardActions sx={{ float: "right" }}>
                                {isEdit ? <Button variant="text" onClick={() => router.back()}>Cancel</Button> : <></>}
                                <Button type="submit" form="project-save">{isEdit ? "Save" : "Post your project"}</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export function CreateButtonLink() {
    const router = useRouter();

    return (
        <>
            <Button onClick={() => router.push("/projects/new")}>Create Project</Button>
        </>
    );
}