export class PrivateMessageChoiceData {
    title:string
    user:string
    replies:PrivateMessageReply[]
}

export class PrivateMessageReply{
    content:string;
    date:string;
    username:string;
}