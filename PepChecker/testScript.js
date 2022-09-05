/*
Av og til problem med CORS policy ved bruk av Stacc's KYC API, varierer fra søk til søk
*/

//Hovedmetode for søk av orgNr
const searchOrgNr = (orgNr) => {
  fetch(`https://code-challenge.stacc.dev/api/roller?orgNr=${orgNr}`)
    .then((response) => {
      if (response.status != 200) {
        document.getElementById("hits_message").innerHTML =
          "ERROR " +
          response.status +
          " Make sure to enter valid organization number";
      } else {
        return response.json();
      }
    })

    .then((json_result) => {
      if (!json_result) {
        //Sjekker om noe ble hentet, om ikke blir det feilkode 400
        return;
      }

      document.getElementById(
        "org_name"
      ).innerHTML = `PEP-checking for organization number ${orgNr}`;
      console.log(json_result);

      let nameArray = []; //tabell til ansatte

      for (let i = 0; i < json_result.length; i++) {
        if (
          json_result[i].type.kode != "REGN" && //REGN og REVI har ikke navn av en grunn
          json_result[i].type.kode != "REVI"
        ) {
          for (let j = 0; j < json_result[i].roller.length; j++) {
            nameArray.push(
              json_result[i].roller[j].person.navn.fornavn +
                " " +
                json_result[i].roller[j].person.navn.etternavn
            );
          }
        }
      }

      console.log(nameArray);
      pepCheckArray(nameArray);
    });
};

// sjekker etter PEP'er i nameArray
function pepCheckArray(nameArray) {
  for (let i = 0; i < nameArray.length; i++) {
    searchName(nameArray[i]);
  }
}

//Hovedmetode for søk av navn
const searchName = (name) => {
  fetch(`https://code-challenge.stacc.dev/api/pep?name=${name}`)
    .then((response) => {
      if (response.status != 200) {
        document.getElementById("hits_message").innerHTML =
          "ERROR " +
          response.status +
          " Make sure not to search with any special characters";
      } else {
        return response.json();
      }
    })
    .then((json_result) => {
      if (json_result.numberOfHits < 1) {
        document.getElementById(
          "hits_message"
        ).innerHTML = `There were no hits for the name ${name}!`;
      } else if (json_result.numberOfHits < 20) {
        if (json_result.numberOfHits < 4) {
          //legger til css klasse som flytter peps til høyre
          document.getElementById("pep_list").classList.add("push-right");
        }

        document.getElementById(
          "hits_message"
        ).innerHTML = `${json_result.numberOfHits} hits for name ${name}!`;
        displayHits(json_result, json_result.numberOfHits);
      } else {
        const showNumber = 7;
        document.getElementById(
          "hits_message"
        ).innerHTML = `Displaying ${showNumber} out of ${json_result.numberOfHits} hits for name ${name}! 
        \n Try narrowing down your search`;
        displayHits(json_result, showNumber);
      }
    });
};

//Skaper html liste og fyller den opp med pep-objekter, legger så listen til pep_list
function displayHits(json, length) {
  let ul = document.createElement("ul");

  for (let i = 0; i < length; i++) {
    let pep = {};
    pep.name = json.hits[i].name;
    pep.bday = json.hits[i].birth_date;
    pep.countries = json.hits[i].countries;

    updatePEPList(pep, ul);
  }

  document.getElementById("pep_list").appendChild(ul);
}

//Legger til liste med data til "hovedlisten" ved bruk av makeInfoList
function updatePEPList(pep, htmlList) {
  let li = document.createElement("li");
  li.appendChild(makeInfoList(pep));
  htmlList.appendChild(li);
}

//Lager lister ut av PEP-dataen
function makeInfoList(object) {
  let ul = document.createElement("ul");
  for (let i in object) {
    let li = document.createElement("li");
    li.innerHTML = `${i}: ${object[i]}`;
    ul.appendChild(li);
  }

  return ul;
}

function nameBtnClicked() {
  clearHTML();
  let name = document.querySelector("input").value;

  searchName(name);
}

function orgNrBtnClicked() {
  clearHTML();
  let orgNr = document.querySelector("input").value;

  searchOrgNr(orgNr);
}

function clearHTML() {
  document.getElementById("pep_list").classList.remove("push-right");
  document.getElementById("org_name").innerHTML = "";
  document.getElementById("hits_message").innerHTML = "";
  document.getElementById("pep_list").innerHTML = "";
}
