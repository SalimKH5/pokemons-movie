import { IonCard, IonCardHeader, IonCardTitle, IonTitle, useIonRouter } from '@ionic/react';
import React from 'react'
import APIROUTE from '../APIROUTE';

const CollectionItem: React.FC<BelongToCollections|ICollection | null> = (collections) => {
    const router=useIonRouter();
    return (

        <IonCard
            onClick={() => {
                router.push(`/collection/${collections?.id}`);
            }}
            style={{ width: "250px", cursor: "pointer" }}>
            <img alt="Silhouette of mountains" src={collections?.poster_path ? APIROUTE.MEDIA_MOVIE_URL + collections.poster_path : "https://ionicframework.com/docs/img/demos/card-media.png"} />
            <IonCardHeader class='ion-padding'>
                <IonCardTitle>{collections?.name}</IonCardTitle>
            </IonCardHeader>

        </IonCard>
    )
}

export default CollectionItem