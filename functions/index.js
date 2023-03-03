const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

const db = admin.firestore();

admin.initializeApp();

const API_KEY = functions.config().sendgrid.key;
const TEMPLETE_ID = functions.config().sendgrid.templete;

sgMail.setApiKey(API_KEY);

export const welcomeEmail = functions.auth.user().onCreate((user) => {
  const msg = {
    to: user?.email,
    from: "info@melbite.com",
    subject: "Welcome to My Blog",
    text: `Hi ${user?.displayName},\n\nWelcome to My Blog! We're excited to have you as a member of our community.`,
    html: `Hi ${user?.displayName},<br><br>Welcome to My Blog! We're excited to have you as a member of our community.`,
  };

  return sgMail.send(msg);
});



