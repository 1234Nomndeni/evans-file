import React, { useState, useEffect, useRef } from "react";

const BackgroundImage = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  function pickedHandler(e) {
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];

      // console.log("Picked File: ", pickedFile);

      setFile(pickedFile);

      props.setBackgroundImage(pickedFile);

      // props.setBackgroundImage((prev) => {
      //   return { ...prev, backgroundImage: pickedFile };
      // });
    }
  }

  function pickedImageHandler() {
    filePickerRef.current.click();
  }
  function removeImage() {}

  return (
    <div>
      <>
        <input
          id={props.id}
          ref={filePickerRef}
          className="hidden"
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={pickedHandler}
        />

        <div className="">
          <div className=" items-center">
            {previewUrl && (
              <img
                className="w-80 h-44 rounded-md border-2 border-purple-300"
                src={previewUrl}
                alt="background_image"
              />
            )}
            {!previewUrl && (
              <div>
                <span
                  className="bg-purple-800 hover:bg-purple-900 cursor-pointer px-5 py-3 rounded-md text-white "
                  onClick={pickedImageHandler}
                >
                  + Add Image
                </span>
              </div>
            )}
          </div>
          <div>
            {previewUrl && (
              <div className="mt-5 flex flex-wrap justify-between">
                <span
                  className="bg-purple-800 hover:bg-purple-900 cursor-pointer px-3 py-2 rounded-md text-sm text-white "
                  onClick={pickedImageHandler}
                >
                  Replace Image
                </span>
                <span
                  className="bg-red-600 hover:bg-red-500 cursor-pointer px-3 py-2 rounded-md text-white "
                  onClick={removeImage}
                >
                  Remove Image
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default BackgroundImage;
