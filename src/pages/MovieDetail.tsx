import React from 'react'
import { IonBackButton, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonPopover, IonRow, IonSpinner, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import APIROUTE from '../APIROUTE';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useParams } from 'react-router';
import CollectionItem from '../components/CollectionItem';

const MovieDetail = () => {



    const [movie, setMovie] = useState<IMovieDetail | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const params: { id: string } = useParams();
    const router=useIonRouter();
    useEffect(() => {
        const getMovies = async () => {
            setLoading(true)
            try {
                const reponse = await fetch(`${APIROUTE.movie_detail}/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "Appliation/json"
                    }
                })
                if (reponse.ok) {
                    const result: IMovieDetail = await reponse.json();
                    setMovie(result);
                }
            } catch (error) {
                console.log({ error })
            } finally {
                setLoading(false)
            }
        }

        getMovies();
    }, [])



    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonItem routerLink={`/movies`}>
                        <IonTitle slot='start'>Serie Details</IonTitle>
                    </IonItem>
                    <IonItem slot='end'>
                        <IonBackButton />
                    </IonItem>
                </IonToolbar>

            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">

                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>


                    {
                        loading ? (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <IonSpinner ></IonSpinner>
                            </div>
                        ) : (
                            movie &&
                            <div className="ion-padding-right">
                                <IonRow style={{ gap: "15px", }} class='justify-content-center'>
                                    <IonCol sizeMd='8' sizeXl='3' size='12'>
                                        <img height={500} style={{ borderRadius: "15px" }} width="100%" alt="Silhouette of mountains" src={movie.poster_path ? APIROUTE.MEDIA_MOVIE_URL + movie.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
                                    </IonCol>
                                    <IonCol sizeMd='6' sizeXl='8' size='13'>
                                        <IonGrid >
                                            <IonRow class='align-items-center'>
                                                <IonCardSubtitle>Titre</IonCardSubtitle>
                                                <IonCardTitle class="ion-padding">{movie.title}</IonCardTitle>
                                                <IonCardSubtitle >Titre Original</IonCardSubtitle>
                                                <IonCardTitle class="ion-padding">{movie.original_title}</IonCardTitle>
                                            </IonRow>
                                            <IonCardSubtitle >Langue Original: </IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{movie.original_language}</IonCardTitle>
                                            <IonCardSubtitle >Durée</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{movie.runtime} min</IonCardTitle>
                                            <IonCardSubtitle   >Date de réalisation:</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding"> {movie.release_date}</IonCardTitle>
                                            <IonRow class='align-items-center'>
                                                <IonCardSubtitle   >Budget:</IonCardSubtitle>
                                                <IonCardTitle class="ion-padding"> {movie.budget}$</IonCardTitle>
                                                <IonCardSubtitle   >revenue:</IonCardSubtitle>
                                                <IonCardTitle class="ion-padding"> {movie.revenue}$</IonCardTitle>
                                            </IonRow>

                                            <IonCardSubtitle style={{ FontWeight: "350" }} >Popularitie</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{movie.popularity}</IonCardTitle>
                                            <IonRow class='align-items-center'>
                                                <IonCardSubtitle style={{ FontWeight: "350" }} >Moyenne des votes:</IonCardSubtitle>
                                                <IonCardSubtitle class="ion-padding">{movie.vote_average}</IonCardSubtitle>
                                                <IonCardSubtitle style={{ FontWeight: "350" }}  >Nombre de votes:</IonCardSubtitle>
                                                <IonCardSubtitle class="ion-padding">{movie.vote_average}</IonCardSubtitle>
                                            </IonRow>
                                            <IonCardSubtitle class="ion-padding" >Genre de Film</IonCardSubtitle>

                                            <ul>
                                                {
                                                    movie?.genres && movie?.genres.map(genres => (
                                                        <li>{genres.name}</li>
                                                    ))
                                                }
                                            </ul>
                                            <IonCardSubtitle class="ion-padding" >Companie de production</IonCardSubtitle>

                                            <div style={{ display: 'flex', alignItems: "center", flexWrap: "wrap", gap: "10px" }}>

                                                {
                                                    movie?.production_companies.map(production_companie => (

                                                        <div key={production_companie.id} id="click-trigger" style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", padding: "10px", borderRadius: "5px" }} >
                                                            <IonButton color="light" id="click-trigger">
                                                                <img src={production_companie.logo_path ? APIROUTE.MEDIA_MOVIE_URL + production_companie.logo_path : "https://ionicframework.com/docs/img/demos/card-media.png"} width={100} height={60} alt="" />
                                                            </IonButton>
                                                            <IonPopover trigger="click-trigger" triggerAction="click">
                                                                <IonContent class="ion-padding">hello wolrd</IonContent>
                                                            </IonPopover>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        </IonGrid>
                                    </IonCol>

                                </IonRow>
                                {
                                    movie.belongs_to_collection && (
                                        <>
                                            <IonTitle class="ion-padding">Collections</IonTitle>
                                                 <CollectionItem {...movie.belongs_to_collection} />
                                        </>
                                    )
                                }
                            </div>

                        )
                    }



                </IonGrid>

            </IonContent >
        </IonPage >


    )
}

export default MovieDetail