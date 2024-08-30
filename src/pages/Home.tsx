import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { initCookie } from '../utils/capacitorCookies/cookies';

const Home: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useIonRouter();

  useEffect(()=>{
    setShowAlert(true);
  }, []);
  
  const handleAcceptCookies= ()=> {

    initCookie('favoris');

    router.push('/pokemons', 'forward');
  }

  return (
    <IonPage>
    
      <IonContent fullscreen className='center-content'>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
            <IonCard className='card'>
              <IonCardContent>
                <p>Les cookies sont obligatoires pour accéder aux pokemons</p>
                <IonButton id="present-alert">Acceder aux pokemons</IonButton>

              </IonCardContent>
            </IonCard>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      <IonAlert
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
      ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Home;
