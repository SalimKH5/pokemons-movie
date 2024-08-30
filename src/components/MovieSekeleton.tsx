import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonSkeletonText } from '@ionic/react';


const MovieSekeleton = () => {
    return (
        <IonCard
            style={{ height: "100%" }}>
            <IonGrid>

                <IonSkeletonText  style={{height:300,width:"100%"}}/>

                <IonCardHeader>
                    <IonCardTitle><IonSkeletonText /></IonCardTitle>
                    <IonCardSubtitle><IonSkeletonText /></IonCardSubtitle>
                    <IonCardSubtitle><IonSkeletonText /></IonCardSubtitle>
                    <IonCardSubtitle><IonSkeletonText /></IonCardSubtitle>
                    <IonCardSubtitle><IonSkeletonText /></IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent><IonSkeletonText /></IonCardContent>
            </IonGrid>

        </IonCard>
    )
}

export default MovieSekeleton