import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {Router} from "@angular/router";
import {AvatarComponent} from "../avatar/avatar.component";
import {UserService} from "../services/user.service";
import {UserSettingsService} from "../services/user-settings.service";

@Component({
    templateUrl: './user-settings-page.component.html',
    styleUrl: './user-settings-page.component.css',
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        AvatarComponent,
    ],
    standalone:true
})
export class UserSettingsPageComponent  {

    @ViewChildren('previewAvatar') previewAvatar: AvatarComponent;
    @ViewChildren('fileUploader') fileUploader!: QueryList<ElementRef>;

    image: any;

    // @ts-ignore
    filesToUpload:FileList;


    userForm:FormGroup ;

    constructor(protected userService:UserService,private router:Router,private userSettingsService:UserSettingsService) {
        this.userForm = new FormGroup({
            avatar:new FormControl(),
            username:new FormControl(),
            bio:new FormControl(),
            email:new FormControl()
        });
    }

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
                    previewAvatar.updateImg( this.result)
                }
            }
        }
    }

    submit(){
        this.userSettingsService.shipSettingsUpdate(this.filesToUpload,this.userForm).subscribe(
            () =>    {
                console.log("redirecting")
                this.router.navigateByUrl("/")})
    }

    cancel() {
        this.router.navigateByUrl("/");
    }



}
