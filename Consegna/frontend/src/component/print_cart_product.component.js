import React from 'react';

/*Print information of the product in Basket Component and Cart Component.
It is called one time for each product in the cart.*/
export default function PrintCartProduct(props) {
    return(
    <ul className="cart_item">
        <li>
        {props.product[0].species} "{props.product[0].name}" <p>Prezzo: €{props.product[0].price}, Quantità: {props.product[1]}</p>
        </li>
    </ul>
)};