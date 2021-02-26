import firebase from "gatsby-plugin-firebase"
import "firebase/firestore"

export const getFirebase = () => {
  // if(!firebase.apps.length){
  //   // const firebaseApp = firebase.initializeApp(config);
  //   let firestore = firebase.firestore();
  //   return firestore;
  // }

  if(firebase) {
    return firebase.firestore();
  }
}