import React, { Component } from 'react';
import axios from 'axios';
import {getUserId} from '../util.js';

/*This is the screen that shows all the orders made from the user.*/
const OrderList = props => (
        <div className="order_container">
            <div className="order_title">
                <p>Ordine effettuato il <br/>{props.order.date}</p>
                <p>Totale<br/>€{props.order.total}</p>
                <p>Destinatario<br/>{props.order.name} {props.order.surname}</p>
                <p>Ordine n°<br/>{props.order._id}</p>
            </div>
            <div>
                <ul  className="order_description">
                {props.order.cart_items.map(current => {
                    return <li><img className="order_image" src={current[0].img_url} alt="img"></img>{current[0].species} "{current[0].name}", Quantità: {current[1]}, 
                            Prezzo: € {current[0].price}</li>})}
                </ul>
            </div>
        </div>
)

class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: []};

        this.printOrderItems = this.printOrderItems.bind(this)
    }
    
    /*Get all orders from the database and save them into the state.*/
    componentDidMount() {
        if(getUserId() !== null) {
            axios.get('http://localhost:5000/orders')
            .then(response => {
                this.setState({ orders: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    /*Print all items of each order.*/
    printOrderItems(order_items){
        order_items.map(current => {
            console.log(current[0].name)
                return `${current[0].name}`
        })
        return false;
    }

    /*Find only orders of the user logged in the site.*/
    findOrders() {
            if(this.state.orders.length > 0) {
            return this.state.orders.map(current_order => {
                if(current_order.id_user === getUserId()){
                    return <OrderList order = {current_order} printOrderItems = {this.printOrderItems}/>;
                }
                else
                return false;
            })
        }
        else {
            return <h1>Nessun ordine</h1>
        }
    }
    render() {
        return (
        <div>
            {this.findOrders()}
        </div>
        );
    };
};

export default OrderScreen;