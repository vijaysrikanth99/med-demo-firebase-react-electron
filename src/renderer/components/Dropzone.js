// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// function Dropzone({ className }) {
//   const onDrop = useCallback((acceptedFiles) => {
//     // Do something with the files
//     console.log(acceptedFiles);
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <form>
//       <h1>Upload File</h1>
//       <div
//         {...getRootProps({
//           className: className,
//         })}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here ...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>
//     </form>
//   );
// }
// export default Dropzone;

// import Image from 'next/image'
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
// import { global } from "styled-jsx/css";

// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const Dropzone = ({ className, folderName }) => {
  // const [files, setFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [logSave, setLogSave] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, `${folderName}/`);

  useEffect(() => {
    console.log("uploadFile", files);
  }, [files]);

  //  intial render
  useEffect(() => {
    // let data = window.localStorage.getItem("savedData");
    // let data = JSON.parse(window.localStorage.getItem("savedData"|| '[]'));
    // console.log("intial render",data)
    // setFiles(...data);
    // working
    // window.electron.ipcRenderer.sendMessage("logs:load");
    // working
    // window.electron.ipcRenderer.on("logs:get", (e, logs) => {
    //   console.log("log", logs);
    // });
  }, []);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  window.electron.ipcRenderer.on("logs:get", async (logs) => {
    try {
      console.log("log", logs);
      setLogSave(logs.files);
      // console.log("e", e);
    } catch (err) {
      console.log(err);
    }
  });

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);

    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    console.log("imgFilelogSave", logSave);
  }, [logSave]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // working
    let data = files;
    // working
    if (!files?.length) return;

    files.map((files) => {
      const imageRef = ref(storage, `${folderName}/${files.name + v4()}`);
      uploadBytes(imageRef, files).then(() => {
        // alert("image Uploaded");
        console.log("image Uploaded");
        setFiles([]);
        setRejected([]);
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageUrls((prev) => [...prev, url]);
            });
          });
        });
      });
    });

    // const formData = new FormData();
    // files.forEach((file) => formData.append("file", file));
    // formData.append("upload_preset", "friendsbook");
    // console.log("formData", formData);

    // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    // const data = await fetch(URL, {
    //   method: "POST",
    //   body: formData,
    // }).then((res) => res.json());

    // let data = "files";
    // console.log("onSave", data);
    // const compressNow = () => {
    // const paths = files.map((f) => f.preview);
    // working
    // const paths = files.map((f) => f.name);
    // working

    // const paths = files.map((f) => f);
    // ipcRenderer.send("image:compress", paths);
    // };
    // working
    // window.electron.ipcRenderer.sendMessage("saveData", paths);
    // working

    // window.electron.send("saveData", data);
    // window.Bridge.saveData(data);

    // window.localStorage.setItem("savedData", data);
    // window.localStorage.setItem("savedData", JSON.stringify( data));
  };

  return (
    <form
      style={{
        height: "100vh",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Stack
        direction="horizontal"
        gap={3}
        // style={{ marginLeft: "40%" }}
      >
        <div>
          <h3 style={{ marginBottom: "300px", color: "white" }}>
            Saved Images
          </h3>
          {imageUrls.map((url) => {
            return (
              <img
                src={url}
                className=" object-contain rounded-md"
                style={{
                  height: "150px",
                  width: "150px",
                  marginRight: "10px",
                  marginTop: "-200px",
                }}
              />
            );
          })}
        </div>
        <div className=" ms-auto" style={{ marginRight: "50px" }}>
          <div
            {...getRootProps({
              className: className,
            })}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-1">
              <ArrowUpTrayIcon
                style={{ height: "100px", width: "100px", marginLeft: "100px" }}
              />

              <i class="bi bi-upload"></i>
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </div>

          {/* Preview */}
          <section className="mt-10">
            <div className="flex gap-4">
              <h4 className="title text-3xl font-semibold">Preview</h4>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={removeAll}
                // className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
              >
                Remove all files
              </Button>
              <Button
                variant="success"
                size="sm"
                style={{ marginLeft: "20px" }}
                type="button"
                // className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>

            {/* Accepted files */}
            <h5 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
              Accepted Files
            </h5>
            <ul
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10"
              style={{ position: "relative" }}
            >
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-32 rounded-md shadow-lg"
                >
                  <img
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="h-full w-full object-contain rounded-md"
                  />
                  <button
                    type="button"
                    // className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => removeFile(file.name)}
                    style={{
                      border: "0",
                      background: "transparent",
                      cursor: "pointer",
                      position: "absolute",
                      // bottom: "0",
                      right: "0",
                      borderRadius: "4px",
                    }}
                  >
                    &times;
                    {/* <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" /> */}
                    {/* <i class="bi bi-x" style={{ color: "red" }}></i> */}
                  </button>
                  <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>

            {/* Rejected Files */}
            <h5 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
              Rejected Files
            </h5>
            <ul className="mt-6 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="mt-2 text-neutral-500 text-sm font-medium">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                  {/* test */}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* {logSave.map((file) => {
        // const newStr = file.replace("blob:", "");
        return (
          <div
          // style={{ height: "100px", width: "100px" }}
          >
            <p>{file}</p>
            <img
              // src={URL.createObjectURL(file)}
              src={file}
              width={100}
              height={100}
              className="object-contain rounded-md"
              // style={{ height: "100px", width: "100px" }}
            />
          </div>
        );
      })} */}
      </Stack>
    </form>
  );
};

export default Dropzone;
