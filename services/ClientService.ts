import http from "@/http";
import ClientInfo from "@/models/ClientDto";

const REQUEST_MAPPING = "/api/clients";

export const getAllUsernames = () => {
    return http.get(REQUEST_MAPPING + "/usernames")
}

export const getClientInfo = (username: string) => {
    return http.get<ClientInfo>(`${REQUEST_MAPPING}/${username}`);
}

export const exists = (username: string) => {
    return http.get(`${REQUEST_MAPPING}/exists`, { params: { username } });
}