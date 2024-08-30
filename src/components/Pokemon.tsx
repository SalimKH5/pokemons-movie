import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, useIonRouter } from '@ionic/react'
import React from 'react'


const Pokemon: React.FC <Pokemon>=(pokemon) => {
    const router =useIonRouter();
    return (
        <IonCol size="12" sizeMd="4" sizeLg="3" key={pokemon.pokedex_id} >
            <IonCard className="card" onClick={() => { router.push('/pokemons/' + pokemon.pokedex_id) }}>
                <img src={pokemon.sprites.regular?  pokemon.sprites.regular : "https://ionicframework.com/docs/img/demos/card-media.png"} alt={pokemon.name.fr} />
                <IonCardHeader>
                    <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
                    <IonCardSubtitle color='secondary'>{pokemon.category}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <p><strong>Types:</strong> <span style={{ color: 'bleu' }}>{pokemon.types && pokemon.types.map(type => type.name).join(', ')}</span></p>
                    <p><strong>Taille:</strong> {pokemon.height}</p>
                    <p><strong>Poids:</strong> {pokemon.weight}</p>
                </IonCardContent>
            </IonCard>
        </IonCol>
    )
}

export default Pokemon