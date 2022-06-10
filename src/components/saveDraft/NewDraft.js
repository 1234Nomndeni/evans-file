import React from "react";

const NewDraft = () => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("myNames", JSON.stringify({ name, gender }));
  }, [name, gender]);

  const handleSubmit = () => {
    localStorage.setItem({
      name: name,
      gender: gender,
    });
  };
  return (
    <div className="pt-24 h-screen bg-yellow-200">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        value={gender}
        placeholder="gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewDraft;
