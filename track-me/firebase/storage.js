//import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadPhotoAsync(uri, filename) {
  return new Promise( async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();

    let upload = storage().ref(filename).put(file);

    upload.on(
      "state_changed",
      snapshot => {},
      err => {
        rej(err);
      }, 
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        res(url); 
      }
    );
  });
}


// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://ashfry-track-me.appspot.com";
 
// Uploads image and returns the storage bucket
export async function uploadImage(image, uid) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
  await uploadBytes(ref(storage, bucket), image);
  return bucket;
}

// Replaces existing image in storage and returns the storage bucket
export async function replaceImage(image, bucket) {
  await uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export async function deleteImage(bucket) {
  await deleteObject(ref(storage, bucket));
}

/*
// Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}
*/