import { ProjectViewDto } from "@/models/ProjectViewDto";
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProjectView(project :  ProjectViewDto) {

    return (
        <Card variant="outlined">
            <CardActionArea>
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