import http from "@/http";
import { ProjectViewDto } from "@/models/ProjectViewDto";

const REQUEST_MAPPING = "/api/projects";

export const getTrendingProjects = () => {
    return http.get<ProjectViewDto[]>(`${REQUEST_MAPPING}/trend`);
}

export const getProjectById = (projectId : number) => {
    return http.get<ProjectViewDto>(`${REQUEST_MAPPING}/${projectId}`);
}

export const getRandomProject = () => {
    return http.get<ProjectViewDto>(`${REQUEST_MAPPING}/random`);
}

export const createProject = (projectViewDto: ProjectViewDto) => {
    return http.post(REQUEST_MAPPING, projectViewDto);
}

export const updateProject = (projectViewDto: ProjectViewDto) => {
    return http.patch(`${REQUEST_MAPPING}/${projectViewDto.id}`,projectViewDto);
}

export const searchProjects = (content: string, tags: string[]) => {
    return http.get(`${REQUEST_MAPPING}/search`, {params : {content, tags}, paramsSerializer : {indexes : null}});
}

export const addMemberProject  = (projectId : number, clientName : string) => {
    return http.post(`${REQUEST_MAPPING}/${projectId}/addMember`, undefined, {params : {clientName}})
}

export const voteProject = (projectId : number, clientName : string) => {
    return http.post(`${REQUEST_MAPPING}/${projectId}/vote`, undefined, {params : {clientName}})
}