import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAEFyTCROs5V2bVPfUlbxJJ4gBMv09RIeg",
    authDomain: "cars-1f829.firebaseapp.com",
    projectId: "cars-1f829",
    storageBucket: "cars-1f829.firebasestorage.app",
    messagingSenderId: "84350403987",
    appId: "1:84350403987:web:db000fbd531567c9d9d466",
    measurementId: "G-03TL8DJ5X0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signup = async function () {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value;
    const confirm = document.getElementById("confirm").value;
    const message = document.getElementById("msg");

    message.style.display = "block";

    if (name === "" || email === "" || pass === "" || confirm === "") {
        message.style.color = "#ff6b6b";
        message.textContent = "Please fill all fields";
        return;
    }

    if (pass !== confirm) {
        message.style.color = "#ff6b6b";
        message.textContent = "Passwords do not match";
        return;
    }

    if (pass.length < 6) {
        message.style.color = "#ff6b6b";
        message.textContent = "Password must be at least 6 characters";
        return;
    }

    try {

        await createUserWithEmailAndPassword(auth, email, pass);

        message.style.color = "#4ade80";
        message.textContent = "Account created successfully!";

        setTimeout(() => {
            window.location.href = "projectlogin.html";
        }, 1000);

    } catch (error) {

        message.style.color = "#ff6b6b";

        if (error.code === "auth/email-already-in-use") {
            message.textContent = "This email is already registered.";
        } else if (error.code === "auth/invalid-email") {
            message.textContent = "Please enter a valid email address.";
        } else if (error.code === "auth/weak-password") {
            message.textContent = "Password is too weak.";
        } else {
            message.textContent = "Could not create account. Please try again.";
        }
    }
};

window.login = async function () {

    const email = document.getElementById("ema").value.trim();
    const password = document.getElementById("pass").value;
    const message = document.getElementById("msg");

    message.style.display = "block";

    if (email === "" || password === "") {
        message.style.color = "#ff6b6b";
        message.textContent = "Please fill all fields";
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        message.style.color = "#4ade80";
        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);

    } catch (error) {

        message.style.color = "#ff6b6b";

        if (error.code === "auth/invalid-email") {
            message.textContent = "Please enter a valid email address.";
        } else if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            message.textContent = "Incorrect email or password.";
        } else {
            message.textContent = "Login failed. Please try again.";
        }
    }
};