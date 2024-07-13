'use client';

import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Avatar, AvatarGroup, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
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
                            {project.publisherName.at(0)}
                        </Avatar>
                    }
                    title={<Typography fontSize={20}>{project.title}</Typography>}
                    subheader={project.publisherName} 
                />
                <CardContent>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                    <AvatarGroup total={project.membersUsername.length} max={3}>a
                        {
                            project.membersUsername.map((name) => 
                                <Avatar>{name.at(0)}</Avatar>
                            )
                        }
                    </AvatarGroup>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button endIcon={<FavoriteIcon/>} sx={{m: "10px"}} >Like</Button>
                <Typography fontSize={20}>{project.voteCount}</Typography>
            </CardActions>
        </Card>
    );
}