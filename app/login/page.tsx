"use client";

import FormikInput from "@/components/shared/FormikInput";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { object, string } from "yup";

export default function Login() {
    return (
        <Container>

            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={object({
                    username : string()
                        .required("username is required")
                        .min(4, "username need to be at least 4 characters.")
                        .max(30, "username need to be at most 30 characters."),
                    password : string()
                        .required("password is required")
                        .min(8, "password need to be at least 8 characters.")
                        .max(100, "password need to be at most 100 characters.")
                })}
            >
                <Form>
                    <Stack alignItems="center" justifyContent="center" flexWrap="wrap" direction="row" spacing={2} useFlexGap>
                        <Stack width={500} spacing={2} useFlexGap flexWrap="wrap">
                            <Typography variant="h3">Login</Typography>
                            <Field name="username" component={FormikInput} label="Username" />
                            <Field name="password" component={FormikInput} label="Password" />

                            <Button variant="contained">Sign in</Button>
                        </Stack>

                        <Image alt="arduino" src="/arduino.avif" width={550} height={600} />
                    </Stack>
                </Form>
            </Formik>
        </Container>
    );
}