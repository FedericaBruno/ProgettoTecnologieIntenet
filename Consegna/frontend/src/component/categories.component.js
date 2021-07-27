import React from 'react';
import {Link} from 'react-router-dom';

/*Print the two categories "Piante" and "Materiali" at the bottom of the homepage.*/
function Categories (){
	return <div>
		 <ul className="categories">
            <li> 
                <div className="category">
                    <Link to={'/species'}><img  className="category_image" src="/images/piante.png" alt="category"></img></Link>
                    <div className="category_name">
                        <a href="/species">Piante</a>
                    </div>
                </div>
            </li>
            <li> 
                <div className="category">
                    <Link to={'/products/materials'}><img  className="category_image" src="/images/materiali.png" alt="category"></img></Link>
                    <div className="category_name">
                        <a href="/products/materials">Materiali</a>
                    </div>
                </div>
            </li>
        </ul>
	</div>
}

export default Categories;