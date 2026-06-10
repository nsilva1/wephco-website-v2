import { storage } from '@/firebase/firebaseClient';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export interface PutBlobResult {
  url: string;
}

export const uploadFile = async (id: string, file: File, callback: any): Promise<PutBlobResult> => {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }
  
  const fileRef = ref(storage, `blog/${id}-${file.name}`);
  const uploadTask = uploadBytesResumable(fileRef, file);
  
  return new Promise<PutBlobResult>((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        callback(progress);
      }, 
      (error) => {
        reject(new Error(`File upload failed: ${error.message}`));
      }, 
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url: downloadURL });
        } catch (error: any) {
          reject(new Error(`Failed to retrieve download URL: ${error.message}`));
        }
      }
    );
  });
};