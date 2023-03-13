import React from "react";
import DashboardNavigator from "./DashboardNavigator";
import DashboardLinks from "./DashboardLinks";

const Notifications = () => {
  return (
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <div className="block md:hidden">
        <DashboardNavigator />
      </div>

      <section>
        <DashboardLinks />
      </section>

      <section className="w-full ml-0 md:ml-20">
        <h1>Notifications</h1>
        <p className="mt-20">Your Notifications will appear here</p>
      </section>
    </main>
  );
};

export default Notifications;
