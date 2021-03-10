import {ShoppingCart} from "./shopping-cart";

export class Order{
  datePlaced: number;
  items: any[];
  constructor(private userId: string, private shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }
    })
  }
}
