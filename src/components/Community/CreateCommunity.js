import React from "react";

const CreateCommunity = () => {
  return (
    <main className="bg-white mt-24 mx-auto max-w-7xl px-4 py-7 border rounded-md">
      <h1>Create A Community</h1>
      <section className="mt-5">
        <div className="mb-5">
          <h3 className="text-semibold">
            {" "}
            Community Name <span className="text-red-500">*</span>
          </h3>
          <input type="text" placeholder="Community Name" required />
        </div>
        <div>
          <h3>
            {" "}
            Community Profile Image <span className="text-red-500">*</span>
          </h3>
          <input type="file" required />
        </div>
        <div>
          <h3> Community Website</h3>
          <input type="text" placeholder="Community Website" />
        </div>
        <div>
          <h3>
            {" "}
            Community Bio <span className="text-red-500">*</span>
          </h3>
          <textarea
            cols="30"
            rows="10"
            placeholder="Community Bio or Description"
            required
          ></textarea>
        </div>
        <button>Create Community</button>
      </section>
    </main>
  );
};

export default CreateCommunity;
