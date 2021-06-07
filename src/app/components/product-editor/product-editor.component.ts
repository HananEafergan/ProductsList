import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {
  @Input() public product: Product = { ID: 0 };
  @Input() public editMode: boolean = false;
  @Input() public index: number = 0;
  @Input() public arrLength: number = 0;
  @Output() newProd = new EventEmitter<Product>();
  @Output() editCanceld = new EventEmitter<any>();

  productForm: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    Price: new FormControl(null, [Validators.required]),
    Image: new FormControl(null)
  });

  ngOnInit() {
    if (this.editMode) {
      this.productForm.get('Name')?.patchValue(this.product.Name);
      this.productForm.get('Description')?.patchValue(this.product.Description);
      this.productForm.get('Price')?.patchValue(this.product.Price);
    }
  }

  public saveProduct(): void {
    const product: Product = {
      ID: this.index + 1,
      Name: this.productForm.get('Name')?.value,
      Price: this.productForm.get('Price')?.value,
      Description: this.productForm.get('Description')?.value
    };
    if (!this.productForm.get('Image')?.touched){
      product.Image = this.product.Image
    }
      if (!this.editMode) {
        product.ID = this.arrLength + 1;
      }
    this.newProd.emit(product);
  }

  public cancelEdit(): void {
    this.editCanceld.emit();
  }
}
