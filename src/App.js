import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import VideoRoom from './components/VideoRoom';
import Error from './components/Error';
import WaitingRoom from './components/WaitingRoom';
import EndCall from './components/EndCall';

// Theme Configuration

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';

const theme = () => {
  let primary = process.env.REACT_APP_PALETTE_PRIMARY || '#3c93cd';
  let secondary = process.env.REACT_APP_PALETTE_SECONDARY || '#f0b34e';
  return createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
  });
};

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <Router>
        <div>
          <Switch>
            {/* <Route path="/room/:roomName/end">
              <EndCall />
            </Route> */}
            <Route path="/room/:roomName" component={VideoRoom}></Route>
            <Route path="/error" component={Error}></Route>
            <Route exact path="/" component={WaitingRoom}></Route>
            <Route path="*">
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
