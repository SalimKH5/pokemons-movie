import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Series from './pages/Series';
import SerieDetail from './pages/SerieDetail';
import Collection from './pages/Collection';
import Pokemons from './pages/pokemons_pages/Pokemons';
import Favoris from './pages/pokemons_pages/Favories';
import SinglePokemon from './pages/pokemons_pages/SinglePokemon';
import { home } from 'ionicons/icons';
import { gameController,filmOutline } from 'ionicons/icons';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/movies" >
            <Movies />
          </Route>
          <Route exact path="/series" >
            <Series />
          </Route>
          <Route exact path="/series/detail/:id/" >
            <SerieDetail />
          </Route>
          <Route exact path="/collection/:id/" >
            <Collection />
          </Route>
          <Route exact path="/movies/detail/:id/">
            <MovieDetail />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pokemons">
            <Pokemons />
          </Route>
          <Route exact path="/pokemons/:id">
            <SinglePokemon />
          </Route>
          <Route exact path="/pokemons/favoris">
            <Favoris />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="pokemons" href="/pokemons">
            <IonIcon icon={gameController} />
            <IonLabel>pokemons</IonLabel>
          </IonTabButton>
          <IonTabButton tab="movies" href="/movies">
            <IonIcon icon={filmOutline} />
            <IonLabel>Film</IonLabel>
          </IonTabButton>

          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
