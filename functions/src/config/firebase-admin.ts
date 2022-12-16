import {applicationDefault, initializeApp} from "firebase-admin/app";

import {getDatabase} from "firebase-admin/database";

const source = {
  "rules": {
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid",
        ".read": "$uid === auth.uid",
      },
    },
  },
};

const defaultApp = initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://scoar-app.firebaseio.com",
});

// getDatabase(defaultApp).ref("/.settings/rules").set(source).then(() => {
//   console.log("Rules have been updated");
// });

export default defaultApp;
