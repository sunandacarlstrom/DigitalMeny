"use strict";

let menu;
let menyGrupp;
let filter = "";
let allergiFilter = "";
let sorteringStigande = false;

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function getData() {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(xhttp.responseText);
    menu = response.menu;
    
    createNewMenu();
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();

/* Create Button Functions */
    function createButtonKott(){
      const btnKött = document.getElementById("kott");
      btnKött.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "kött";
        createNewMenu();
      });
    };  

    function createButtonFisk() { 
        const btnFisk = document.getElementById("fisk");
        btnFisk.addEventListener("click", function () {
          menyGrupp.remove();
          filter = "fisk";
          createNewMenu();
        });
    }; 

function createButtonVego() {
        const btnVego = document.getElementById("vego");
        btnVego.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "vegetariskt";
        createNewMenu();
        });
    }; 

    function createButtonLaktos() { 
        const btnLaktos = document.getElementById("laktos");
        btnLaktos.addEventListener("click", function () {
          menyGrupp.remove();
          allergiFilter = "laktos";
          createNewMenu();
        });
    }; 

    function createButtonGluten() { 
        const btnGluten = document.getElementById("gluten");
        btnGluten.addEventListener("click", function () {
        menyGrupp.remove();
        allergiFilter = "gluten";
        createNewMenu();
        });
    }; 
function createButtonPris() { 
         createShowAll();
         const btnPris = document.getElementById("pris");
         btnPris.addEventListener("click", function () {
           menyGrupp.remove();

           sorteringStigande = true;

           createNewMenu();
         });
    }; 

    function createShowAll() {
        const btnDelete = document.getElementById("showAll");
        btnDelete.addEventListener("click", function () {
          menyGrupp.remove();
          filter = "";
          allergiFilter = "";
          createNewMenu();
        });
    }; 



function createNewMenu() {
  menyGrupp = document.createElement("div");
  menyGrupp.classList.add("meny-grupp");
  document.getElementById("container").append(menyGrupp);

  let visaMaträtter;

  if (filter === "") {
    visaMaträtter = menu;
  } else {
    visaMaträtter = menu.filter((maträtt) => maträtt.typ === filter);
  }

  if (allergiFilter != "") {
    visaMaträtter = visaMaträtter.filter(function (maträtt) {
      let antalAllergierMaträtter = 0;

      maträtt.allergi.forEach((kontrollMaträtt) => {
        if (kontrollMaträtt === allergiFilter) {
          antalAllergierMaträtter = antalAllergierMaträtter + 1;
        }
      });

      if (antalAllergierMaträtter > 0) {
        return false;
      } else {
        return true;
      }
    });
  }

  if (!sorteringStigande) {
    visaMaträtter.sort((a, b) => (a.pris < b.pris ? 1 : -1));
  } else {
    visaMaträtter.sort((a, b) => (a.pris > b.pris ? 1 : -1));
  }

  visaMaträtter.forEach((menyData) => {
    const artiklar = document.createElement("div");
    artiklar.classList.add("artiklar");

    let artikelImg = document.createElement("img");
    artikelImg.classList.add("artikel-img");
    artikelImg.src = menyData.imgSrc;
    artikelImg.alt = menyData.alt;
    artiklar.append(artikelImg);

    let artikelText = document.createElement("div");
    artikelText.classList.add("artikel-text");
    artiklar.append(artikelText);

    //ändrade även i CSS till txt -> text
    let menyText = document.createElement("h3");
    menyText.classList.add("meny-text");
    artikelText.append(menyText);

    let artikelNamn = document.createElement("span");
    artikelNamn.classList.add("artikel-namn");
    artikelNamn.innerHTML = menyData.maträtt;
    let artikelPris = document.createElement("span");
    artikelPris.classList.add("artikel-pris");
    artikelPris.innerHTML = menyData.artikelPris;
    menyText.append(artikelNamn, artikelPris);

    let descriptionSwedish = document.createElement("p");
    descriptionSwedish.classList.add("description-swedish");
    descriptionSwedish.innerHTML = menyData.beskrivining;
    artikelText.append(descriptionSwedish);

    let descriptionTitle = document.createElement("span");
    descriptionTitle.classList.add("description-title");
    descriptionTitle.innerHTML = menyData.course;
    artikelText.append(descriptionTitle);

    let descriptionEnglish = document.createElement("p");
    descriptionEnglish.classList.add("description-english");
    descriptionEnglish.innerHTML = menyData.beskrivining;
    artikelText.append(descriptionEnglish);

    menyGrupp.append(artiklar);
  });
}

/* Filter function */

function filterMenu() {
  document.getElementById("filterMenu").classList.toggle("show");
}

// Filter Menu function
window.onclick = function (event) {
  if (!event.target.matches(".filterbtn")) {
    var filter = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < filter.length; i++) {
      var showFilter = filter[i];
      if (showFilter.classList.contains("show")) {
        showFilter.classList.remove("show");
      }
    }
  }
};
