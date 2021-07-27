import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {getUserId} from '../util.js';

/*This is the screen shown when the user is ready to order.
  There is a form where the user has to fill all the fields (Nome, Cognome, Indirizzo, Città, CAP, Numero,Scadenza e Codice di controllo della carta).
  The user has also the possibilty to come back and continue shopping.*/
class CheckoutForm extends React.Component {
    render() {
        if (getUserId() != null) {
            if(JSON.parse(window.localStorage.getItem("cart")).length >0) {

        return (
            <div>
            <div className="form">
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                <ul className="form-container">
                    <li>
                        <h2>Inserisci i dati per la spedizione</h2>
                    </li>
                    <li>
                        <label htmlFor="name">Nome</label>
                        <input value = {this.props.name} onChange = {this.props.setName.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="surname">Cognome</label>
                        <input value = {this.props.surname} onChange = {this.props.setSurname.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="address">Indirizzo</label>
                        <input type="address" value = {this.props.address} onChange = {this.props.setAddress.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="city">Città</label>
                        <input type="city" value = {this.props.city} onChange = {this.props.setCity.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="cap">CAP</label>
                        <input type="cap" value = {this.props.cap} onChange = {this.props.setCap.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="cart_number">Numero carta</label>
                        <input type="cart_number" value = {this.props.cart_number} onChange = {this.props.setCartNumber.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="expiration_date">Scadenza carta:</label>
                        <input type="expiration_date" value = {this.props.expiration_date} onChange = {this.props.setExpDate.bind(this)} required/>
                    </li>
                    <li>
                        <label htmlFor="controll_code">Codice di controllo carta</label>
                        <input type="controll_code" value = {this.props.controll_code} onChange = {this.props.setControllCode.bind(this)} required/>
                    </li>
                    <li>
                        <button className="order_button" type='submit'>Ordina!</button>
                    </li>
                    oppure
                    <li className="continue_shopping"> 
                        <Link to={"/" }>Continua con lo shopping</Link>
                    </li>
                    <li>
                        <h2>{this.props.message}</h2>
                    </li>
                </ul>
                </form>
            </div>
            </div>
            
    ); 
        }
        else return <div className="checkout_text">Nessun oggetto nel carrello.</div>
        }
        else return <div className="checkout_text">Per eseguire un ordine è necessario eseguire il Login.</div>
    }
};


class CheckoutScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        name:'',
        surname:'',
        address:'',
        city:'',
        cap:'',
        cart_number:'',
        expiration_date:'',
        controll_code:'',
        total:0,
        cart_items:[],
        id_user:'',
        message:''
    };
      this.setName = this.setName.bind(this);
      this.setSurname = this.setSurname.bind(this);
      this.setAddress = this.setAddress.bind(this);
      this.setCity = this.setCity.bind(this);
      this.setCap = this.setCap.bind(this);
      this.setCartNumber = this.setCartNumber.bind(this);
      this.setExpDate = this.setExpDate.bind(this);
      this.setControllCode = this.setControllCode.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
    }

    /*The id of the user loggend in the site, the total price of the order and all the items in the cart are taken from the localStorage
      and saved in the state.*/
    componentDidMount(){
        let id_user = getUserId();
        let total = window.localStorage.getItem("total");
        let cart = JSON.parse(window.localStorage.getItem("cart"));

        this.setState({
            id_user: id_user,
            total: total,
            cart_items: cart
        })
    }

    /*All information entered from the user in the form are saved in the state while typing.*/
    setName(event) {
        this.setState({
            name: event.target.value
        })
      }
    setSurname(event) {
        this.setState({
            surname: event.target.value
        })
      }     
    setAddress(event) {
        this.setState({
            address: event.target.value
        })
    }
    setCity(event) {
        this.setState({
            city: event.target.value
        })
    }

    setCap(event) {
        this.setState({
            cap: event.target.value
        })
    }

    setCartNumber(event) {
        this.setState({
            cart_number: event.target.value
        })
    }

    setExpDate(event) {
        this.setState({
            expiration_date: event.target.value
        })
    }

    setControllCode(event) {
        this.setState({
            controll_code: event.target.value
        })
    }

    /*A new order is created using the information from the form, the id of the user, the total price and all items of the cart.
      Then this new order is added in the database.*/
    handleSubmit(event) {
    event.preventDefault();

    const Order = {
        name: this.state.name, 
        surname: this.state.surname, 
        id_user: this.state.id_user, 
        total: this.state.total,
        cart_items: this.state.cart_items, 
        address: this.state.address, 
        city: this.state.city,
        cap: this.state.cap,
        cart_number: this.state.cart_number,
        expiration_date: this.state.expiration_date,
        controll_code: this.state.controll_code
    };

    /*Add the order in the database.*/
    axios.post("http://localhost:5000/orders/add", Order)
    .then(response => {
        /*The cart is emptied, the total price is set to zero and the "I tuoi ordini" page is shown.*/
        window.localStorage.removeItem("cart")
        window.localStorage.removeItem("total")
        this.props.history.push('/your_orders');
    })
    .catch((error) => {
        this.setState({message: "Error"})
})
}
    render() {
      return (
        <div>
            <CheckoutForm 
            {...this.state} 
            setName={this.setName}
            setSurname={this.setSurname} 
            setAddress={this.setAddress} 
            setCity={this.setCity} 
            setCap={this.setCap}
            setCartNumber={this.setCartNumber} 
            setExpDate={this.setExpDate} 
            setControllCode={this.setControllCode} 
            handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
  }

  
export default CheckoutScreen;