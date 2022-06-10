import { useState } from "react";

const LocalStore = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const handle = () => {
    localStorage.setItem("Name", name);
    localStorage.setItem("Password", pwd);
  };
  const remove = () => {
    localStorage.removeItem("Name");
    localStorage.removeItem("Password");
  };
  const checkDrafts = () => {
    localStorage.getItem("Name");
  };
  return (
    <div className="h-screen mt-24">
      <h1>Name of the user:</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1>Password of the user:</h1>
      <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <div>
        <button onClick={handle}>Done</button>
      </div>

      <div>
        Name: <p>{localStorage.getItem("Name")}</p>
      </div>
      {localStorage.getItem("Password") && (
        <div>
          Password: <p>{localStorage.getItem("Password")}</p>
        </div>
      )}
      <div>
        <button onClick={remove}>Remove</button>
        <button onClick={checkDrafts}>checkDrafts</button>
      </div>
    </div>
  );
};
export default LocalStore;
