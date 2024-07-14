import { CreateButtonAndDialog } from "@/components/project/create-update-dialog"
import ProjectsFilters from "@/components/project/filters"
import ProjectSection from "@/components/project/project-section"
import { searchProjects } from "@/services/ProjectService"
import { Divider, Stack, Typography } from "@mui/material"

type SearchProjectsProps = {
    searchParams: {
        content: string;
        tags: string[];
    };
}

export default async function SearchProjects({ searchParams }: SearchProjectsProps) {
    const projects = (await searchProjects(searchParams.content, searchParams.tags)).data

    return (
        <Stack spacing={6} margin={5}>
            <ProjectsFilters />

            <ProjectSection
                title={
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">Search Results </Typography>
                            <CreateButtonAndDialog />
                        </Stack>
                        <Divider />
                    </>
                }
                projects={projects}
            />
        </Stack>
    )
}