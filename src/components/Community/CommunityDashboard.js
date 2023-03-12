import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const CommunityDashboard = () => {
  const user = useSelector(selectUser);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("communities")
      .where("creatorId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const requests = [];
        querySnapshot.forEach((doc) => {
          const community = { id: doc.id, ...doc.data() };
          community.pendingRequests?.forEach((request) => {
            requests.push({ community, request });
          });
        });
        setPendingRequests(requests);
      });
    return unsubscribe;
  }, [user]);

  const handleApproveJoinRequest = (request) => {
    db.collection("communities")
      .doc(request.community.id)
      .update({
        communityMembers: firebase.firestore.FieldValue.arrayUnion(user.uid),
        pendingRequests: firebase.firestore.FieldValue.arrayRemove(
          request.request
        ),
      })
      .then(() => {
        console.log("Join request approved successfully!");
      })
      .catch((error) => {
        console.error("Error approving join request: ", error);
      });
  };

  return (
    <div className="mt-24 h-screen">
      <h2>Join Requests</h2>

      {pendingRequests.length > 0 ? (
        <ul>
          {pendingRequests.map((joinRequest) => (
            <li key={joinRequest.request.id}>
              <p>
                <strong>{joinRequest.community.communityName}</strong>:{" "}
                {/* {joinRequest.community.communityBio} */}
              </p>
              <p>
                <em>{joinRequest.request.diplayName}</em> has requested to join
                this community.
              </p>
              <button onClick={() => handleApproveJoinRequest(joinRequest)}>
                Approve Request
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No join requests to display.</p>
      )}
    </div>
  );
};

export default CommunityDashboard;
