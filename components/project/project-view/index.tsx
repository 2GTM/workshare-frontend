'use client';

import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/navigation";

export default function ProjectView(project :  ProjectViewDto) {

    const router = useRouter();

    return (
        <Card variant="outlined">
            <CardActionArea onClick={() => router.push(`/projects/${project.id}`)}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {project.title.at(0)}
                        </Avatar>
                    }
                    title={project.title}
                    subheader={project.date}
                />
                <CardContent>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button endIcon={<FavoriteIcon/>} sx={{m: "10px"}} >Like</Button>
                <Typography fontSize={20}>0</Typography>
            </CardActions>
        </Card>
    );
}