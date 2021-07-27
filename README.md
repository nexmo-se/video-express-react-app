# Video API Multiparty SDK Sample App

This application shows how to build a multi-party video app with [Vonage Multiparty Toolkit](https://tokbox.com/developer/multiparty/) and [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). It's a library that is built on top of the [Vonage Video API for Javascript](https://tokbox.com/developer/sdks/js/). The Multiparty Toolkit provides by default the following features:

- Layout Management. Out of the box responsive UI and Layout Manager with customizable components
- Video Quality Optimization (framerate and resolution) based on the number of participants, rendering sizes, CPU and network conditions.
- Network optimization. Automatically remove video or audio for participants who are non visible or non speaking, optimizing bandwidth resources
  -Ease of use. It providers a more natural interaction by replacing publishing, subscribing and streams with Room and Participants.

## Prerequisites

//TODO

## Installation

1. Run `npm install` to install all dependencies from NPM.
2. Copy the `env.example` file to `.env` and fill the variables needed

For local development, you can run `npm run server-dev` to run the server and `npm start` to run the client side of the application.

## Features

The app has the following features:

- [x] Video conferencing with real-time audio and video
- [x] Screen sharing
- [x] Room Name + Participant Name selection
- [x] Device Selection
- [x] Layout Change (Active Speaker/Grid View)
- [x] Enable/disable camera
- [x] Mute/unmute mic
- [x] Mute All
- [x] Archiving [Archive API](https://tokbox.com/developer/guides/archiving/)

## App Architecture

### Server Side

The server side is a node.JS server that is in charge of credentials generation and archive management (start/stop/list). The API reference is documented at the [server side README](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/blob/main/server/README.md).

### Client Side

The client side is a [React](https://reactjs.org/) one single page application. Before joining the main video room, the user will land on a waiting room, where the user can choose the device to use, make sure that the microphone and camera works and select the user name. The app creates a `UserContext` to store the user name, and user preferrences (audio, video and devices). The react applicatoin has several hooks to make the application more structured and scalable.

#### API calls

The application needs to communicate with our server to start/stop and get a list of the recordings for a given session and also to get the credentials to join the session. The API utilities can be found at the [api folder](https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app/tree/main/src/api)

#### Hooks

// TODO

### Main Components

// TODO. Explain waiting room, videoRoom and ToolBar components and how they use the hooks

## Using the app

//TODO. Is this section necessary?

## Screenshots

## Deploy to Heroku

// TODO
