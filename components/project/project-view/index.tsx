'use client';

import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Avatar, AvatarGroup, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addMemberProject, voteProject } from "@/services/ProjectService";
import config from "@/config.json";
import TagChips from "@/components/shared/TagChips";
import toast from "react-hot-toast";

export default function ProjectView(project: ProjectViewDto) {

    const router = useRouter();
    const [voted, setVoted] = useState(false);
    const userName = config.publisherName;

    const handleVote = async () => {
        setVoted(!voted);
        voteProject(project.id, userName);
        (!voted) ? project.voteCount++ : project.voteCount--;
    }

    const handleCollab = () => {
        if (project.publisherName !== config.publisherName) {
            addMemberProject(project.id, userName);
            toast.success("You are now a collaborator on this project ! ");
        }
        router.refresh();
    }

    return (
        <Card sx={{ minHeight: 285, display: "flex", flexDirection: "column"}}>
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

                    <Stack direction="row" spacing={18}>
                        <TagChips tags={project.tagsContent} />
                    </Stack>
                </CardContent>
            </CardActionArea>
            
            <Container sx={{ marginTop: "auto"}}>
            <CardActions>
                    <AvatarGroup total={project.membersUsername.length} max={3}>
                        {project.membersUsername.map((name, index) =>
                            <Avatar key={index}>{name.at(0)}</Avatar>
                        )}
                    </AvatarGroup>
                    <Button onClick={handleCollab}>Collaborate</Button>

                    <Button onClick={handleVote} endIcon={(voted) ? <FavoriteIcon /> : <FavoriteBorderIcon />}>Like</Button>
                    <Typography fontSize={20}>{project.voteCount}</Typography>
            </CardActions>
            </Container>
        </Card>
    );
}