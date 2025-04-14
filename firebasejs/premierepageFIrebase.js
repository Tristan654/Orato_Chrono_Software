import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  update,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  projectId: "Playground",
  databaseURL:
    "https://enseatimekeeper-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings); //sert à initialiser et configurer votre application Firebase avec les paramètres que vous fournissez. Elle permet à votre application de se connecter aux services Firebase
console.log(app);
const database = getDatabase(app); //Cette fonction permet d'accéder à votre base de données Firebase.
console.log(database);
// const userId= ref(database, "userId")
const Conference = ref(database, "Conference"); // ref sert a spécifier un chemin spécifique dans ta base de donnée

const Button = document.querySelector(".button_start_meeting");
// https://console.firebase.google.com/u/0/project/enseatimekeeper/database/enseatimekeeper-default-rtdb/data lien database

let nbr_click = 0;
Button.addEventListener("click", () => {
  nbr_click += 1;
  let ValueF = false;
  let ValueT = true;
  if (nbr_click % 2 == 1) {
    update(Conference, { testIsOn: ValueT })
      .then(() => {
        console.log("Update successful!");
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
      });
  } else {
    update(Conference, { testIsOn: ValueF })
      .then(() => {
        console.log("Update successful!");
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
      });
  }
});
