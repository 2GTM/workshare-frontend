'use client';

import TagChips from "@/components/shared/TagChips";
import config from "@/config.json";
import { ProjectViewDto } from "@/models/ProjectViewDto";
import { addMemberProject, removeMemberProject, voteProject } from "@/services/ProjectService";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, AvatarGroup, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Container, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProjectView(project: ProjectViewDto) {
    const userName = config.publisherName;
    const isOwnerOfProject = config.publisherName == project.publisherName;

    const router = useRouter();
    const [voted, setVoted] = useState(false);
    const [isCollab, setIsCollab] = useState(project.membersUsername.includes(userName));

    const handleVote = async () => {
        voteProject(project.id, userName);

        (!voted) ? project.voteCount++ : project.voteCount--;
        setVoted(!voted);
    }

    const handleCollab = () => {
        if (project.publisherName !== config.publisherName) {

            if (!isCollab) {
                addMemberProject(project.id, userName, false);
                toast.success("You are now a collaborator on this project ! ");
            } else {
                removeMemberProject(project.id, userName, true);
            }
            setIsCollab(!isCollab);
        }
        router.refresh();
    }

    return (
        <Card sx={{ minHeight: 310, display: "flex", flexDirection: "column" }}>
            <CardActionArea onClick={() => router.push(`/projects/${project.id}`)}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {project.publisherName.at(0)}
                        </Avatar>
                    }
                    title={<Typography fontSize={20}>{project.title}</Typography>}
                    subheader={
                        <label style={{ color: isOwnerOfProject ? "orange" : undefined }}>{isOwnerOfProject ? "You" : project.publisherName}</label>
                    }
                />

                <CardContent component={Stack} spacing={1.5}>

                    <Typography variant="body2">{project.description}</Typography>

                    <Stack direction="row" spacing={18}>
                        <TagChips tags={project.tagsContent} />
                    </Stack>
                </CardContent>
            </CardActionArea>

            <Container sx={{ margin: "auto" }}>
                <CardActions>
                    <AvatarGroup total={project.membersUsername.length} max={2}>
                        {project.membersUsername.map((name, index) =>
                            <Avatar key={index}>{name.at(0)}</Avatar>
                        )}
                    </AvatarGroup>
                    <Button onClick={handleCollab}>{(!isCollab) ? <Typography>Collaborate</Typography> : <Typography>X Collab</Typography>}</Button>

                    <Button onClick={handleVote} endIcon={(voted) ? <FavoriteIcon /> : <FavoriteBorderIcon />}>Like</Button>
                    <Typography fontSize={20}>{project.voteCount}</Typography>

                </CardActions>
            </Container>
        </Card>
    );
}