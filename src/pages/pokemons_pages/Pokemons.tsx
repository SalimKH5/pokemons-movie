import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonSkeletonText, IonSpinner, IonTitle, IonToolbar, SelectChangeEventDetail, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import APIROUTE from '../../APIROUTE';
import { IonSelectCustomEvent } from '@ionic/core';
import './style.css'
import Pokemon from '../../components/Pokemon';
import MovieSekeleton from '../../components/MovieSekeleton';

const Pokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [search, setSearch] = useState('');
    const router = useIonRouter();
    const [loading, setLoading] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState<any>(null);
    const [selectedFilter, setSelectedFilter] = useState('All');




    useIonViewWillEnter(() => {
        try {

            const getData = async () => {
                setLoading(true);
                const response = await fetch(APIROUTE.pokemons, {
                    method: "GET",
                    headers: {
                        "Content-type": "Appliation/json"
                    },
                    cache: "no-cache"
                });

                const dataOfResponse = await response.json();
                
                setTimeout(() => {
                    setPokemons(dataOfResponse);
                    setLoading(false);
                }, 2000);
            };

            getData();
            
           

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

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Pokemons</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
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
                        <IonCardContent style={{ cursor: 'pointer' }}>
                            
                                <IonRow>
                                    {!loading && filteredPokemons && filteredPokemons.length > 0 ? (
                                        filteredPokemons.map((pokemon: Pokemon, index: number) => (
                                            <Pokemon {...pokemon} />
                                        ))
                                    ) : ( 
                                        <>
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
                                    
                                    </>
                                    )}
                                </IonRow>
                            



                        </IonCardContent>
                    </IonCard>

                </IonContent>
            </IonPage>
        </>
    )

}

export default Pokemons