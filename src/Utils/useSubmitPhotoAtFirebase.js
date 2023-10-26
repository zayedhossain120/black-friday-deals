import { useState } from "react";
import getOrganizedFileName from "./getOrganizedFileName";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.init";

const useSubmitPhotoAtFirebase = () => {
  const [progress, setProgress] = useState(0);

  const postPhotoAtFirebase = (file) => {
    return new Promise((resolve, reject) => {
      const fileName = getOrganizedFileName(file);
      const storageRef = ref(storage, `/stores/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });
  };

  return { postPhotoAtFirebase, progress };
};

export default useSubmitPhotoAtFirebase;
