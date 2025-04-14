import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  projectId: "Playground",
  databaseURL:
    "https://enseatimekeeper-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);

//beginning left
const calendar = document.querySelector("#calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector("#days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  button_today = document.querySelector("#button_today"),
  button_togo = document.querySelector("#button_togo"),
  input_togo = document.querySelector("#input_goto"),
  addEventBtn = document.querySelector(".add-event-plus"),
  addEventContainer = document.querySelector("#add-event-wrapper"),
  addEventCloseBtn = document.querySelector("#add-event-wrapper .close"),
  addEventCloseStartMeeting = document.querySelector(
    ".Event_name_container .close"
  ),
  // start_container = document.querySelector(".start_container"),
  addEventSubmit = document.querySelector(".add-event-byn"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventTitle = document.querySelector(".event-name"),
  eventsContainer = document.querySelector("#events"),
  eventDay = document.querySelector("#event_day"),
  eventDate = document.querySelector("#event_date"),
  iconHome = document.querySelector(".icon-home"),
  iconSearch = document.querySelector(".icon-search"),
  iconPerson = document.querySelector(".icon-person"),
  searchContainer = document.querySelector(".search-container"),
  start_container=document.querySelector(".start_container");

// input_goto = document.querySelector("#input_goto");

let today = new Date();
//console.log(today);
let month = today.getMonth();
let years = today.getFullYear();
let todayActive;

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const eventsArr = [
  {
    // day: 13,
    // month: 2,
    // year:2025,
    // events:{
    //   title: "event 1 ",
    //   time: "10am"
    // },
  },
];

function initCalendar(a) {
  // get prev month, day and current month day and next month days
  const firstDay = new Date(years, month, 1); //premier jour du mois
  const lastDay = new Date(years, month + 1, 0); //dernier jour du mois
  const prevLastDays = new Date(years, month, 0); //le dernier jour du mois précédent
  const prevDays = prevLastDays.getDate();
  //console.log(prevDays);
  const lastDay2 = lastDay.getDate();
  const day = firstDay.getDay() - 1; //donne le nbr associé au jour de la semaine avec lundi = 1 etc ;
  //console.log(day);
  const nextDays = 7 - lastDay.getDay();

  //update date top of calendar
  date.innerHTML = months[month] + " " + years; //.innerHTML en JavaScript permet d'insérer ou de modifier le contenu HTML d'un élément DOM, comme un <div>, <span>

  let days = "";

  //prev month date
  for (let x = day; x > 0; x--) {
    days += `<div class="day_prev_month">${prevDays - x + 1}</div>`;
  }

  //current month days
  for (let i = 1; i <= lastDay2; i++) {
    //check if event are present on current day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day == i &&
        eventObj.month == month + 1 &&
        eventObj.year == years
      )
        event = true;
    });

    // if(eventFound){event =true}

    if (
      i === new Date().getDate() &&
      years === new Date().getFullYear() && //les 2 && servent quand tu changent de mois a enlever le jour today pc il ne doit etre actif que dans le moi actuel
      month === new Date().getMonth()
    ) {
      // days += `<div class="day active">${i}</div>`;
      if (event) {
        days += `<div class="day active event">${i}</div>`;
      } else {
        days += `<div class="day active">${i}</div>`;
      }
    } else {
      // days += `<div class="day">${i}</div>`;
      if (event) {
        days += `<div class="day  event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  //next month date
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day_next_month">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
}


// function pour changer de moi dans le calendrier
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    years--;
  }
  initCalendar();
}
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    years++;
  }
  initCalendar();
}
prev.addEventListener("click", prevMonth); // d'aller au mois d'avant
next.addEventListener("click", nextMonth); //aller au mois d'apres

// function boutton today
function buttonToday() {
  month = today.getMonth();
  years = today.getFullYear();
  initCalendar();
}
button_today.addEventListener("click", buttonToday);

//function boutton input
function buttonToGo(event) {
  //allow only number remove anything else
  input_togo.value = input_togo.value.replace(/[^0-9/]/g, "");

  if (input_togo.value.length == 2) {
    //console.log(input_togo.value.length);
    input_togo.value += "/";
  }
  if (input_togo.value.length > 7) {
    input_togo.value = input_togo.value.slice(0, 7); //si plus de 7 caractere tu les supprime les nouveaux
  }

  if (event.inputType == "deleteContentBackward") {
    if (input_togo.value.length == 3) {
      input_togo.value = input_togo.value.slice(0, 2);
    }
  }
}
input_togo.addEventListener("input", buttonToGo);

//button go
button_togo.addEventListener("click", () => {
  const dateArr = input_togo.value.split("/"); //divise cette valeur en plusieurs parties en utilisant le caractère / comme séparateur, et stocke ces parties dans un tableau nommé dateArr
  console.log(dateArr);
  if (dateArr.length == 2) {
    console.log(dateArr[1].length);
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
      console.log("Ok");
      month = dateArr[0] - 1;
      years = dateArr[1];
      initCalendar();
      input_togo.value = "";
      return;
    }
  }
  alert("invalid date");
});

//end left

// beginning right

// debut bouton plus

addEventBtn.addEventListener("click", () => {
  window.location.href = "info.html";
});

// changer le jour en cliquand

function getactiveday(date) {
  const day = new Date(years, month, date);
  const dayname = day.toLocaleDateString("en-US", { weekday: "long" });
  eventDay.innerHTML = dayname;
  eventDate.innerHTML = date + " " + months[month] + " " + years;
}

// fonction pour ecouter
let activeDay;
function addListener() {
  const days = document.querySelectorAll(".day"); // Retourne une NodeList (une liste d'éléments semblable à un tableau)
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      activeDay = e.target.innerHTML;
      // console.log(typeof(activeDay))
      getactiveday(activeDay);
    });
  });
}

// BOUTTON AJOUTER DES INFO

//début du code menu côté gauche container

//icon
iconHome.addEventListener("click", () => {
  window.location.href = "Pageaccueil.html";
});

iconPerson.addEventListener("click", () => {
  window.location.href = "https://intranet.ensea.fr/";
});

// prochaine etape recup de la firebase les elements et les renvoyer en tant qu'event dans le

const Conference = ref(database);

try {
  const snapshot = await get(child(Conference, "Conferences"));
  if (snapshot.exists()) {
    const userData = snapshot.val();
    
    for (const key in userData) {
      let eventDate = userData[key].date;
      let eventDay = parseInt(eventDate.split("-")[2]);
      let eventMonth = parseInt(eventDate.split("-")[1]);
      let eventYear = parseInt(eventDate.split("-")[0]);
      eventsArr.push({
        day: eventDay,
        month: eventMonth,
        year: eventYear,
        events: {
          title: key,
          time: userData[key].heureDebut,
        },
      });
    }
    initCalendar();
    document.querySelectorAll(".day").forEach((day) => {
      day.addEventListener("click", (e) => {
        let events = "";
        let activeDay = e.target.innerHTML.trim();
        let eventFound = false;
        console.log(userData);
        for (const key in userData) {
          let eventDate = userData[key].date;
          let eventDay = parseInt(eventDate.split("-")[2]);
          console.log(`Comparaison : ${eventDay} vs ${activeDay}`);
          console.log(`Conférence${key} -Date : ${userData[key].date}`);
          if (activeDay == eventDay) {
            console.log(userData[key].date);
            console.log(activeDay);
            events += `
              <div class="event">
                <div class="container_event_title">
                  <div class="title">
                    <div class="event_title">${key}</div>
                  </div>
                  
                </div>
                <div class="event_time">${userData[key].heureDebut}</div>
              </div>`;
            eventFound = true;
            console.log(`✅ Date trouvée : ${activeDay}`);
          }
        }

        if (!eventFound) {
          events = `<div class="no_event">
                      <h3>No Events</h3>
                    </div>`;
          console.log(`❌ Pas de conférence ce jour-là : ${activeDay}`);
        }

        eventsContainer.innerHTML = events;
      });
    });
  } else {
    console.log("Aucune donnée trouvée.");
  }
} catch (error) {
  console.error("Erreur lors de la récupération :", error);
}


//  recherche event
const snapshot = await get(child(Conference, "Conferences"));
const userData = snapshot.val();
let nbrClickSearchButton = 0;
iconSearch.addEventListener("click", () => {
  nbrClickSearchButton += 1;
  if (nbrClickSearchButton % 2 == 1) {
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Search...";
    searchBar.id = "searchBar";
    searchContainer.appendChild(searchBar);
    searchContainer.style.display = "block";
  } else {
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
      searchContainer.removeChild(searchBar);
    }
    searchContainer.style.display = "none";
  }

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("L'utilisateur a appuyé sur Entrée avec : ", searchBar.value);
      for (const key in userData){
        if(searchBar.value === key){
          let eventDate = userData[key].date;
          let eventDay = parseInt(eventDate.split("-")[2]);
          document.querySelectorAll(".day").forEach((div) => {
            if (div.innerText.includes(`${eventDay}`)) {
              div.style.color = "red"; 
              div.style.fontSize = "30px"; 
            }
          });
        }
      }searchBar.value = "";
    }
  });

  
  
});

// fin recherche event



//button start meeting

let nbr_click_button_event = 0;
eventsContainer.addEventListener("click", (e) => {
  nbr_click_button_event += 1;
  if (nbr_click_button_event % 2 == 1) {
    start_container.style.display = "block";
  }
});
addEventCloseStartMeeting.addEventListener("click", () => {
  nbr_click_button_event += 1;
  if (nbr_click_button_event % 2 == 0) {
    start_container.style.display = "none";
  }
});