"use strict";

let menu;
let menyGrupp;
let filter = "";
let allergiFilter = "";
let sorteringStigande = false;
let visaMaträtter;

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
function createButtonKott() {
     menyGrupp.remove();
     filter = "kött";
     createNewMenu();
}

function createButtonFisk() {
     menyGrupp.remove();
     filter = "fisk";
     createNewMenu();
    
}
function createCheckBoxKyckling() {
    menyGrupp.remove();
    filter = "kyckling";
    createNewMenu();
}
function createButtonVego() {
        menyGrupp.remove();
        filter = "vegetariskt";
        createNewMenu();
    
}

function createButtonLaktos() {
        menyGrupp.remove();
        allergiFilter = "laktos";
        createNewMenu();
  
}

function createButtonGluten() {
        menyGrupp.remove();
        allergiFilter = "gluten";
        createNewMenu();
    
}


function createShowAll() {
        menyGrupp.remove();
        filter = "";
        allergiFilter = "";
        createNewMenu();
    
}

function createNewMenu() {
    menyGrupp = document.createElement("div");
    menyGrupp.classList.add("meny-grupp");
    document.getElementById("container").append(menyGrupp);

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
        visaMaträtter.sort((a, b) => { return b.pris - a.pris });
        menyGrupp.classList.remove("meny-grupp");
    } else {
        visaMaträtter.sort((a, b) => {
          return a.pris - b.pris;
        });
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


let samtliga = document.getElementById("samtliga");
let kött = document.getElementById("kött");
let fisk = document.getElementById("fisk");
let fågel = document.getElementById("fågel");
let vegetariskt = document.getElementById("vegetariskt");
let laktos = document.getElementById("laktos");
let gluten = document.getElementById("gluten");

// Function for checkbox
function checkBoxChecked() {
   
            if (kött.checked == true && kött.value == "kött") {
                 createButtonKott();
            }
            else if (fisk.checked == true && fisk.value == "fisk") {
                createButtonFisk();
            }
            else if (fågel.checked == true && fågel.value == "fågel") {
              createCheckBoxKyckling();
            } else if (
              vegetariskt.checked == true &&
              vegetariskt.value == "vegetariskt"
            ) {
              createButtonVego();
             }
            else if (laktos.checked == true && laktos.value == "laktos") {
              createButtonLaktos();
            }
            else if (gluten.checked == true && gluten.value == "gluten") {
              createButtonGluten();
            } else {
              createShowAll();
            }
        
      
    
}

let biligastPris = document.getElementById("biligastPris");
let dyrastPris = document.getElementById("dyrastPris");


function sorteraPris() {
    if (!sorteringStigande) {
        sorteringStigande = true;
        menyGrupp.remove();
        
        createNewMenu();
         
    } else {
        sorteringStigande = false;
        menyGrupp.remove();
            createNewMenu();
    }

}
  
