import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Stack } from "@mui/material";
import ProjectView from "../project-view";
import { ReactNode, Suspense } from "react";

export default function ProjectSection(props: { title: ReactNode, projects: ProjectViewDto[] }) {
    return (
        <Stack spacing={1}>
            {props.title}

            <Suspense fallback={<p>Loading projects...</p>}>
                <Stack spacing={1.75} useFlexGap>
                    {
                        props.projects?.map((project, index) =>
                            <ProjectView
                                key={index} {...project}
                            />
                        )
                    }
                </Stack>
            </Suspense>
        </Stack>
    );
}