import { CreateEditCard } from "@/components/project/create-update-dialog";
import { editProject } from "@/services/ProjectService";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

export default async function UpdateProject({ params }: { params: { id: number } }) {
    const project = (await editProject(params.id, cookies().get("token")?.value!))?.data;

    return (
        project ? (
            project === HttpStatusCode.Forbidden ?
                (
                    <p>You do not have the acces to this project.</p>
                ) : (
                    project === HttpStatusCode.NotFound ?
                        (
                            <p>No project found</p>
                        ) : (
                            <CreateEditCard project={project} projectId={params.id} />
                        )
                )
        ) : (
            <></>
        )
    );
}