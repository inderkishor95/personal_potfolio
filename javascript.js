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



// --- FORM TO GOOGLE SHEETS FUNCTIONALITY ---

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    // Prevent the default page reload
    e.preventDefault();
    
    // Change button text to show the user it's loading
    submitBtn.innerHTML = "Sending...";
    
    // Grab the data from the form
    const formData = new FormData(form);
    
    // SheetDB expects data to be wrapped in a "data" array
    const requestBody = {
        data: [
            {
                "Name": formData.get('Name'),
                "Email": formData.get('Email'),
                "Message": formData.get('Message')
            }
        ]
    };

    // PASTE YOUR SHEETDB API URL BELOW
    fetch('https://sheetdb.io/api/v1/c2gkynokge34t', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        // Show success message and reset everything
        alert("Success! Your message has been sent.");
        form.reset();
        submitBtn.innerHTML = "Submit";
    })
    .catch(error => {
        // Handle any errors
        console.error('Error!', error.message);
        alert("Oops! Something went wrong. Please try again.");
        submitBtn.innerHTML = "Submit";
    });
});



// gatekeepr
function verify() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (email.includes('@') && phone.length > 8) {
        // In a "no-backend" setup, we just simulate the success
        document.getElementById('gatekeeper').style.display = 'none';
        localStorage.setItem('verified', 'true');
    } else {
        alert("Please enter valid details.");
    }
}

// On Page Load
window.onload = function() {
    if (localStorage.getItem('verified') === 'true') {
        document.getElementById('gatekeeper').style.display = 'none';
    }
}


// --- LEAD MAGNET POPUP FUNCTIONALITY ---
const popup = document.getElementById('lead-popup');
const popupForm = document.getElementById('popupForm');

// Show the popup 5 seconds after the page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        popup.style.display = 'flex';
    }, 5000); // 5000ms = 5 seconds
});

// Send the popup email to your Google Sheet
popupForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(popupForm);
    const requestBody = {
        data: [{ "Email": formData.get('Email') }]
    };

    // Make sure to paste your actual SheetDB API URL here!
    fetch('https://sheetdb.io/api/v1/c2gkynokge34t', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        alert("Thanks! Your download link is on the way.");
        popup.style.display = 'none'; // Hides the popup ONLY after successful submission
        popupForm.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Oops! Something went wrong.");
    });
});