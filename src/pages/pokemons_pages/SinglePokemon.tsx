import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonSkeletonText, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { arrowBackSharp, arrowForwardOutline, starOutline } from 'ionicons/icons';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pokemon from '../../../Types/Pokemon';
import pokemonsServices from '../../services/pokemonsServices';
import Header from '../../components/Header';
import APIROUTE from '../../APIROUTE';
import { getCookies, initCookie, setCookie } from '../../utils/capacitorCookies/cookies';

type Cookie = {
    favoris: string[]
}

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [activateButtonPre, setActivateButtonPre] = useState(false);
    const [activateButtonNext, setActivateButtonNext] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useIonRouter();
    const [cookies, setCookies] = useState<number[]>([]);

    useIonViewWillEnter(()=>{
        
        try {

            // const getAllCookies = ()=>{
            //     const allCookies = getCookies();

            //     // const tabCookies = JSON.parse(cookies);
            //     // setCookies(tabCookies);
            //     console.log(cookies);

            //     const parts = allCookies.split('=');
                
                
            //     const arrayString = parts[1];
                
            //     // Convertir la chaîne en tableau
            //     try {
                    
            //         const convertArray = JSON.parse(arrayString);
                    
            //         setCookies(convertArray);
            //         console.log(cookies);
                    
            //     } catch (error) {
            //         throw new Error("");
            //     }
                
            // };

            const getData = async () => {
                
                const response = await fetch(APIROUTE.pokemons+`/${id}`, {
                    method: "GET",
                    headers: {
                      "Content-type": "Appliation/json"
                    },
                    cache: "no-cache"
                });
                
                const dataOfResponse = await response.json();
        
                
                setTimeout(() => {
                    setPokemon(dataOfResponse);
                    setLoading(false);
                }, 3000);

            };
            // getAllCookies();
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

    const handleSumbmitFavoris = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const id_Pok = formData.get('pokemon_id') as string;
        const id = parseInt(id_Pok);

        console.log(cookies);
        const newCookies = [...cookies, id];
        setCookies(newCookies);
        console.log([...cookies, id]);
        
        // setCookie('favoris',JSON.stringify(newCookies));

        
    };  

    return (
        <IonPage>
            <Header/>
            <IonContent>
            {!loading && pokemon ? (
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
                                    {1===1 ? (
                                        <form onSubmit={(e)=>{handleSumbmitFavoris(e)}}>
                                            <IonInput name='pokemon_id' value={pokemon.pokedex_id} style={{ display: 'none' }} placeholder="Hidden input" />
                                            <IonButton color='success' type='submit'>Ajouter aux favoris</IonButton>
                                        </form>
                                        
                                        ) : (<IonButton color='danger'>Supprimer aux favoris</IonButton>)}
                                    
                                    
                                </IonCol>
                                <IonCol></IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonCard>
                ) : (
                    // <p>Chargement...</p>
                    <IonCard>
                        <IonToolbar>
                            <IonButtons slot="start">
                            <IonSkeletonText animated style={{ width : '10%' }} />
                            </IonButtons>
                            <IonTitle className="ion-text-center" color='secondary'>
                                <IonSkeletonText animated style={{ width : '40%' }} />

                            </IonTitle>
                            <IonButtons slot="end">
                             <IonSkeletonText animated style={{ width : '10%' }} />
                            
                            </IonButtons>
                        </IonToolbar>
                        <IonSkeletonText animated style={{ width: '100%', height: '200px' }} />
                        
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonSkeletonText animated style={{ width : '40%' }} />
                            </IonCardTitle>
                            <IonCardSubtitle color='secondary'>
                                <IonSkeletonText animated style={{ width : '30%' }} />

                            </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent> 
                            <IonList>
                                <IonItem>
                                    <IonSkeletonText animated style={{ width : '40%' }} />

                                </IonItem>
                                <IonItem>
                                    <IonSkeletonText animated style={{ width : '40%' }} />

                                </IonItem>
                                <IonItem>
                                    <IonSkeletonText animated style={{ width : '40%' }} />

                                </IonItem>
                                <IonItem>
                                    <IonSkeletonText animated style={{ width : '40%' }} />

                                </IonItem>
                    
                            </IonList>

                        </IonCardContent>
                       
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Detail