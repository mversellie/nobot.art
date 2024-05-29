export class ContentResponse{
    title:String = "";
    creator: String = "";
    link: String = "";
    thumbnail : String = "";
    createdDate:Date = new Date();
    description:String = "";
    contentId:String = "";


    constructor(title: String, creator: String, link: String, thumbnail: String, createdDate: Date, description: String, contentId: String) {
        this.title = title;
        this.creator = creator;
        this.link = link;
        this.thumbnail = thumbnail;
        this.createdDate = createdDate;
        this.description = description;
        this.contentId = contentId;
    }

    public makeEmpty():ContentResponse{
        return new ContentResponse("","", "","", new Date(),"","");
    }



}