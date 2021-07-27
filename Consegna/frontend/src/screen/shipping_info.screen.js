import React, { Component } from 'react';

/*This is shown in the page about the information about shipping.*/
class ShippingInfo extends Component {
    render() {
        return <div>
            <div>
                <p>
                <h1>Spedizioni internazionali</h1>
                <h3> Al momento, il sito spedisce in Italia. Non sono disponibili spedizioni internazionali.</h3>
                </p>
                <p>
                <h1>Tempi di spedizione</h1>
                <h3>Ci avvaliamo della collaborazione con il corriere espresso UPS, i tempi per la spedizione dei pacchi, assolutamente più celeri rispetto
                     a quelli del servizio postale nazionale, sono i seguenti:

                    <p>CONSEGNA ESPRESSO GARANTITA</p>
                    <p>in 24-48 ore sul territorio nazionale, 48-72 ore per isole e Calabria</p>
                </h3>
                </p>
                <p>
                <h1>Spese di spedizione</h1>
                <h3> Le spese di spedizione sono di 5,60€ in tutta Italia.</h3>
                </p>
                </div>
            </div>
    }
}
export default ShippingInfo;