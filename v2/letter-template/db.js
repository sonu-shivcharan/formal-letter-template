
import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function trackPageView(page_path) {
  logEvent(analytics, 'page_view', {
    page_path: page_path,
    page_title: document.title,
    page_location: window.location.href
  });
}
function trackButtonClick() {
  logEvent(analytics, 'generate_btn_click', {
    button_name: 'generateLetterBtn'
  });
  console.log("Button click tracked!");
}


trackPageView(window.location.pathname);
document.getElementById("generateLetterBtn").addEventListener("click",trackButtonClick);
console.log("Page view tracked for:", window.location.pathname, document.title);