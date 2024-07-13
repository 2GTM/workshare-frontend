import http from "@/http";
import { ProjectViewDto } from "@/models/ProjectViewDto";

const REQUEST_MAPPING = "/api/projects";

export const getTrendingProjects = () => {
    return http.get<ProjectViewDto[]>(`${REQUEST_MAPPING}/trend`);
}