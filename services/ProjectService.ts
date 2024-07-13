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
    return http.post(REQUEST_MAPPING, undefined, { params: projectViewDto, paramsSerializer: { indexes: null } });
}

export const updateProject = (projectViewDto: ProjectViewDto) => {
    return http.patch(`${REQUEST_MAPPING}/${projectViewDto.id}`, undefined, { params: projectViewDto, paramsSerializer: { indexes: null } });
}