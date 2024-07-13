import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Stack } from "@mui/material";
import ProjectView from "../project-view";

export default function ProjectSection(props: {projects: ProjectViewDto[]}) {
    return (
        <Stack gap={1}>
            {
                props.projects?.map((project, index) =>
                    <ProjectView
                        key={index} {...project}
                    />
                )
            }
        </Stack>
    );
}