"use client";

import FormikInput from "@/components/shared/FormikInput";
import { login, signUp } from "@/services/AuthService";
import { exists } from "@/services/ClientService";
import { Button, Container, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { object, string } from "yup";

const USERNAME_EXISTS = "username already exists.";

export default function Auth(props: { isLogin?: boolean }) {
    const [invalidUsername, setInvalidUsernames] = useState<string[]>([]);
    const router = useRouter();

    return (
        <Container>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={async (values, formikHelpers) => {
                    if (props.isLogin) {
                        await login(values.username, values.password)
                            .then(res => {
                                localStorage.setItem("token", res.data.token);
                                router.push("/")
                            })
                            .catch((error: AxiosError) => {
                                if (error.response?.status == 403) {
                                    formikHelpers.resetForm({ errors: { username: "username or password does not exists." }, touched: { username: true } });
                                }
                            });
                    }

                    else {
                        // To check if the username already exists for Login.
                        if ((await exists(values.username)).data) {
                            setInvalidUsernames([...invalidUsername, values.username]);
                            formikHelpers.setFieldError("username", USERNAME_EXISTS);
                            return;
                        }

                        localStorage.setItem("token", (await signUp(values.username, values.password)).data.token);
                        router.push("/")
                    }
                }}
                validationSchema={object({
                    username: string()
                        .required("username is required")
                        .min(4, "username need to be at least 4 characters.")
                        .max(30, "username need to be at most 30 characters.")
                        .notOneOf(invalidUsername, USERNAME_EXISTS)
                    ,
                    password: props.isLogin ?
                        string()
                            .required("password is required.")
                        :
                        string()
                            .required("password is required")
                            .min(8, "password need to be at least 8 characters.")
                            .max(100, "password need to be at most 100 characters.")
                })}
            >
                <Form>
                    <Stack alignItems="center" justifyContent="center" flexWrap="wrap" direction="row" spacing={2} useFlexGap>
                        <Stack width={450} spacing={2} useFlexGap flexWrap="wrap">
                            <Typography variant="h3">{props.isLogin ? "Login" : "Sign up"}</Typography>
                            <Typography variant="subtitle1">{props.isLogin ? "Welcome back! Nice to see you again!" : "The place where the dreams become projects."}</Typography>
                            <Field name="username" component={FormikInput} label="Username" />
                            <Field name="password" component={FormikInput} label="Password" type="password" />

                            <Button type="submit">{props.isLogin ? "Sign in" : "Create account"}</Button>
                        </Stack>

                        <Image alt="arduino" src={props.isLogin ? "/arduino.avif" : "/dream.webp"} width={600} height={600} priority />
                    </Stack>
                </Form>
            </Formik>
        </Container >
    );
}