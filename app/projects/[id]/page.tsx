import { Container } from "@mui/material";

export default async function ProjectPage({params} : any) {

    //const project = (await getProjectById(params.id));
    
    return (
        <Container>
            <h1>Post {params.id}</h1>
            
        </Container>
    );
}