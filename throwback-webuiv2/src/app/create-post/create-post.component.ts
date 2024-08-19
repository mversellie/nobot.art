import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {FileUploadModule} from "primeng/fileupload";
import {EditorModule} from "primeng/editor";
import {ChipModule} from "primeng/chip";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ContentService} from "../services/content.service";

@Component({
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
    standalone: true,
    imports: [
        FileUploadModule,
        EditorModule,
        ChipModule,
        InputTextareaModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        RippleModule,
        ChipModule,
        EditorModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CreatePostComponent {

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
    @ViewChildren('fileUploader') fileUploader!: QueryList<ElementRef>;

    image: any;

    objectURL: string = '';

    tags: string[] = ['Software', 'Web'];

    contentForm:FormGroup ;

    // @ts-ignore
    filesToUpload:FileList;

    constructor(private contentService:ContentService, private router:Router) {
        this.contentForm = new FormGroup({
            fileData:new FormControl(),
            contentName:new FormControl(),
            contentDescription:new FormControl(),
            isAdult:new FormControl()
        });
    }

    async onSubmit() {
        console.log("submit!")
        return this.contentService.shipContentData(
            this.contentForm.value["contentName"],
            this.contentForm.value["contentDescription"],
            this.filesToUpload
        ).then((creatorAndName) =>
        { console.log("test")
            return this.router.navigate(["/" ,creatorAndName.creator,creatorAndName.name]);})}


    handleFile(event:any) {
        this.filesToUpload = event.files
        const previewFile = this.filesToUpload.item(0)
        if(previewFile != null) {
            this.image = previewFile;
            const fileReader = new FileReader();
            fileReader.readAsDataURL(previewFile)
            fileReader.onload = function (e) {
                let imageElement = document.getElementById("content-frame");
                if (this != null && this.result != null && imageElement != null) {
                    // @ts-ignore
                    imageElement.setAttribute("src", this.result)
                }
            }
        }
    }

    removeImage() {
        this.image = null;
    }

}

