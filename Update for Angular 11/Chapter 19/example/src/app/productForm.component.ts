import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { Product } from "./product.model";
import { Model } from "./repository.model";

@Component({
    selector: "paProductForm",
    templateUrl: "productForm.component.html"
})
export class ProductFormComponent {
    newProduct: Product = new Product();

    constructor(private model: Model) { }

    // @Output("paNewProduct")
    // newProductEvent = new EventEmitter<Product>();

    submitForm(form: any) {
        //this.newProductEvent.emit(this.newProduct);
        this.model.saveProduct(this.newProduct);
        this.newProduct = new Product();
        form.reset();
    }
}
