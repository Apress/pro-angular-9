import { Component, Output, EventEmitter, ViewEncapsulation, 
    Inject, SkipSelf } from "@angular/core";
import { Product } from "./product.model";
import { Model } from "./repository.model";
import { VALUE_SERVICE } from "./valueDisplay.directive";

@Component({
    selector: "paProductForm",
    templateUrl: "productForm.component.html",
    viewProviders: [{ provide: VALUE_SERVICE, useValue: "Oranges" }]
})
export class ProductFormComponent {
    newProduct: Product = new Product();

    constructor(private model: Model,
            @Inject(VALUE_SERVICE) @SkipSelf() private serviceValue: string) {
        console.log("Service Value: " + serviceValue);
    }

    submitForm(form: any) {
        this.model.saveProduct(this.newProduct);        
        this.newProduct = new Product();
        form.reset();
    }
}
