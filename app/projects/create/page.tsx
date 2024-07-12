"use client";

import FormikInput from "@/components/shared/FormikInput";
import { getAllUsernames } from "@/services/ClientService";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { array, object, string } from "yup";

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
                    members: []
                }}
                onSubmit={(values) => {

                }}
                validationSchema={object({
                    title: string().required("title is required."),
                    description: string().required("description is required."),
                    members: array().max(10, "Your project cannot have more than 10 members.")
                })}
            >
                {({ handleBlur, errors, touched, setFieldValue }) => (
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