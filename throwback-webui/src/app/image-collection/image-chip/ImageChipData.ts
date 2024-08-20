export class ImageChipData{
    photoImageUrl:string;
    contentPageUrl:string;
    title:string;
    creatorName:string;
    creatorLink:string;

    constructor(photoImageUrl: string, contentPageUrl: string, title: string, creatorName: string, creatorLink: string) {
        this.photoImageUrl = photoImageUrl;
        this.contentPageUrl = contentPageUrl;
        this.title = title;
        this.creatorName = creatorName;
        this.creatorLink = creatorLink;
    }
}
