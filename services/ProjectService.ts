import http from "@/http";
import { ProjectViewDto } from "@/models/ProjectViewDto";

const REQUEST_MAPPING = "/api/projects";

export const getTrendingProjects = () => {
    return http.get<ProjectViewDto[]>(`${REQUEST_MAPPING}/trend`);
}

export const getProjectById = (projectId : number) => {
    return http.get<ProjectViewDto>(`${REQUEST_MAPPING}/${projectId}`);
}

export const createProject = (projectViewDto: ProjectViewDto) => {
    return http.post(REQUEST_MAPPING, projectViewDto);
}

export const updateProject = (projectViewDto: ProjectViewDto) => {
    return http.patch(`${REQUEST_MAPPING}/${projectViewDto.id}`,projectViewDto);
}