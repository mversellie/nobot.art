export class ContentResponse{
    title:String = "";
    creator: String = "";
    filename: String = "";
    createdDate:Date|undefined = new Date();
    description:String = "";


    constructor(title: String, creator: String, filename: String, createdDate: Date, description: String) {
        this.title = title;
        this.creator = creator;
        this.filename = filename;
        this.createdDate = createdDate;
        this.description = description;
    }

    public makeEmpty():ContentResponse{
        return new ContentResponse("","", "", new Date(),"");
    }



}