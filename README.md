# Vonage Video Express Demo App 

This application shows how to build a multi-party video app with [Vonage Video Express](https://tokbox.com/developer/multiparty/) and [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). It's a library that is built on top of the [Vonage Video API for Javascript](https://tokbox.com/developer/sdks/js/). The Vonage Video Express provides by default the following features:

- Layout Management. Out of the box responsive UI and Layout Manager with customizable components
- Video Quality Optimization (framerate and resolution) based on the number of participants, rendering sizes, CPU and network conditions.
- Network optimization. Automatically remove video or audio for participants who are non visible or non speaking, optimizing bandwidth resources
  -Ease of use. It providers a more natural interaction by replacing publishing, subscribing and streams with Room and Participants.

## Prerequisites

- [Node.js v14.11.0+](https://nodejs.org/en/)
- [React v17.0.2+](https://reactjs.org/)

## Installation

1. Run `npm install` to install all dependencies from NPM.
2. Copy the `env.example` file to `.env.development` or `.env.production` and fill the variables needed

For local development, you can run `npm run server-dev` to run the server and `npm start` to run the client side of the application.

## Features

The app has the following features:

- [x] Video conferencing with real-time audio and video
- [x] Screen sharing
- [x] Room Name + Participant Name selection
- [x] Device Selection
- [x] Network warnings once the user is reconnected/reconnecting or disconnected
- [x] Layout Change (Active Speaker/Grid View)
- [x] Enable/disable camera
- [x] Mute/unmute mic
- [x] Mute All
- [x] Chat
- [x] Archiving [Archive API](https://tokbox.com/developer/guides/archiving/)
- [x] Background Blur

## App Architecture

### Server Side

The server side is a node.JS server that is in charge of credentials generation and archive management (start/stop/list). The API reference is documented at the [server side README](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/blob/main/server/README.md).

### Client Side

The client side is a [React](https://reactjs.org/) one single page application. Before joining the main video room, the user will land on a waiting room, where the user can choose the device to use, make sure that the microphone and camera works and select the user name. The app creates a `UserContext` to store the user name, and user preferrences (audio, video and devices). The react applicatoin has several hooks to make the application more structured and scalable.

#### API calls

The application needs to communicate with our server to start/stop and get a list of the recordings for a given session and also to get the credentials to join the session. The API utilities can be found at the [api folder](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/tree/main/src/api)

#### Hooks

This project uses React Hooks, in particular it uses React Hooks and Contexts:

##### UseRoom

The src/hooks/useRoom.js hook handles the Room object of the Vonage Video Express. The main functions are:

- createCall: given the credentials (APIKeys, SessionId and Token), the function connects to the Opentok servers, add the event listeners (onStreamCreated and onStreamDestroyed). The function calls `new MP.Room({})` function from the Vonage Video Express: [https://tokbox.com/developer/multiparty/reference/room.html](https://tokbox.com/developer/multiparty/reference/room.html).
- addParticipants: adds the participants in the local `participants` state.
- removeParticipants: removes the participants in the local `participants` state.

##### UsePreviewPublisher

The src/hooks/usePreviewPublisher hook handles the [previewPublishers](https://tokbox.com/developer/multiparty/reference/preview-publisher.html). The previewPublisher is used in the waiting room page to show the preview of audio and camera streams.

- createPreview: creates the local preview publisher and handles the `accessAllowed` and `accessDenied`.
- destroyPreview: destroys the local preview publisher. This is called when we change view from Waiting room to the VideoCall View.

##### UseDevices

The src/hooks/useDevices hook handles the `MP.getDevices` function ([https://tokbox.com/developer/multiparty/reference/get-devices.html](https://tokbox.com/developer/multiparty/reference/get-devices.html)). The hook sets `audioInputDevices`, `audioOutputDevices` and `videoInputDevices` in the `deviceInfo` state variable.

##### UseScreenSharing

The src/hooks/useScreenSharing hook handles the [ScreenPublisher](https://tokbox.com/developer/multiparty/reference/screen-publisher.html) object.

- startScreenSharing: this function calls the `startScreensharing` to start the screen sharing. It also adds the events such as `started`, `stopped` and `accessDenied` to handle the different user's actions.
- stopScreenSharing: this function stops the screen sharing stream.

#### Main Components

##### Waiting Room

This component leverages the [UsePreviewPublisher](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/blob/main/src/hooks/usePreviewPublisher.js) hook to show a media preview of the user and the [UseDevices](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/blob/main/src/hooks/UseDevices.js) hook to allow the user choose the microphone and camera

##### ToolBar

The ToolBar component contains all the buttons along with the logic to mute audio/video, handle screen sharing change devices and layout and mute participants.

##### Video Room

It's the main component of the application. It contains the ToolBar and the network indicator. Once the component is mounted, it will request the credentials from the server to start the video call.

## Screenshots

### Waiting Room

![Waiting Room](public/images/Preview.png?raw=true)

### End Meeting View

![Waiting Room](public/images/endMeetingView.png?raw=true)

### Single Participant

![Waiting Room](public/images/singleParticipant.png?raw=true)

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nexmo-se/video-api-multiparty-toolkit-sample-app.git)
