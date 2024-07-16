import http from "@/http";

const REQUEST_MAPPING = "/api/auth";

export function signUp(username: string, password: string) {
    return http.post(`${REQUEST_MAPPING}/sign-up`, undefined, { params: { username, password } });
}

export function login(username: string, password: string) {
    return http.post(`${REQUEST_MAPPING}/login`, undefined, { params: { username, password } });
}

export function validateToken(token: string) {
    return http.post(`${REQUEST_MAPPING}/validate-token`, undefined, {params : {token}});
}