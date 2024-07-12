import { Container } from "@mui/material";

export default async function ProjectPage({params} : any) {
    return (
        <Container>
            <h1>Post {params.id}</h1>
            
        </Container>
    );
}