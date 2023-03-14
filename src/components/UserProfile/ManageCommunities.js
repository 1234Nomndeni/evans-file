import { useEffect, useState } from "react";
import DashboardNavigator from "./DashboardNavigator";
import DashboardLinks from "./DashboardLinks";
import firebase from "firebase/compat/app";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const ManageCommunities = () => {
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
        communityMembers: firebase.firestore.FieldValue.arrayUnion(
          request.request
        ),
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
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <div className="block md:hidden">
        <DashboardNavigator />
      </div>

      <section>
        <DashboardLinks />
      </section>
      <section className="w-full ml-0 md:ml-20">
        <h1>My Communities</h1>

        <section className="mt-8">
          {pendingRequests.length > 0 ? (
            <section className="bg-white py-2 px-5 rounded-md">
              {pendingRequests.map((joinRequest) => (
                <div className="my-8 " key={joinRequest.request.id}>
                  <h1 className="text-2xl">
                    Community: {joinRequest.community.communityName}{" "}
                  </h1>
                  <p className="mt-2 mb-3">
                    Someone has requested to join your community
                  </p>
                  <button
                    className="text-xs md:text-sm border border-purple-600 text-purple-800 hover:bg-purple-800 hover:text-white px-7 hover:ease-in-out duration-150 py-2 rounded-full transform hover:scale-105 cursor-pointer"
                    onClick={() => handleApproveJoinRequest(joinRequest)}
                  >
                    Approve Request
                  </button>
                </div>
              ))}
            </section>
          ) : (
            <p className="mt-6">No join requests to approve</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default ManageCommunities;
