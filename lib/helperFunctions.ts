import { IApiErrorResponse } from "@/interfaces/appInterface";
import axios, { AxiosError } from "axios";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";


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

export const scrollTo = (targetId: string) => {
  const targetElement = document.getElementById(targetId)

  if(targetElement){
    targetElement.scrollIntoView({behavior:'smooth'})

    // const headerOffset = 80;
    // const elementPosition = targetElement.getBoundingClientRect().top;
    // const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    // window.scrollTo({
    //   top: offsetPosition,
    //   behavior: 'smooth'
    // })
  }
}

export const handleError = (error: unknown) => {
  let errorMessage = 'Failed to create enquiry. An unexpected error occurred.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<Partial<IApiErrorResponse>>; // Type assertion for error.response.data
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

export const uploadImage = async (file: File): Promise<string> => {
  const id = generateId()
  try {
    const fileName = `${file.name}-${id}`
    const blob = await put(fileName, file, {
    access: 'public'
  })

  return blob.url
  } catch (error) {
    throw new Error('Failed to upload image')
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
      contentType: 'application/pdf'
    })

    return blob.url
  } catch (error) {
    throw new Error('Failed to upload PDF')
  }
}