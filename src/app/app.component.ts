import { Component } from '@angular/core';
import { Product } from './shared/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductsList';
  prodArr: Product[] = [
    { ID: 1, Name: 'Coffee', Description: 'Delicous coffee beans from Columbia.', Price: 20, Image: "https://sc04.alicdn.com/kf/U5d4c11e6d6434800883e2b2b27c6b921Q.jpg" },
    { ID: 2, Name: 'Bread', Description: 'Sourdough white bread', Price: 15, Image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/6AD88C23-3455-4BC7-8F7D-3B369C1A43F9/Derivates/4319325b-e72f-4d72-b30e-4a6e5fe34246.jpg" },
    { ID: 3, Name: 'Milk', Description: 'Organic whole milk', Price: 15, Image: "https://www.danoneawayfromhome.com/wp-content/uploads/2018/03/ho-up-milk-6-64oz-whole-organic-ca.png" },
  ];
  productToEdit: Product = { ID: 0 };
  showProdEditor: boolean = false;
  editMode: boolean = false;
  index: number = 0;

  public editProduct(item: Product, index: number): void {
    this.showProdEditor = true;
    this.productToEdit = item;
    this.editMode = true;
    this.index = index;
    this.prodArr[index].selected = true;
  }

  public addProd() {
    this.showProdEditor = true;
    this.editMode = false;
  }
  public updateProdArr(data: Product): void {
    console.log(data)
    if (this.editMode) {
      this.prodArr[data.ID - 1] = data;
    }
    else {
      (this.prodArr.push(data));
    }
    this.showProdEditor = false;
    this.productToEdit = { ID: 0 };
    this.editMode = false;
    this.index = 0;
  }

  public cancelEdit(): void {
    this.productToEdit = { ID: 0 };
    this.showProdEditor = false;
    this.editMode = false;
    this.index = 0;
    this.prodArr.forEach(element => {
      element.selected = false
    });
  }

}
