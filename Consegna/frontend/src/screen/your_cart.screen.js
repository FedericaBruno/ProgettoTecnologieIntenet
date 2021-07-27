import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const shipping_tax = 5.60;

/*All items in the cart, the quantity and the total price are printed.
  There is also the "Rimuovi prodotto" button to remove the item from the cart.*/
const CartList = props => (
    <ul className="cart_item"> 
        <li>
            {props.product[0].name}, Prezzo: €{props.product[0].price}, Quantità: {props.product[1]}, Totale: €{props.product[0].price*props.product[1]} 
            <a href className="remove_button" onClick={() => props.removeItem(props.product[0]._id)}>  Rimuovi prodotto </a>
        </li>
    </ul>
);

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartItems: [],
            totalValue: 0
        };
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("cart"));
        let total = JSON.parse(localStorage.getItem("total"));
        this.setState({totalValue: total});
        this.setState({cartItems: data});
    }

    /*The function used to remove the item from the cart.
      A temporary cart array is used to insert all the items except the item to remove. This array and the new total are then set in the state.*/
    removeItem( product_id) {
       let cart = this.state.cartItems;
       let tempCart = [];
       let total = 0;
       cart.forEach(element=>{
           if (element[0]._id !== product_id) {
                tempCart.push(element)
                total = total + element[0].price*element[1]
           }
        })
        this.setState({cartItems: tempCart});
        window.localStorage.setItem("cart", JSON.stringify(tempCart));
        this.setState({totalValue: total});
        window.localStorage.setItem("total", JSON.stringify(total));
    }

    productList(){
        /*Check if the cart is empty.*/
        if (this.state.cartItems===null){
            return <h2>Il carrello è vuoto</h2>
         }
         /*If there is somenthing in the cart, it is printed in the page.*/
         else {
             return this.state.cartItems.map(product => {
                return < CartList product={product} removeItem={this.removeItem}/> }
             )}
    }
    
    render() {
        return (
        <div className="cart_page">
            <div className="cart_title">Il tuo carrello</div>
            <div>{this.productList()}</div>
            <div>
                <h1>Subtotale: €{this.state.totalValue}</h1>
                <h2>Spese di spedizione: €{shipping_tax}</h2>
            </div> 
            <div>
                <h1 className="total_price">Totale: €{this.state.totalValue+shipping_tax}</h1>
                <h5>I totali degli ordini sono comprensivi di IVA</h5>
            </div>
            <button className="cart_button"><Link to={"/checkout" }>Checkout</Link></button>       
        </div>
        );
    };
};

export default CartScreen;