'use client';

import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Avatar, AvatarGroup, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectView(project: ProjectViewDto) {

    const router = useRouter();
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
        setVoted(!voted);
        // ADD THE CHANGE TO DB
        !voted ? project.voteCount++ : project.voteCount--;
    }

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

                <CardContent component={Stack} spacing={1.5}>
                    <Typography variant="body2">{project.description}</Typography>

                    <Stack direction="row">
                        {project.tagsContent?.map(tag => (
                            <Chip label={tag} key={tag} />
                        ))}
                    </Stack>

                    <AvatarGroup total={project.membersUsername.length} max={3}>
                        {project.membersUsername.map((name, index) =>
                            <Avatar key={index}>{name.at(0)}</Avatar>
                        )}
                    </AvatarGroup>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button>Collaborate</Button>
                <Button onClick={() => handleVote()} endIcon={(voted) ? <FavoriteIcon /> : <FavoriteBorderIcon />} sx={{ m: "10px" }} >Like</Button>
                <Typography fontSize={20}>{project.voteCount}</Typography>
            </CardActions>
        </Card>
    );
}