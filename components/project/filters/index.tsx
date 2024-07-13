"use client";

import FormikInput from "@/components/shared/FormikInput";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { stringify } from "qs";
import { useEffect } from "react";
import Tags from "../create-update-dialog/components/tags";

export default function ProjectsFilters() {
    const params = useSearchParams();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            content: params.get("content") ?? [],
            tags: params.getAll("tags") ?? []
        },
        onSubmit: (values) => {
            router.push(`?${stringify({ content: values.content, tags: values.tags }, { arrayFormat: "repeat" })}`);
        }
    });

    useEffect(
        () => {
            console.log("UPDATED");
            formik.setValues({ tags: params.getAll("tags"), content: params.get("content") as any })
        }, [params]
    );

    return (
        <FormikProvider value={formik}>
            <Form>
                <Stack spacing={2}>
                    <Typography variant="h4">Search Filters</Typography>

                    <Field name="content" component={FormikInput} label="Content" />
                    <Tags name="tags" />

                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={() => router.push("?content=")}>Clear filters</Button>
                        <Button type="submit">Apply filters</Button>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
}