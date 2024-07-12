"use client";

import FormikInput from "@/components/shared/FormikInput";
import { getAllUsernames } from "@/services/ClientService";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
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

                }}
                onSubmit={(values) => {

                }}
                validationSchema={object({
                    title: string().required("title is required."),
                    description: string().required("description is required."),
                    member: array().max(3, "You cannot have more than 3 members.")
                })}
            >
                {({ handleBlur, handleChange, errors, touched }) => (

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
                                        renderInput={(params) => (
                                            <TextField
                                                label={"Members"}
                                                name="members"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                {...params}
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