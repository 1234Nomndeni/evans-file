import * as functions from "firebase-functions";
import algoliasearch from 'algoliasearch'
import admin from "firebase-admin"
import sendgrid from "@sendgrid/mail"

const env = functions.config()
const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key)
const index = client.initIndex('posts')

admin.initializeApp()

export const onProductCreated = functions.firestore
  .document('posts/{postId}')
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: snap.id,
      ...snap.data(),
    })
  })

export const onProductDeleted = functions.firestore
.document('posts/{postId}')
.onDelete((snap, ctx) => {
return index.deleteObject(snap.id)
})

<<<<<<< HEAD
=======

export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName;

  const msg = {
    to: email,
    from: 'info@melbite.com',
    subject: 'Welcome To Melbite',
    text: `Hi ${displayName}! Welcome to melbite. We're glad you're here.`,
    html: `<p>Hi ${displayName}!</p><p>Welcome melbite. We're glad you're here.</p>`,
  }

  return sendgrid.send(msg)
})
>>>>>>> 2656ad310d2456f10214d56e344d1c14cb308f54
