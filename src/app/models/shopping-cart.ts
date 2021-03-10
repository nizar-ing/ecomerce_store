import {ShoppingCartItem} from "./shopping-cart-item";
import {Product} from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: {[productId: string]: ShoppingCartItem}){
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap){
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }
  get totalItemsCount(){
    let count = 0;
    for (let ind in this.items){
      count += this.items[ind].quantity;
    }
    return count;
  }
  get totalPrice(){
    let sum = 0;
    for (let ind in this.items){
      sum += this.items[ind].totalPrice;
    }
    return sum;
  }
  getQuantity(product: Product): number {
    let item = this.itemsMap[product.key];
    return (item) ? item['quantity'] : 0;
  }

}
