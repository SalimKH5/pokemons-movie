import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSpinner, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import APIROUTE from '../APIROUTE';
import Movie from '../components/Movie';
import { useLocation } from 'react-router';

import MovieSekeleton from '../components/MovieSekeleton';
import Serie from '../components/Serie';

const Series: React.FC = () => {
  const location = useLocation();
  // Extract the search string from the location object
  const search = location.search;

  // Optionally, parse the search string into query parameters
  const params = new URLSearchParams(search);
  const query = params.get('search');
  const pageIndex = params.get('pageIndex');

  const [series, setSeries] = useState<TVShowPOST[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(query ? query : undefined);
  const [currentPage, setCurrentPage] = useState<number>(pageIndex ? parseInt(pageIndex) : 1);

  const router = useIonRouter();



  useEffect(() => {

    const getMovies = async () => {
      setLoading(true)

      try {
        const reponse = await fetch(`${APIROUTE.series}/${searchQuery}${pageIndex ? `/${pageIndex}` : "/"}`, {
          method: "GET",
          headers: {
            "Content-type": "Appliation/json"
          },
          cache: "no-cache"
        })
        if (reponse.ok) {
          const result: TVShowPOST[] = await reponse.json();
          setSeries(result);
          setCurrentPage(1)
        }
      } catch (error) {
        console.log({ error })
      } finally {
        setLoading(false)
      }
    }
    if (searchQuery) {
      getMovies();
    }

  }, [searchQuery, pageIndex])




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Series</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">

            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar value={searchQuery} onIonChange={e => { setSearchQuery(e.detail.value!); setCurrentPage(1) }} animated={true} placeholder="Cherche votre serie"></IonSearchbar>
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
              series && series?.length > 0 ?
                (<div style={{ width: "100%", height: "100%" }}>
                  <IonRow style={{ width: "100%", height: "100%" }} class='justify-content-center'>
                    {series.map((serie: TVShowPOST) => (

                      <IonCol key={serie.id} sizeMd='6' sizeXl='3' size='12'>
                        <Serie key={serie.id} {...serie} />
                      </IonCol>

                    ))}
                  </IonRow>
                </div>)
                :
                (
                  <div style={{ width: "100%", height: "100%", justifyContent: "center", display: "flex", alignItems: "center" }}>
                    <p>Aucun result</p>
                  </div>
                )

            )
          }

        </IonGrid>

      </IonContent>
    </IonPage >
  );
};

export default Series;
