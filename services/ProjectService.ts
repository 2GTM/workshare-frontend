import http from "@/http";
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { AxiosError, AxiosPromise, HttpStatusCode } from "axios";

const REQUEST_MAPPING = "/api/projects";

export const getTrendingProjects = () => {
    return http.get<ProjectViewDto[]>(`${REQUEST_MAPPING}/trend`);
}

export const getProjectById = (projectId: number) => {
    return http.get<ProjectViewDto>(`${REQUEST_MAPPING}/${projectId}`);
}

export const createProject = (projectViewDto: ProjectViewDto, token: string) => {
    return http.post(REQUEST_MAPPING, projectViewDto, { headers: { Authorization: "Bearer " + token } });
}

export const updateProject = (projectViewDto: ProjectViewDto, projectId: number, token: string) => {
    return http.patch(`${REQUEST_MAPPING}/${projectId}`, projectViewDto, { headers: { Authorization: "Bearer " + token } });
}

export const searchProjects = (content: string, tags: string[]) => {
    return http.get(`${REQUEST_MAPPING}/search`, { params: { content, tags }, paramsSerializer: { indexes: null } });
}

export const addMemberProject = (projectId: number, clientName: string, removing: boolean) => {
    return http.post(`${REQUEST_MAPPING}/${projectId}/add-member`, undefined, { params: { clientName, removing } })
}

export const removeMemberProject = (projectId: number, clientName: string, removing: boolean) => {
    return http.post(`${REQUEST_MAPPING}/${projectId}/remove-member`, undefined, { params: { clientName, removing } })
}

export const voteProject = (projectId: number, clientName: string) => {
    return http.post(`${REQUEST_MAPPING}/${projectId}/vote`, undefined, { params: { clientName } })
}

/**
 * To get a project for an edit. This fonction is needed because
 * it verify if the user requesting to view the data is the owner by checking is token.
 */
export function editProject(projectId: number, token: string): Promise<any> {
    return http.get<ProjectViewDto>(REQUEST_MAPPING + `/${projectId}/edit`, {headers : {Authorization : "Bearer "+token}})
        .catch((error: AxiosError) => {
            if(error.response?.status == HttpStatusCode.Forbidden) {
                return new Promise((resolve) => resolve({data : HttpStatusCode.Forbidden}));
            } else if(error.response?.status == HttpStatusCode.NotFound) {
                return new Promise((resolve) => resolve({data :HttpStatusCode.NotFound}));
            }
    });
}