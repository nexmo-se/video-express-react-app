import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import VideoRoom from "./components/VideoRoom";
import Error from "./components/Error";
import WaitingRoom from "./components/WaitingRoom";
import EndCall from "./components/EndCall";

// Theme Configuration

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useEffect, useMemo, useState } from "react";

let primary = process.env.REACT_APP_PALETTE_PRIMARY || "#b779ff";
let secondary = process.env.REACT_APP_PALETTE_SECONDARY || "#d6219c";

const theme = () => {
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      bodyBackground: {
        black: "#131415",
      },
      callBackground: {
        main: "#20262D",
      },
      toolbarBackground: {
        main: "#41464D",
      },
      activeButtons: {
        green: "#1C8731",
        red: "#D50F2C",
      },
    },
  });
};

function App() {
  const [user, setUser] = useState({
    videoFilter: {
      filterName: false,
      filterPayload: false,
    },
    defaultSettings: {
      publishAudio: true,
      publishVideo: true,
      audioSource: undefined,
      videoSource: undefined,
      audioOutput: undefined,
    },
  });

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme()}>
        <Router>
          <UserContext.Provider value={userValue}>
            <Routes>
              <Route path="/room/:roomName/:sessionId/end" element={<EndCall />}> </Route>
              <Route exact path="/room/:roomName" element={<VideoRoom />}></Route>
              <Route path="/error" element={<Error />}></Route>
              <Route exact path="/" element={<WaitingRoom />}></Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
