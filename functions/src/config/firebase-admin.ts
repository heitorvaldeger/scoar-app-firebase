import {applicationDefault, initializeApp} from "firebase-admin/app";

const defaultApp = initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://scoar-app.firebaseio.com",
});

export default defaultApp;
