import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

/*Print the details of plants after the research.*/
const PrintPlantDetails = props => (
        <ul className="product">
            <li><Link to={`/products/${props.product._id}`}><img className="product_result_img" src={props.product.img_url} alt="product"></img></Link></li>
            <li className="product_name"><Link to={`/products/${props.product._id}`}>
                {props.product.species} {props.product.name} <br/> Size: {props.product.size}
            </Link></li>
        </ul>
)

/*Print the details of materials after the research.*/
const PrintMaterialDetails = props => (
    <div>
        <ul className="product">
            <li><Link to={`/products/${props.product._id}`}><img className="product_result_img" src={props.product.img_url} alt="material"></img></Link></li>
            <li className="product_name"><Link to={`/products/${props.product._id}`}>
                {props.product.name}
            </Link></li>
        </ul>
    </div>

)

class ProductResult extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            plantsList: [],
            materialsList: []
        };
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/plants')
        .then(response => {
            this.setState({ plantsList: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('http://localhost:5000/materials')
        .then(response => {
            this.setState({ materialsList: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /*Apply the PrintPlantDetails to each plant.*/
    showPlants() {
            return this.state.plantsList.map(current => {
                if(current.species.toLowerCase().indexOf(this.props.match.params.param.toLowerCase())>-1 || 
                    current.name.toLowerCase().indexOf(this.props.match.params.param.toLowerCase())>-1){
                    return <PrintPlantDetails product = {current}/>
                }
                else
                    return false
            })
    }

    
    /*Apply the PrintMaterialDetails to each plant.*/
    showMaterials() {
            return this.state.materialsList.map(current => {
                if(this.props.match.params.param === "materials" || current.name.toLowerCase().indexOf(this.props.match.params.param.toLowerCase()) >-1){
                    return <PrintMaterialDetails product = {current}/>;
                }
                else
                    return false
            })
}

    
    render() {
        return (
        <div className="products_container">
            { this.showPlants() }
            { this.showMaterials() }
        </div>
        );
    };
};

export default ProductResult;