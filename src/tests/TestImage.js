import React, { useEffect, useRef, useState } from "react";

const TestImage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  const pickedImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <main className="h-screen pt-28">
      <div>
        {error && <p className="text-red-500">File Not Supported</p>}
        <div
          className="w-72 h-72"
          style={{
            background: imagePreview
              ? `url("${imagePreview}") no-repeat center/cover`
              : "#131313",
          }}
        >
          {!imagePreview && (
            <>
              <p className="text-yellow-300">Add Image</p>
              <label
                onClick={pickedImageHandler}
                className="text-yellow-300"
                htmlFor="fileUpload"
              >
                Choose File
              </label>
              <input
                className="hidden"
                type="file"
                onChange={handleImageChange}
              />
            </>
          )}
        </div>
        {imagePreview && (
          <button onClick={() => setImagePreview(null)}>Remove Image</button>
        )}
      </div>
    </main>
  );
};

export default TestImage;
