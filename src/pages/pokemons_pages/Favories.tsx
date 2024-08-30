import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, SelectChangeEventDetail, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Pokemon from '../../../Types/Pokemon';
import APIROUTE from '../../APIROUTE';
import { IonSelectCustomEvent } from '@ionic/core';
import './style.css'
import Header from '../../components/Header';
import { getCookies } from '../../utils/capacitorCookies/cookies';

const Favoris = () => {
const [pokemons, setPokemons] = useState<Pokemon[]>([])
const [search, setSearch] = useState('');
const router = useIonRouter();

const [filteredPokemons, setFilteredPokemons] = useState<any>(null);
const [selectedFilter, setSelectedFilter] = useState('All');
const [favoris, setFavoris] = useState([]);
const [isInpokemon, setPokemon] = useState<Pokemon>();


    useIonViewWillEnter(()=>{
        try {

            const getAllCookies = ()=>{
                const cookies = getCookies();
                console.log(cookies);                
            };
            const getData = async () => {
                const response = await fetch(APIROUTE.pokemons, {
                    method: "GET",
                    headers: {
                      "Content-type": "Appliation/json"
                    },
                    cache: "no-cache"
                });
                
                const dataOfResponse = await response.json();
                setPokemons(dataOfResponse);

            };
        
            getData();
            getAllCookies();
            
        } catch (error) {
            console.log(error, "problèmes de récupérations des données");
            
        }
    });    
    // Combiner recherche et filtre
    useEffect(() => {
        const newFilteredPokemons = pokemons.filter((pokemon: Pokemon) => {
        const matchesSearch =
            pokemon.name.fr.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.pokedex_id.toString() === search;

        const matchesType =
            selectedFilter === 'All' || 
            pokemon.types &&
            pokemon.types.some((t) => t.name === selectedFilter);

        return matchesSearch && matchesType;
        });

        setFilteredPokemons(newFilteredPokemons);
    }, [search, selectedFilter, pokemons]);

    const handleSelectTypes = (e: IonSelectCustomEvent<SelectChangeEventDetail>) => {
        const type = e.detail.value;
        setSelectedFilter(type);
    };

return(
    <>
    <IonPage>
        <Header />
        <IonContent>
            
            <IonGrid>
            <IonRow className='ion-text-center'>
                <IonTitle color='secondary'>Mes favoris pokemons</IonTitle>
            </IonRow>
            <IonRow>
                <IonCol></IonCol>
                <IonCol size='12' sizeLg='6'>
                    {/* <form action="">
                        
                    </form> */}
                <IonInput labelPlacement="fixed"
                value={search}
                onIonChange={(e) => setSearch(e.detail.value!)}
                placeholder="Recherche Pokémon par le nom ou l'ID"
                >

                </IonInput>
                
                </IonCol>
                <IonCol>
					<IonSelect
						placeholder="Selectionner un type"
                        value={selectedFilter}
                        onIonChange={handleSelectTypes}
					>
						<div slot='label'>Fitre par types</div>
						<IonSelectOption value='All'>
							Tous
						</IonSelectOption>
						<IonSelectOption value='Acier'>
							Acier
						</IonSelectOption>
						<IonSelectOption value='Combat'>
							Combat
						</IonSelectOption>
						<IonSelectOption value='Dragon'>
							Dragon
						</IonSelectOption>
						<IonSelectOption
							value={`Eau`}
						>
							Eau
						</IonSelectOption>
						<IonSelectOption
							value={`Électrik`}
						>
							Électrik
						</IonSelectOption>
						<IonSelectOption value={`Fée`}>
							Fée
						</IonSelectOption>
						<IonSelectOption value={`Feu`}>
							Feu
						</IonSelectOption>
						<IonSelectOption value={`Glace`}>
							Glace
						</IonSelectOption>
						<IonSelectOption value={`Insecte`}>
							Insecte
						</IonSelectOption>
                        <IonSelectOption value={`Normal`}>
							Normal
						</IonSelectOption>
                        <IonSelectOption value={`Plante`}>
							Plante
						</IonSelectOption>
                        <IonSelectOption value={`Poison`}>
							Poison
						</IonSelectOption>
                        <IonSelectOption value={`Psy`}>
							Psy
						</IonSelectOption>
                        <IonSelectOption value={`Roche`}>
							Roche
						</IonSelectOption>
                        <IonSelectOption value={`Sol`}>
							Sol
						</IonSelectOption>
                        <IonSelectOption value={`Spectre`}>
							Spectre
						</IonSelectOption>
                        <IonSelectOption value={`Ténèbre`}>
							Ténèbre
						</IonSelectOption>
                        <IonSelectOption value={`Vol`}>
							Vol
						</IonSelectOption>
					</IonSelect>
				
                </IonCol>
                <IonCol></IonCol>
            </IonRow>
            </IonGrid>




            <IonCard>
                <IonCardContent  style={{ cursor: 'pointer' }}>
                    
                <IonRow>
                {filteredPokemons && filteredPokemons.length > 0 ? (
                    filteredPokemons.map((pokemon: Pokemon, index: number) => (
                    <IonCol size="12" sizeMd="4" sizeLg="3" key={index} >
                    <IonCard className="card" onClick={()=>{ router.push('/pokemons/'+pokemon.pokedex_id) }}>
                    
                        <img src={pokemon.sprites.regular} alt={pokemon.name.fr} />
                            
                        <IonCardHeader>
                        <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
                        <IonCardSubtitle color='secondary'>{pokemon.category}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p><strong>Types:</strong> <span style={{color:'bleu'}}>{pokemon.types && pokemon.types.map(type => type.name).join(', ')}</span></p>
                            <p><strong>Taille:</strong> {pokemon.height}</p>
                            <p><strong>Poids:</strong> {pokemon.weight}</p>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                        ))
                    ) : (
                        <p>No Pokémon found.</p>
                )}
                </IonRow>

                </IonCardContent>
            </IonCard>
            
        </IonContent>
    </IonPage>
    </>
)

}

export default Favoris