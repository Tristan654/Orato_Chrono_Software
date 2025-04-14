import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Configuration Firebase
const appSettings = {
  projectId: "Playground",
  databaseURL:
    "https://enseatimekeeper-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);


// Récupération des éléments du formulaire
const inputField = document.getElementById("input-field"); // Nom de la conférence
const dateField = document.getElementById("date-field"); // Date
const heureField = document.getElementById("heure-field"); // Heure de début
const salleField = document.getElementById("salle-field"); // Salle
const adminField = document.getElementById("admin-field"); // Administrateur
const intervenantsField = document.getElementById("intervenants-field"); // Intervenants (séparés par des virgules)
const derouleField = document.getElementById("deroule-field"); // Déroulé
const tempsField = document.getElementById("temps-field"); // Temps par intervenant (format: Nom=Temps,Nom=Temps)
const addButtonEl = document.getElementById("add-button");
const imageEl = document.getElementById("image1");
const button_go_back = document.querySelector("#button_go_back");

// Ajout de la conférence lors du clic sur le bouton
addButtonEl.addEventListener("click", function () {
  // Récupération des valeurs du formulaire
  const conferenceName = inputField.value;
  const conferenceDate = dateField.value;
  const conferenceHeure = heureField.value;
  const conferenceSalle = salleField.value;
  const conferenceAdmin = adminField.value;
  const intervenantsStr = intervenantsField.value;
  const conferenceDeroule = derouleField.value;
  const tempsStr = tempsField.value;

  // Conversion de la chaîne d'intervenants en tableau
  const intervenants = intervenantsStr
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  // Conversion du champ temps par intervenant en objet
  let tempsParIntervenant = {};
  if (tempsStr.trim() !== "") {
    tempsStr.split(",").forEach((pair) => {
      const parts = pair.split("=");
      if (parts.length === 2) {
        const nom = parts[0].trim();
        const temps = Number(parts[1].trim());
        if (nom && !isNaN(temps)) {
          tempsParIntervenant[nom] = temps;
        }
      }
    });
  }

  // Création de l'objet conférence à partir des données utilisateur
  const nouvelleConference = {
    nom: conferenceName,
    date: conferenceDate,
    salleId: conferenceSalle,
    admin: conferenceAdmin,
    intervenants: intervenants,
    heureDebut: conferenceHeure,
    deroule: conferenceDeroule,
    tempsParIntervenant: tempsParIntervenant,
    modifiable: true,
  };

  const conferenceId = inputField.value.replace(/\s+/g, "-").toLowerCase();
  const conferencesRef = ref(database, `Conferences/${conferenceId}`);

  // Envoi de la conférence vers Firebase
  set(conferencesRef, nouvelleConference)
    .then(() => {
      console.log("Conférence ajoutée avec succès !");
    })
    .catch((error) => {
      console.error("Échec de l'ajout de la conférence :", error);
    });

  // Animation de l'image
  imageEl.style.animation = "none";
  void imageEl.offsetWidth; // Forcer le reflow
  imageEl.style.animation = "rotation 3s";

  // Réinitialisation des champs du formulaire
  inputField.value = "";
  dateField.value = "";
  heureField.value = "";
  salleField.value = "";
  adminField.value = "";
  intervenantsField.value = "";
  derouleField.value = "";
  tempsField.value = "";

  

 
});

// Récupération des conférences depuis Firebase (pour affichage ou traitement ultérieur)
const conferencesRef2 = ref(database, `Conferences`);
onValue(conferencesRef2, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Liste des conférences :", data);
  } else {
    console.log("Aucune conférence trouvée.");
  }
});

//button go back

button_go_back.addEventListener("click", () => {
  window.location.href = "premierepage.html";
});

//fin button go back


