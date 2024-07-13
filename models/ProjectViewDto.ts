export interface ProjectViewDto {
    id: number;
    title: string;
    description: string;
    voteCount: number;
    date: string;
    publisherName: string;
    membersUsername: string[];
    linksContent: { content: string, visibility: number }[];
}
