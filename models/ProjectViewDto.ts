export interface ProjectViewDto {
    id : number,
    title : string,
    description : string,
    voteCount : number,
    publisherName : string, 
    membersUsername : string[],
    linksContent : string[],
    date : Date
}