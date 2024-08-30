import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSpinner, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import APIROUTE from '../APIROUTE';
import Movie from '../components/Movie';
import { useHistory, useLocation, useParams } from 'react-router';
import PaginationComponent from '../components/PaginationComponent';
import MovieSekeleton from '../components/MovieSekeleton';

const Movies: React.FC = () => {
  const location = useLocation();
  // Extract the search string from the location object
  const search = location.search;

  // Optionally, parse the search string into query parameters
  const params = new URLSearchParams(search);
  const query = params.get('search');
  const pageIndex = params.get('pageIndex');

  const [movies, setMovies] = useState<IResultMovie | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(query ? query : undefined);
  const [currentPage, setCurrentPage] = useState<number>(pageIndex ? parseInt(pageIndex) : 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useIonRouter();



  useEffect(() => {

    const getMovies = async () => {
      setLoading(true)

      try {
        const reponse = await fetch(`${APIROUTE.movies}/${searchQuery}${pageIndex ? `/${pageIndex}` : "/"}`, {
          method: "GET",
          headers: {
            "Content-type": "Appliation/json"
          },
          cache: "no-cache"
        })
        if (reponse.ok) {
          const result: IResultMovie = await reponse.json();
          setMovies(result);

          setTotalPages(result.total_pages);
          setCurrentPage(result.page)
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

  const handleNextPage = () => {
    if (currentPage < totalPages && pageIndex) {
      router.push(`/Movies?search=${searchQuery}&&pageIndex=${parseInt(pageIndex) + 1}`)
      setCurrentPage(parseInt(pageIndex) + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1 && pageIndex) {
      router.push(`/Movies?search=${searchQuery}&&pageIndex=${parseInt(pageIndex) - 1}`)
      setCurrentPage(parseInt(pageIndex) - 1);
    }
  };

  console.log({ totalPages,currentPage ,pageIndex});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">

            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar value={searchQuery} onIonChange={e => { setSearchQuery(e.detail.value!); setCurrentPage(1) }} animated={true} placeholder="Cherche votre Film"></IonSearchbar>
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
              movies
              && <div style={{ width: "100%", height: "100%" }}>
                <IonRow style={{ width: "100%", height: "100%" }} class='justify-content-center'>
                  {
                  movies.results.length>0 ?
                  movies.results.map((movie: IMovie) => (

                      <IonCol  key={movie.id} sizeMd='6' sizeXl='3' size='12'>
                        <Movie key={movie.id} {...movie} />
                      </IonCol>
                  
                  ))
                :(
                  <div style={{width:"100%",height:"100%",justifyContent:"center",display:"flex",alignItems:"center"}}>
                          <p>Aucun result</p>
                  </div>
                )
                }
                </IonRow>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} className="">
                  <PaginationComponent type='movies' searchQuery={searchQuery} currentPage={currentPage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} totalPages={totalPages} />
                </div>

              </div>

            )
          }

        </IonGrid>

      </IonContent>
    </IonPage >
  );
};

export default Movies;
