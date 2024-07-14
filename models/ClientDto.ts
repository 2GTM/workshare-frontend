import { ProjectViewDto } from "./ProjectViewDto";

export default interface ClientInfo {
    username: string,
    bio: string,
    github:string,
    linkedin:string,
    projects: ProjectViewDto[]
}