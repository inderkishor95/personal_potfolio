var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// --- MOBILE MENU FUNCTIONALITY ---
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    // Slides the menu into view
    sidemenu.style.right = "0"; 
}

function closemenu() {
    // Slides the menu back off-screen
    sidemenu.style.right = "-200px"; 
}