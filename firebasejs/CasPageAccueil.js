// URL de base du serveur CAS et des pages accueils et 
const CAS_BASE_URL = 'https://identites.ensea.fr/cas';
const SERVICE_URL = encodeURIComponent('http://127.0.0.1:5500/Pageaccueil.html');
const SERVICE_URL2 = encodeURIComponent('http://127.0.0.1:5500/index.html');
const SERVICE_URL3 = encodeURIComponent('http://127.0.0.1:5500/premierepage.html');



// Écouteur d'événement pour le bouton "Se connecter"
const CAS_Button = document.getElementById("connect-button")
CAS_Button.addEventListener("click", function()  { // a la place de function() on peut mettre ()=>
    // Redirection vers le serveur CAS avec le paramètre 'service'
    console.log("CAS connected")
    window.location.href = `${CAS_BASE_URL}/login?service=${SERVICE_URL3}`;
});


//explication 

//window.location est un objet JavaScript qui représente l'URL actuelle de la page 
//dans le navigateur.

//window.location.href est une propriété qui contient l'URL complète de la page. 
//En la modifiant, vous redirigez l'utilisateur vers une nouvelle URL.

//login : Cela indique que l'URL est destinée à la page de connexion du serveur CAS. 
//Cela signifie que l'utilisateur sera redirigé vers le formulaire de connexion de CAS pour s'authentifier.

//?service=${SERVICE_URL2} : Cette partie ajoute un paramètre de requête (query parameter) à l'URL. 
//Le ? marque le début des paramètres dans une URL. 
//Le paramètre service contient une URL (c'est-à-dire SERVICE_URL2), qui indique où l'utilisateur doit être redirigé après une authentification réussie.

//La fonction encodeURIComponent() est une méthode JavaScript qui permet de encoder
// une chaîne de caractères de manière à ce qu'elle soit valide dans une URL, 
//en particulier lorsqu'elle est utilisée dans une query string (la partie de l'URL après le ?).