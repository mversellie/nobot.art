export class ContentResponse{
    title:String = "";
    creator: String = "";
    filename: String = "";
    createdDate:Date|undefined = new Date();
    description:String = "";
    url_safe_name:String = "";



    constructor(title: String, creator: String, filename: String, createdDate: Date, description: String,url_safe_name:String) {
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