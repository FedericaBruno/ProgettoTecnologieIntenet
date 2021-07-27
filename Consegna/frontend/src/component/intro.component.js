import React from 'react';

/*Print the intro in the homepage.*/
function Intro (){
        return(
            <div className="intro" >
                <div className="intro_text">
                    <p > <h2>Benvenuti nel Bruno's Brothers Garden, il sito di e-commerce per la vendita di piante carnivore (e non solo!). Per inziare con lo shopping, clicca
                            sulla categoria che desideri. </h2></p>
                            
                            Per informazioni sulle spedizioni <a href="/shipping_info"><text className="click_here_text">clicca qui!</text></a>
                </div>
                <div>
                    <img src="/images/intro.png" alt="logo"></img>
                </div>
            </div>
            )
};

export default Intro;