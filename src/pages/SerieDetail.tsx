import { IonBackButton, IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonPopover, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import APIROUTE from '../APIROUTE';
import { useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import Saison from '../components/Saison';

const SerieDetail = () => {

    const [serie, setSerie] = useState<TVShow | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const params: { id: string } = useParams();

    useEffect(() => {
        const getMovies = async () => {
            setLoading(false)
            try {
                const reponse = await fetch(`${APIROUTE.serie_detail}/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "Appliation/json"
                    }
                })
                if (reponse.ok) {
                    const result: TVShow = await reponse.json();
                    setSerie(result);
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
                    <IonItem routerLink={`/series/`}>
                        <IonTitle slot='start'>GOT Quotes</IonTitle>
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
                            serie &&
                            <div className="ion-padding-right">
                                <IonRow style={{ gap: "15px" }} class='justify-content-center'>
                                    <IonCol sizeMd='8' sizeXl='4' size='12'>
                                        <img height={500} style={{ borderRadius: "15px" }} width="100%" alt="Silhouette of mountains" src={serie.poster_path ? APIROUTE.MEDIA_MOVIE_URL + serie.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
                                    </IonCol>
                                    <IonCol sizeMd='3' sizeXl='4' size='16'>
                                        <IonGrid >
                                            <IonCardSubtitle  >Titre</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.name}</IonCardTitle>
                                            <IonCardSubtitle >Titre Original</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.original_name}</IonCardTitle>
                                            <IonCardSubtitle >Langue originale: </IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.original_language}</IonCardTitle>
                                            <IonCardSubtitle   >Date de première diffusion :</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding"> {serie.first_air_date}</IonCardTitle>
                                            <IonCardSubtitle   >Pays d'origine:</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding"> {serie.origin_country[0]}</IonCardTitle>
                                            <IonCardSubtitle style={{ FontWeight: "350" }} >Popularitie</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.popularity}</IonCardTitle>
                                            <IonCardSubtitle style={{ FontWeight: "350" }} >Moyenne des votes:</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.vote_average}</IonCardTitle>
                                            <IonCardSubtitle style={{ FontWeight: "350" }}  >Nombre de votes:</IonCardSubtitle>
                                            <IonCardTitle class="ion-padding">{serie.vote_average}</IonCardTitle>
                                            <IonCardTitle class="ion-padding">Crée par</IonCardTitle>
                                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>

                                                {
                                                    serie?.created_by.map(created => (
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "red", borderRadius: "5px", color: "white", padding: "2px 5px ", gap: "5px" }}>
                                                            {created.name}
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            <IonCardSubtitle class="ion-padding" >Companie de production</IonCardSubtitle>

                                            <div style={{ display: 'flex', alignItems: "center", flexWrap: "wrap", gap: "10px" }}>

                                                {
                                                    serie?.production_companies.map(production_companie => (

                                                        <div key={production_companie.id} id="click-trigger" style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", padding: "10px", borderRadius: "5px" }} >
                                                            <IonButton color="light" >
                                                                <img src={production_companie.logo_path ? APIROUTE.MEDIA_MOVIE_URL + production_companie.logo_path : ""} width={100} height={60} alt={production_companie.name} />
                                                            </IonButton>

                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        </IonGrid>
                                    </IonCol>

                                </IonRow>
                                {
                                    serie.seasons && (
                                        <>
                                            <h1>Saisons</h1>
                                            <Swiper
                                                style={{ width: "100%", height: "100%" }}
                                                autoplay={true}
                                                loop={true}
                                                breakpoints={{
                                                    // when window width is >= 640px

                                                    // when window width is >= 768px
                                                    "0": {
                                                        slidesPerView: 1,
                                                        spaceBetween: 5,

                                                    },
                                                    "768": {
                                                        slidesPerView: 2,
                                                        spaceBetween: 40
                                                    },
                                                    "980": {
                                                        slidesPerView: 4,
                                                        spaceBetween: 40
                                                    },
                                                }}
                                            >{
                                                    serie.seasons.map((saison) => (
                                                        <>
                                                            <SwiperSlide style={{height:"100%"}} key={saison.id}>   <Saison  {...saison} /></SwiperSlide>
                                                        </>
                                                    ))}
                                            </Swiper>
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

export default SerieDetail