
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,update,push,set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {  projectId: "Playground", databaseURL : "https://enseatimekeeper-default-rtdb.europe-west1.firebasedatabase.app/"}
const app = initializeApp(appSettings) //sert à initialiser et configurer votre application Firebase avec les paramètres que vous fournissez. Elle permet à votre application de se connecter aux services Firebase
console.log(app)
const database = getDatabase(app)//Cette fonction permet d'accéder à votre base de données Firebase.
console.log(database)
// const userId= ref(database, "userId")
const Conference= ref(database, "Conference")// ref sert a spécifier un chemin spécifique dans ta base de donnée


const inputField = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const Image =document.getElementById("image1")


addButtonEl.addEventListener("click",function(){ //fonction à exécuter lorsque l'événement "click" se produit ce qui a en dessous
    
    let inputValue=inputField.value
    
    

    update(Conference, { testIsOn: inputValue })
    .then(() => {
        console.log("Update successful!");
    })
    .catch((error) => {
        console.error("Failed to update data:", error);
    });

    if (inputValue === "true"){
        update(Conference, { dataToDisplayInTest: 2 })
    }else{
        update(Conference, { dataToDisplayInTest: 0})
    }

    // push(userId, {
    //     username: inputValue,
    // })

    Image.style.animation = "none";// Supprimer l'animation existante pour css obliger de mettre style
    void Image.offsetWidth; // Forcer le recalcul du DOM (hack pour réinitialiser)
    Image.style.animation = "rotation 3s";
    
    console.log(inputValue)
    inputField.value = ""
})




