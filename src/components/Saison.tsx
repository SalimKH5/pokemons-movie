import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, useIonRouter } from '@ionic/react';
import React from 'react'
import APIROUTE from '../APIROUTE';

const Saison : React.FC<ISeason>= (saison) => {
    const route=useIonRouter();

  return (
    <IonCard 
    
    style={{ height: "100%" }}>
        <IonGrid>
            <img height={350} width="100%" alt="Silhouette of mountains" src={saison.poster_path ? APIROUTE.MEDIA_MOVIE_URL + saison.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
            <IonCardHeader>
                <IonCardTitle>{saison.name}</IonCardTitle>
                <IonCardSubtitle>Saison:{saison.season_number}</IonCardSubtitle>
                <IonCardSubtitle>nombre d'episode:{saison.episode_count}</IonCardSubtitle>
                <IonCardSubtitle>Date de première diffusion:{saison.air_date}</IonCardSubtitle>
                <IonCardSubtitle>popularitie:{saison.vote_average}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>{saison.overview.length > 100 ? saison.overview.slice(0, 100) + '...' : saison.overview}</IonCardContent>
        </IonGrid>

    </IonCard>
  )
}

export default Saison