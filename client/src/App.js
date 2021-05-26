import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoRoom from './components/VideoRoom';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/room/:roomName">
            <VideoRoom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
