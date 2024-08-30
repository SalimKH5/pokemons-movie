import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSpinner, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import APIROUTE from '../APIROUTE';
import Movie from '../components/Movie';
import { useHistory, useLocation, useParams } from 'react-router';
import PaginationComponent from '../components/PaginationComponent';
import MovieSekeleton from '../components/MovieSekeleton';
import CollectionItem from '../components/CollectionItem';

import { SwiperSlide, Swiper } from 'swiper/react';
const Collection = () => {
    const [collection, setCollection] = useState<ICollection | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string | undefined>("");
    const params: { id: string } = useParams();
    useEffect(() => {

        const getCollections = async () => {
            setLoading(true)

            try {
                const reponse = await fetch(`${APIROUTE.collections}/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "Appliation/json"
                    },
                    cache: "no-cache"
                })
                if (reponse.ok) {
                    const result: ICollection = await reponse.json();
                    setCollection(result);
                }
            } catch (error) {
                console.log({ error })
            } finally {
                setLoading(false)
            }
        }

        getCollections();

    }, [])



    return (
        <IonPage>
            <IonHeader>

                <IonToolbar>
                    <a style={{padding:"0 10px",textDecoration:"none"}} href="/movies">Movies</a>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">

                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar value={searchQuery} onIonChange={e => { setSearchQuery(e.detail.value!); }} animated={true} placeholder="Cherche votre Film"></IonSearchbar>
                <IonGrid>

                    {
                        loading ? (
                            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <IonRow style={{ width: "100%", height: "100%" }} className="justify-content-center">
                                    {
                                        Array(10)
                                            .fill(0)
                                            .map((_, idx) => (
                                                <IonCol key={idx} sizeMd="6" sizeXl="3" size="12">
                                                    <MovieSekeleton />
                                                </IonCol>
                                            ))
                                    }
                                </IonRow>
                            </div>
                        ) : (
                            collection
                            && <div style={{ width: "100%", height: "100%" }}>
                                <CollectionItem {...collection} />
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
                                        collection.parts.map((movie: IMovie) => (
                                            <>
                                                <SwiperSlide>   <Movie key={movie.id} {...movie} /></SwiperSlide>
                                            </>
                                        ))}
                                </Swiper>
                            </div>

                        )
                    }

                </IonGrid>

            </IonContent>
        </IonPage >
    )
}

export default Collection