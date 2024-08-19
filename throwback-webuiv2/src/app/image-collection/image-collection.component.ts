import { Component } from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {ImageChipData} from "./image-chip/ImageChipData";
import {ImageChipComponent} from "./image-chip/image-chip.component";

@Component({
  selector: 'app-image-collection',
  standalone: true,
    imports: [
        NgStyle,
        NgForOf,
        ImageChipComponent
    ],
  templateUrl: './image-collection.component.html',
  styleUrl: './image-collection.component.scss'
})
export class ImageCollectionComponent {

    color1: string = 'Bluegray';

    convertProdToChip(products:any):ImageChipData[]{
        let ret = [];
        for (let jack of products){
            ret.push(new ImageChipData(jack.image,"/","abc","jack","/"))
        }
        return ret
    }

    products =  [
        {
            price: '$140.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-1.png'
        },
        {
            price: '$82.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-2.png'
        },
        {
            price: '$54.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-3.png'
        },
        {
            price: '$72.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-4.png'
        },
        {
            price: '$99.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-5.png'
        },
        {
            price: '$89.00',
            image: 'assets/demo/images/ecommerce/product-list/product-list-4-6.png'
        }
    ];
}
