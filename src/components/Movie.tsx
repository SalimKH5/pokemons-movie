import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonIcon, IonItem, IonRow, useIonRouter } from '@ionic/react';
import APIROUTE from '../APIROUTE';
import { star } from "ionicons/icons"
const Movie: React.FC<IMovie> = (movie) => {
        const route=useIonRouter();
    
    return (
       
            <IonCard 
            onClick={()=>{
                route.push(`/movies/detail/${movie.id}`);
            }}
            style={{ height: "100%" }}>
                <IonGrid>
                    <img height={350} width="100%" alt="Silhouette of mountains" src={movie.poster_path ? APIROUTE.MEDIA_MOVIE_URL + movie.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
                    <IonCardHeader>
                        <IonCardTitle>{movie.title}</IonCardTitle>
                        <IonCardSubtitle>Titre Original:{movie.original_title}</IonCardSubtitle>
                        <IonCardSubtitle>Langue Original:{movie.original_language}</IonCardSubtitle>
                        <IonCardSubtitle>Date de réalisation:{movie.release_date}</IonCardSubtitle>
                        <IonCardSubtitle>popularitie:{movie.popularity}</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>{movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}</IonCardContent>
                </IonGrid>

            </IonCard>
       
    )
}

export default Movie