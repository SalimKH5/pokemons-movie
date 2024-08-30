import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { starOutline } from "ionicons/icons";

function Header() {
    return (
        <IonHeader>
        <IonToolbar>
        <IonTitle>Pokemon</IonTitle>
        <IonButton routerLink="/pokemons/favoris" fill='clear' slot='end' color='secondary' className='ion-margin-end'>
            <IonIcon slot="icon-only" icon={starOutline} className='ion-margin-end'></IonIcon>
            Mes Favoris
            </IonButton>
        </IonToolbar>
    </IonHeader>
    );

}

export default Header;