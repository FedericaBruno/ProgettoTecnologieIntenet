import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Basket from '../component/basket.component';

/*The page of the selected plant is printed.
  There is the "Torna alla Home" button to back to the Home Page.
  There is the image of the product, its name, size, max quantity available and price.
  There is also the cart at the right to add the product to the cart.*/
const PrintPlantDetails = props => (
    <div className="product_screen_grid">
        <div className="back_to_result">
            <Link to={`/`}>Torna alla Home</Link>
        </div>
        <div className="image">
            <img className="details_img" src={props.product.img_url} alt="product"></img>
        </div>
        <div className="description">
            <div className="title">{props.product.species}, "{props.product.name}"</div>
            <div className="info"> Taglia: {props.product.size}</div>
            <div className="info">Quantità disponibile: {props.product.quantity}</div>
            <div className="price">Prezzo: € {props.product.price}</div>
        </div>
        <div className="cart"><Basket product={props.product}/></div>
    </div>
)

/*The page of the selected material is printed.
  There is the "Torna alla Home" button to back to the Home Page.
  There is the image of the product, its name, description, max quantity available and price.
  There is also the cart at the right to add the product to the cart.*/
const PrintMaterialDetails = props => (
    <div className="product_screen_grid">
        <div className="back_to_result">
            <Link to={'/'}>Torna ai risultati</Link>
        </div>
        <div className="image"> <img className="details_img" src={props.product.img_url} alt="material"></img> </div>
        <div className="description">
            <div className="title">{props.product.name}</div>
            <div className="info"> {props.product.description}
            <div className="info">Quantità disponibile: {props.product.quantity}</div>
        </div>
            <div className="price">Prezzo: € {props.product.price}</div>
        </div>
        <div className="cart"><Basket product={props.product}/></div>
    </div>
)

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            plants: [],
            materials: []
        };
    }
    
     /*It is used to get all products from the database.*/
    componentDidMount() {
        axios.get(`http://localhost:5000/plants/`)
        .then(response => {
            this.setState({ plants: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get(`http://localhost:5000/materials/`)
        .then(response => {
            this.setState({ materials: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /*Apply the PrintPlantDetails to each plant.*/
    showPlant() {
        return this.state.plants.map(current => {
            if(current._id === this.props.match.params.id){
                return <PrintPlantDetails product = {current}/>;
            }
            else
                return false
        })
    }

    /*Apply the PrintMaterialDetails to each plant.*/
    showMaterial() {
        return this.state.materials.map(current => {
            if(current._id === this.props.match.params.id){
                return <PrintMaterialDetails product = {current}/>;
            }
            else
                return false
        })
    }

    render() {
        return (
        <div>
            { this.showMaterial() }
            { this.showPlant() }
            
        </div>
        );
    };
};

export default ProductScreen;