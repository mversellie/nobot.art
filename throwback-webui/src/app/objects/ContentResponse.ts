import {environment} from "../../environments/environment";

export class ContentResponse{
    title:string = "";
    creator: string = "";
    filename: string = "";
    createdDate:Date|undefined = new Date();
    description:string = "";
    url_safe_name:string = "";
    userMeta:ContentMeta



    constructor(title: string, creator: string, filename: string, createdDate: Date, description: string,url_safe_name:string) {
        this.title = title;
        this.creator = creator;
        this.filename = filename;
        this.createdDate = createdDate;
        this.description = description;
        this.url_safe_name = url_safe_name;
    }

}

export class ContentMeta{
    like_count:number
    dislike_count:number
    view_count:number
    viewer_status:number


    constructor(like_count: number, dislike_count: number, view_count: number, viewer_status: number) {
        this.like_count = like_count;
        this.dislike_count = dislike_count;
        this.view_count = view_count;
        this.viewer_status = viewer_status;
    }
}

export function makeEmptyContentResponse():ContentResponse{
    return new ContentResponse("","", "", new Date(),"","");
}

export function makeThumbnailUrl(res:ContentResponse):string{
    return environment["S3-URL"] + "/" + res.filename
}