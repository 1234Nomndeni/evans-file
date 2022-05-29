import * as functions from "firebase-functions";
import algoliasearch from 'algoliasearch'

const env = functions.config()

const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key)
const index = client.initIndex('posts')

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