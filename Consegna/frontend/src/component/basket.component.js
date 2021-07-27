import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PrintCartProduct from './print_cart_product.component';

/*This is the Basket Component used for the cart shown next to a product.*/
class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartItems: [],
            totalValue: 0
        };
    }

    /*This method is executed after the component output has been rendered in the DOM.*/
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("cart"));
        let total = JSON.parse(localStorage.getItem("total"));
        this.setState({totalValue: total});
        this.setState({cartItems: data});
    }
    
    /*Add the item in the cart and store it in the localStorage.
      If the quantity of the item is enough, the user can add it in the cart.
      In localStorage products are saved as an array containing arrays composed by a couple [item, quantity].
      The total price is calculated based on the quantity of items and their price and saved in localStorage.*/
    addToCart(key, item) {
        let currentData = JSON.parse(localStorage.getItem(key));
        let dataList = []
        let total = 0;
        if (currentData !== null ){
            if(currentData.length > 0){
                let qty = this.checkDuplicates(currentData, item);
                if(qty === 0 && item.quantity > 0){
                    currentData.forEach(element => {
                        dataList.push(element);
                        total = total + element[0].price * element[1];
                    });
                    dataList.push([item,1]);
                    total = total + item.price;
                }
                else if(qty < item.quantity){
                    currentData.forEach(element => {
                        if(element[0]._id !== item._id){
                            dataList.push(element);
                            total = total + element[0].price * element[1];
                        }
                    });
                    dataList.push([item,qty+1]);
                    total = total + item.price*(qty+1)
                }
                else{
                    dataList = currentData;
                    total = this.state.totalValue;
                }
            }
            else if(item.quantity > 0){
                dataList.push([item,1]);
                total = total + item.price
            }
        }
        else if(item.quantity > 0){
            dataList.push([item,1]);
            total = total + item.price
        }
        /*The list of items and the total price are added in localStorage*/
        window.localStorage.setItem(key, JSON.stringify(dataList));
        window.localStorage.setItem("total", JSON.stringify(total));
        this.setState({cartItems: dataList});
        this.setState({totalValue: total}); 
    }

    /*Check if there is already the item to add to the cart.
    The function return "count" (how many copies of the product are yet in the cart).*/
    checkDuplicates(array, item){
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if(array[i][0]._id === item._id){
                count = count + array[i][1]
            }
        }
        return count;
    }

    /*This method is used to print all items in the cart. If it is empty the text "Il carrello è vuoto" is printend.*/
    showProducts(){
        if (this.state.cartItems===null){
            return <h2>Il carrello è vuoto</h2>
         }
         else {
             return this.state.cartItems.map(product => {
                return < PrintCartProduct product={product}/> }
             )}
    }
    
    render() {
        /*All the cart is printed: items, total price and the "Aggiungi al carrello" button.*/
        return (
        <div className="cart_page">
            <div className="cart_title">Il tuo carrello</div>
            <div>{this.showProducts()}</div>
            <h2>Totale: €{this.state.totalValue}</h2>
            <div className="buttons_flex">
            <button className= "cart_button" onClick={() => this.addToCart("cart", this.props.product)}>  Aggiungi al carrello</button>
            <button className="cart_button"><Link to={"/checkout" }>Checkout</Link></button>
            </div>
        </div>
        );
    };
};

export default Basket;