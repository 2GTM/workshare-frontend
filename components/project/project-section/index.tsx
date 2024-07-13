import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Grid, Stack } from "@mui/material";
import ProjectView from "../project-view";
import { ReactNode, Suspense } from "react";

export default function ProjectSection(props: { title: ReactNode, projects: ProjectViewDto[] }) {
    return (
        <Stack spacing={1}>
            {props.title}

            <Suspense fallback={<p>Loading projects...</p>}>
                <Grid flexWrap="wrap"container gap={2} alignItems="stretch">
                    {
                        props.projects?.map((project, index) =>
                            <ProjectView
                                key={index} {...project}
                            />
                        )
                    }
                </Grid>
            </Suspense>
        </Stack>
    );
}