import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Divider, Grid, Stack } from "@mui/material";
import ProjectView from "../project-view";
import { ReactNode, Suspense } from "react";

export default function ProjectSection(props: { title?: ReactNode, projects: ProjectViewDto[] }) {
    return (
        <Stack gap={5}>
            {props.title}

            <Suspense fallback={<p>Loading projects...</p>}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {props.projects?.map((project, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <ProjectView {...project} />
                        </Grid>
                    ))}
                </Grid>
            </Suspense>
        </Stack>
    );
}