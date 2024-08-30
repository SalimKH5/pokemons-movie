import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonIcon, IonItem, IonRow, useIonRouter } from '@ionic/react';
import APIROUTE from '../APIROUTE';
import { star } from "ionicons/icons"
const Serie: React.FC<TVShowPOST> = (serie) => {
        const route=useIonRouter();
        console.log({serie})
    return (
       
            <IonCard 
            onClick={()=>{
                route.push(`/series/detail/${serie.id}`);
            }}
            style={{ height: "100%" }}>
                <IonGrid>
                    <img height={350} width="100%" alt="Silhouette of mountains" src={serie.poster_path ? APIROUTE.MEDIA_MOVIE_URL + serie.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
                    <IonCardHeader>
                        <IonCardTitle>{serie.name}</IonCardTitle>
                        <IonCardSubtitle>Titre Original:{serie.original_name}</IonCardSubtitle>
                        <IonCardSubtitle>Langue Original:{serie.original_language}</IonCardSubtitle>
                        <IonCardSubtitle>Date de réalisation:{serie.first_air_date}</IonCardSubtitle>
                        <IonCardSubtitle>popularitie:{serie.popularity}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{serie.overview.length > 100 ? serie.overview.slice(0, 100) + '...' : serie.overview}</IonCardContent>
                </IonGrid>

            </IonCard>
       
    )
}

export default Serie