import {environment} from "../../environments/environment";

export class ContentResponse{
    title:string = "";
    creator: string = "";
    filename: string = "";
    createdDate:Date|undefined = new Date();
    description:string = "";
    url_safe_name:string = "";



    constructor(title: string, creator: string, filename: string, createdDate: Date, description: string,url_safe_name:string) {
        this.title = title;
        this.creator = creator;
        this.filename = filename;
        this.createdDate = createdDate;
        this.description = description;
        this.url_safe_name = url_safe_name;
    }

}

export function makeEmptyContentResponse():ContentResponse{
    return new ContentResponse("","", "", new Date(),"","");
}

export function makeThumbnailUrl(res:ContentResponse):string{
    return environment["S3-URL"] + "/" + res.filename
}