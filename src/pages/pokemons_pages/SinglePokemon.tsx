import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { arrowBackSharp, arrowForwardOutline, starOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Pokemon from '../../../Types/Pokemon';
import pokemonsServices from '../../services/pokemonsServices';


const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [activateButtonPre, setActivateButtonPre] = useState(false);
    const [activateButtonNext, setActivateButtonNext] = useState(false);
    const router = useIonRouter();

    useIonViewWillEnter(()=>{
        
        try {
            const getData = async () => {
                // const response = await fetch(APIROUTE.pokemons);
                // console.log(APIROUTE.pokemons);
                
                const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon/'+id);
                
                const dataOfResponse = await response.json();
        
                setPokemon(dataOfResponse);
                // console.log(dataOfResponse);

            };
        
            getData();
            
        } catch (error) {
            console.log(error, "problèmes de récupérations des données");
            
        }
        const intID = parseInt(id);
        if (intID===1) {
            setActivateButtonPre(true);
        }
        if (intID===1026) {
            setActivateButtonNext(true);
        }

    });

    const handlePrePokemon = (pokedex_id: number)=> {    
        router.push('/pokemons/'+(pokedex_id-1), 'back')
    }

    const handleNextPokemon = (pokedex_id: number)=> {    
        router.push('/pokemons/'+(pokedex_id+1), 'forward')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Pokemon</IonTitle>
                {/* <IonButton slot='end' className='ion-margin-end'></IonButton> */}
                <IonButton fill='clear' slot='end' color='secondary' className='ion-margin-end'>
                    <IonIcon slot="icon-only" icon={starOutline} className='ion-margin-end'></IonIcon>
                    Mes Favoris
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {pokemon ? (
                    <IonCard>
                        <IonToolbar>
                            <IonButtons slot="start">
                            <IonButton disabled={activateButtonPre} onClick={()=>{handlePrePokemon(pokemon.pokedex_id)}}>
                                <IonIcon icon={arrowBackSharp}></IonIcon>
                            </IonButton>
                            </IonButtons>
                            <IonTitle className="ion-text-center" color='secondary'>{pokemon.name.fr}</IonTitle>
                            <IonButtons slot="end">
                            <IonButton disabled={activateButtonNext} onClick={()=>{handleNextPokemon(pokemon.pokedex_id)}}>
                                <IonIcon icon={arrowForwardOutline}></IonIcon>
                            </IonButton>
                            </IonButtons>
                        </IonToolbar>
                        <img alt={pokemon.name.fr} src={pokemon.sprites.regular} />
                        <IonCardHeader>
                            <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
                            <IonCardSubtitle color='secondary'>{pokemon.category}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent> 
                            <IonList>
                                <IonItem><p><strong>Types:</strong> 
                                {pokemon.types ? pokemon.types.map((type, index) => (
                                        <p key={index}>{type.name}</p>
                                    )) 
                                    : 
                                    <p>Aucun</p>
                                    }</p></IonItem>
                                <IonItem><p><strong>Taille:</strong> {pokemon.height}</p></IonItem>
                                <IonItem><p><strong>Poids:</strong> {pokemon.weight}</p></IonItem>
                                <IonItem><p><strong>Résistances:</strong> {pokemon.resistances.map((res, index) => (
                                    
                                    <p key={index}>{`${res.name} (x${res.multiplier})`}</p>
                                    
                                )) }</p></IonItem>
                                <IonItem><p><strong>Évolution:</strong> {pokemon.evolution?.pre ? pokemon.evolution.pre.map((evo, index) => (
                                    
                                    <p key={index}>{evo.name} : {evo.condition}</p>
                                    
                                    )) : 'Aucune'}</p></IonItem>
                                <IonItem><p><strong>Next Évolution:</strong> {pokemon.evolution?.next ? pokemon.evolution.next.map((evo, index) => (
                                        <p key={index}>{evo.name} : {evo.condition}</p>
                                )) : 'Aucune'}</p></IonItem>
                            </IonList>

                        </IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol></IonCol>
                                <IonCol>
                                    <IonButton routerLink='/pokemons'>
                                        Retour aux pokemons
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    {1===1 ? (<IonButton color='success'>Ajouter aux favoris</IonButton>) : (<IonButton color='danger'>Supprimer aux favoris</IonButton>)}
                                    
                                    
                                </IonCol>
                                <IonCol></IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonCard>
                ) : (
                    <p>Pokemon non trouvé...</p>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Detail