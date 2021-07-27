import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

/*Print all species of plants.
  All species link to the page of that specific specie.*/
const PrintSpecieDetails = props => (
        <ul className="specie">
            <li><Link to={`/products/${props.specie.specie_name}`}><img className="specie_img" src={props.specie.img_url} alt="specie"></img></Link></li>
            <li className="specie_name"><Link to={`/products/${props.specie.specie_name}`}>{props.specie.specie_name}</Link></li>
        </ul>
)

class Species extends Component {
    constructor(props) {
        super(props);
        this.state = { species: []};
    }

    /*Get all species from the database and save them in the state.*/
    componentDidMount() {
        axios.get('http://localhost:5000/species')
        .then(response => {
            this.setState({ species: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /*Apply PrintSpecieDetails to each specie in the state.*/
    specieList() {
        return this.state.species.map(currentspecie => {
            return <PrintSpecieDetails specie = {currentspecie} key={currentspecie._id}/>;
        })
    }
    render() {
        return (
        <div className="species_layout">
            { this.specieList() }
        </div>
        );
    };
};

export default Species;