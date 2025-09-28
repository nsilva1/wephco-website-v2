import { IApiErrorResponse } from "@/interfaces/appInterface";
import axios, { AxiosError } from "axios";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { upload } from "@vercel/blob/client";


export const formatCurrency = (number: number, currencyCode = 'USD', locale = 'en-US'): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      }).format(number);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return number.toLocaleString(locale, { maximumFractionDigits: 2 }); // Fallback to basic number formatting
    }
}

// export const scrollTo = (targetId: string) => {
//   const targetElement = document.getElementById(targetId)

//   if(targetElement){
//     targetElement.scrollIntoView({behavior:'smooth'})
//   }
// }

export const handleError = (error: unknown) => {
  let errorMessage = 'Failed to create enquiry. An unexpected error occurred.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<Partial<IApiErrorResponse>>; 
      if (axiosError.response) {
        // Server responded with an error status code (4xx, 5xx)
        const serverErrorData = axiosError.response.data;
        const serverMessage = serverErrorData?.message || serverErrorData?.error;

        errorMessage = `Failed to create enquiry (status ${axiosError.response.status})${serverMessage ? `: ${serverMessage}` : '.'}`;
        // You could log the full error response for debugging if needed
        // console.error('Server error response:', axiosError.response.data);
      } else if (axiosError.request) {
        // Request was made but no response received (e.g., network error, CORS issue in browser)
        errorMessage = 'Failed to create enquiry: No response from server. Check network connection or API availability.';
      } else {
        // Something else happened in setting up the request that triggered an Error
        errorMessage = `Failed to create enquiry: ${axiosError.message}`;
      }
    } else if (error instanceof Error) {
      // Non-Axios error
      errorMessage = `Failed to create enquiry: ${error.message}`;
    }

    // For debugging purposes, you might want to log the original error
    console.error('createPropertyEnquiryRequest error:', error);

    return errorMessage;
}

export const generateId = (characterLength: number = 16): string => {
  return nanoid(characterLength)
}

/**
 * Uploads an image to Vercel Blob storage and returns the public URL
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} The public URL of the uploaded image
 * @throws {Error} With detailed error message if upload fails
 */
export const uploadImage = async (file: File, callback: any) => {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }

  const id = generateId()
  const filePath = `${id}-${file.name}`
  

  try {
    const blobUrl = await upload(filePath, file, {
    access: 'public',
    handleUploadUrl: "/api/upload",
    onUploadProgress: (progressEvent) => {
      callback(progressEvent.percentage)
    }
  })

  console.log(blobUrl)
  return blobUrl
  } catch (error) {
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('token')) {
        throw new Error('Server configuration error - please check your BLOB_READ_WRITE_TOKEN');
      }
      if (error.message.includes('size')) {
        throw new Error('File size too large - maximum size is 4.5MB');
      }
    }

    throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}



export const uploadPDF = async (file: File): Promise<string> => {
  const id = generateId()
  try {
    var fileName = `${file.name}-${id}`

    if(!fileName.toLowerCase().endsWith('.pdf')){
      fileName += '.pdf'
    }

    const blob = await put(fileName, file, {
      access: 'public',
      contentType: 'application/pdf',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    return blob.url
  } catch (error) {
    throw new Error('Failed to upload PDF')
  }
}


export const convertBlobUrlToFile = async (blobUrl: string) => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  const fileName = Math.random().toString(36).slice(2, 9)
  const mimeType = blob.type || "application/octet-stream"
  const file = new File([blob], `${fileName}.${mimeType.split('/')[1]}`, { type: mimeType });

  return file;
}

export const checkAuthenticationCode = (code?: string): boolean => {
  if (!code) {
    return false;
  }
  const authCode1 = process.env.NEXT_PUBLIC_AUTH_CODE1?.toLowerCase();
  const authCode2 = process.env.NEXT_PUBLIC_AUTH_CODE2?.toLowerCase();
  if (!authCode1 || !authCode2) {
    throw new Error('Authentication codes are not set in environment variables');
  }
  return code === authCode1 || code === authCode2;
}

export const getInitials = (fullName: string): string => {
  
  if (typeof fullName !== 'string' || fullName.trim() === '') {
    return '';
  }

  const nameParts = fullName.trim().split(/\s+/);
  const firstLetters = nameParts.map(part => part[0]);

  return firstLetters.join('').toUpperCase();
}

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
}