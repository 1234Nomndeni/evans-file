import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import {db} from '../../utils/firebase'
import ReactTimeago from 'react-timeago'

const Subscriptions = () => {
    const [subscribers, setSubscribers] = useState([])

    const fetchSubs = async () => {
      try {
        await db
          .collection("mail_list")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setSubscribers(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchSubs();
    }, []);
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="mt-24 mx-wd1 bg-white mx-auto p-4 pt-12 pl-12 border rounded-md"
    >
      <h2>Interested Melbite users</h2>

      {subscribers?.map(({ id, data: { email, timestamp } }) => (
        <span className='flex' key={id}>
          <p className="text-lg mr-24">{email}</p>
          <p>
            Registered:{" "}
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
          </p>
        </span>
      ))}
    </main>
  );
}

export default Subscriptions