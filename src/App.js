import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {Home} from "./pages/Home/Home";
import {About} from "./pages/About/About";
import {AlertState} from "./context/alert/alertState";
import {KinopoiskState} from "./context/kinopoisk/kinopoiskState";
import {Movie} from "./pages/Movie/Movie";


function App() {
  return (
    <BrowserRouter>
        <KinopoiskState>
            <AlertState>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/movie/:id" component={Movie} />
                </Switch>
            </AlertState>
        </KinopoiskState>
    </BrowserRouter>
  );
}

export default App;
