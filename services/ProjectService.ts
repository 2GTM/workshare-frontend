import http from "@/http";
import { ProjectViewDto } from "@/models/ProjectViewDto";

const REQUEST_MAPPING = "/api/projects";

const createProject = (projectViewDto: ProjectViewDto) => {
    return http.post(REQUEST_MAPPING, undefined, { params: projectViewDto, paramsSerializer: { indexes: null } });
}

const updateProject = (projectViewDto: ProjectViewDto) => {
    return http.patch(`${REQUEST_MAPPING}/${projectViewDto.id}`, undefined, { params: projectViewDto, paramsSerializer: { indexes: null } });
}