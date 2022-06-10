import { useNavigate } from "react-router-dom";

const MyDrafts = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen mt-20 md:mt-24 mx-wd1 mx-auto p-0 md:p-5 ">
      <h1>Hello, No saved draft</h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-purple-500 text-white py-2 px-2"
      >
        Go Back to dashboard
      </button>
    </main>
  );
};

export default MyDrafts;
