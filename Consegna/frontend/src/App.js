import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeScreen from './screen/home.screen';
import AboutUs from './screen/about_us.screen';
import Species from './screen/species.screen';
import LoginPage from './screen/login.screen';
import RegisterPage from './screen/register.screen';
import CartScreen from './screen/your_cart.screen'
import * as Util from './util.js'
import CheckoutScreen from './screen/checkout.screen';
import ShippingInfo from './screen/shipping_info.screen';
import OrderScreen from './screen/your_orders.screen';
import ProductResult from './screen/result_page.screen';
import ProductScreen from './screen/product_details.screen';
import SearchBar from './component/search_bar.component'


/*The main component of the site.
  It contains an header, a main and a footer, and use Route to render different components.*/
function App() {
  return (
    <Router>
    <div className="grid_container">
            <header className="header">
                <div>
                    <a href="/" id="logo">Bruno's Brothers Garden</a>
                    <img className="logo_image" src="/images/logo.png" alt="logo"></img>
                </div>
                <div>
                    <a href="/species">Piante</a>
                    <a href="/products/materials">Materiali</a>
                    <a href="/about_us">About us</a>
                </div>
                <div className="header_right">
                    <p className="header_welcome">{Util.welcomeMessage()}</p>
                    <a href="/your_orders">I tuoi ordini</a>
                    <a href="/cart"> Carrello</a>
                    {Util.checkAuth()}
                    <SearchBar />
                </div>
            </header>


            <main className="main"> 
              <div>
               
                <Route exact path="/" component = {HomeScreen} />
                <Route exact path="/about_us" component = {AboutUs} />
                <Route exact path="/species" component = {Species} />

                <Route exact path="/products/:param" component = {ProductResult} />
                <Route exact path="/products/:id" component = {ProductScreen} />
                
                <Route exact path="/login" component = {LoginPage} />
                <Route exact path="/register" component = {RegisterPage} />
                <Route exact path="/cart" component = {CartScreen} />
                <Route exact path="/checkout" component = {CheckoutScreen} />
                <Route exact path="/shipping_info" component = {ShippingInfo} />
                <Route exact path="/your_orders" component = {OrderScreen} />
            </div>
            </main>

            <footer className="footer">
            <p>
              Powered & designed by<text className="footer_credits"> Bruno Federica </text> and <text className="footer_credits"> Bruno Carmine </text>
              || Logo by <a href="https://it.linkedin.com/in/luigi-carrozzo-936385212"><text className="footer_credits">Luigi Carrozzo</text></a>
            </p>
            </footer>
            
    </div>
        </Router>
  );
}

export default App;
