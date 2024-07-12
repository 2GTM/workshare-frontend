import http from "@/http";

const REQUEST_MAPPING = "/api/clients";

export const getAllUsernames = () => {
    return http.get(REQUEST_MAPPING + "/usernames")
}