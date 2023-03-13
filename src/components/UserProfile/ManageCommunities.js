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
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <div className="block md:hidden">
        <DashboardNavigator />
      </div>

      <section>
        <DashboardLinks />
      </section>
      <section className="w-full ml-0 md:ml-20">
        <h1>My Communities</h1>
        <p className="mt-20">Your will appear here</p>
      </section>
    </main>
  );
};

export default ManageCommunities;
