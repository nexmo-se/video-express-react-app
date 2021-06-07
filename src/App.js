import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { UserContext } from './context/UserContext';
import VideoRoom from './components/VideoRoom';
import Error from './components/Error';
import WaitingRoom from './components/WaitingRoom';
import EndCall from './components/EndCall';
import UserNameRoute from './components/UserNameRoute';

// Theme Configuration

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import { useMemo, useState } from 'react';

const theme = () => {
  let primary = process.env.REACT_APP_PALETTE_PRIMARY || '#3c93cd';
  let secondary = process.env.REACT_APP_PALETTE_SECONDARY || '#f0b34e';
  return createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      },
      callBackground: {
        main: '#20262D'
      },
      toolbarBackground: {
        main: '#41464D'
      }
    }
  });
};

function App() {
  const [user, setUser] = useState({
    defaultSettings: {
      publishAudio: true,
      publishVideo: true
    }
  });
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <ThemeProvider theme={theme()}>
      <Router>
        <UserContext.Provider value={userValue}>
          <div>
            <Switch>
              <Route path="/room/:roomName/:sessionId/end">
                <EndCall />
              </Route>
              <UserNameRoute
                exact
                path="/room/:roomName"
                component={VideoRoom}
              />
              {/* <Route path="/room/:roomName" component={VideoRoom}></Route> */}
              {/* add a new component > When you go to room/roomName checks whether there's an username. If yes, the user went to waiting room
            If yes, render videoRoom. If not, render waitingroom */}
              {/* <Route path="/waitingroom/:room" component={WaitingRoom}></Route> */}
              <Route path="/error" component={Error}></Route>
              <Route exact path="/" component={WaitingRoom}></Route>
              <Route path="*">
                <Redirect
                  to={{
                    pathname: '/'
                  }}
                />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
