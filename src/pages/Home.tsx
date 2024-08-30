import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import APIROUTE from '../APIROUTE';
import { IonIcon } from '@ionic/react';
import { gameController, filmOutline, tvOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const route = useIonRouter();
  return (
    <IonPage>

      <IonContent fullscreen className='center-content'>
        <div style={{ width: "100%", height: "100%", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ height: "40px", width: "100%" }}>
            <IonTitle>Bienvenue Dans notre Application voici notre Menu</IonTitle>
          </div>


          <div style={{ width: "100%", maxWidth: "400px", display: "flex", justifyContent: "space-between" }} >
            <button
              onClick={() => {
                route.push("/pokemons")
              }}
              style={{ display: "flex", gap: "15px", padding: "8px 10px", background: "#0080ff", color: "White", justifyContent: "center", alignItems: "center", borderRadius: "5px" }} >Pokemon <IonIcon icon={gameController} size="large"></IonIcon></button>
            <button
              onClick={() => {
                route.push("/movies")
              }}
              style={{ display: "flex", gap: "15px", padding: "8px 10px", background: "#0080ff", color: "White", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>FILM <IonIcon icon={filmOutline} size="large"></IonIcon></button>
            <button
              onClick={() => {
                route.push("/series")
              }}

              style={{ display: "flex", gap: "15px", padding: "8px 10px", background: "#0080ff", color: "White", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>Series <IonIcon icon={tvOutline} size="large"></IonIcon></button>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
{/* <IonAlert
        isOpen={showAlert}
        header="Cookies!"
        trigger="present-alert"
        buttons={[
          {
            text: 'Accepter les cookies',
            role: 'confirm',
            handler: () => {
              handleAcceptCookies();
            },
          },
        ]}
        // onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
      ></IonAlert> */}