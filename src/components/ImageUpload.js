import React, { useState, useRef, useEffect } from 'react'
import { PhotographIcon } from '@heroicons/react/outline'

const ImageUpload = (props) => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }

        fileReader.readAsDataURL(file)

    }, [file])

    const pickedHandler = (event) => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile);
            // props.setData((prev) => {
            //     return {...prev,image:pickedFile}
            // })
        }
    }

    const pickedImageHandler = () => {
        filePickerRef.current.click()
    }



    return (
        <div className="">
            <input id={props.id} ref={filePickerRef} onChange={pickedHandler} type="file" accept=".jpg, .png, .jpeg" className="hidden" />
            <div className={`flex flex-wrap ${props.center && "w-10"}`}>
                <div>
                    {previewUrl && <img className="rounded-lg w-96 h-52" src={previewUrl} alt={previewUrl} />}

                    {!previewUrl && (
                        <div onClick={pickedImageHandler} className="flex items-center cursor-pointer bg-gray-100 p-2 w-48 rounded-md hover:bg-green-100">
                            <PhotographIcon className="w-8 h-8 text-gray-400" />
                            <p className="ml-3 text-gray-400 font-bold text-xl">Cover Image</p>
                        </div>
                    )}

                </div>
                {/* Edit existing image */}
                <div className="ml-16">
                    {previewUrl && (
                        <div>
                            <button className="cursor-pointer text-500 border-gray-300 border-2 bg-gray-100 p-2 w-32 text-center rounded-md hover:bg-blue-100" type="button" onClick={pickedImageHandler}>
                                <h3>Change</h3>
                            </button> <br /><br /><br />

                            <button className=" cursor-pointer text-red-500 border-red-300 border-2 bg-gray-100 p-2 w-32 text-center rounded-md hover:bg-green-100" type="button" onClick={pickedImageHandler}>
                                <h3>Remove</h3>
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageUpload
