import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoRoom from './components/VideoRoom';
import Error from './components/Error';
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
          {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
          <Switch>
            {/* <Route path="/about">
            <About />
          </Route> */}
            <Route path="/room/:roomName/end">
              <EndCall />
            </Route>
            <Route path="/room/:roomName">
              <VideoRoom />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
