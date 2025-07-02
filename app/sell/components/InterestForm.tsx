'use client';

import { ComponentPropsWithoutRef, useState, useCallback, useRef } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { createEnquiry } from '@/actions/sellEnquiry';
import { toast } from 'react-toastify';

const apiKey = process.env.GOOGLE_MAPS_API_KEY as string;

const libraries: ('places')[] = ['places'];

// interface AddressAutocompleteProps {
//   apiKey: string;
// }

interface PlaceResult {
  formatted_address: string;
  geometry: {
    location: { lat: () => number; lng: () => number };
  }
}

type InterestFormData = {
  address: string;
  name: string;
  email: string;
  phone: string;
  timeline:
    | 'I want to sell my property now'
    | 'In the next 3 months'
    | 'In the next 12 months'
    | "I'm just curious..."
    | '';
};

interface INewInterest extends ComponentPropsWithoutRef<'div'> {}

const InterestForm = ({ ...rest }: INewInterest) => {
  

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<InterestFormData>({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log('Place selected:', place);

      // Basic validation: Check if geometry and location exist
      if (place.geometry && place.geometry.location) {
        setSelectedPlace({
            formatted_address: place.formatted_address as string,
            geometry: {
                location: {
                    lat: place.geometry.location.lat,
                    lng: place.geometry.location.lng,
                }
            }
            // You can map other needed properties here
        });
        setFormData({
            ...formData,
            address: place.formatted_address!,
        });
      } else {
        console.log("Invalid place selected or details missing.");
        setSelectedPlace(null); // Reset if place is not valid
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }, [autocomplete]);

  
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  },[])

  const handleNext = useCallback(() => {
    setStep((prev) => prev + 1);
    // Check if an address was actually selected from suggestions
    // if (selectedPlace && selectedPlace.formatted_address === formData.address) {
    //     setStep((prev) => prev + 1);
    // } else if (formData.address.trim() !== '') {
    //     // Handle case where user typed address but didn't select suggestion
    //     alert("Please select a valid address from the suggestions.");
    //     // Or allow proceeding, depending on requirements
    //     // setStep((prev) => prev + 1);
    // } else {
    //     alert("Please enter and select an address.");
    // }
 }, [formData.address, selectedPlace]);

 const handleBack = useCallback(() => {
  setStep((prev) => prev - 1);
}, []); // Empty dependency array

const resetAndRefresh = useCallback(() => {
  setStep(1);
  setFormData({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });
  setSelectedPlace(null); // Reset selected place
  if (inputRef.current) {
      inputRef.current.value = ''; // Clear input field
  }
  // Avoid window.location.reload() in React/Next.js unless absolutely necessary
  // Resetting state should be sufficient to reset the form
}, []); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create form data object
    const formData = new FormData(e.currentTarget);
    formData.append('address', selectedPlace?.formatted_address as string);  

    setLoading(true);

    // Mock API call
    try {
      const response = await createEnquiry(formData);

      if(response){
        toast.success('Form submitted successfully! We will contact you shortly')
      }
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
        <div className="flex items-center justify-center p-4 min-h-[100px]">
            <div>Loading Maps...</div>
        </div>
    );
  }

  // Handle error state
  if (loadError) {
    console.error("Google Maps API load error:", loadError);
    return (
        <div className="flex items-center justify-center p-4 min-h-[100px]">
             <div className="text-red-600 bg-red-100 p-3 rounded border border-red-300">
                Error loading Google Maps. Please check the API key and network connection.
             </div>
        </div>
    );
  }

  return (
    <div {...rest} className='flex items-center justify-center p-4'>
      <div className=''>
        <div className=''>
          <div className=''>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className=''>
                  <div className='bg-white flex items-center rounded-full gap-4 p-3'>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={{ types: ['address'], componentRestrictions: { country: ['gb', 'ae', 'ng'] } }}>
                    <input
                      type='text'
                      ref={inputRef}
                      className='p-2 rounded-l-md text-black flex-grow focus:outline-none font-bold'
                      placeholder='Enter your property address...'
                      name='address'
                      onChange={handleChange}
                      value={formData.address}
                    />
                    </Autocomplete>
                    <button
                      type='button'
                      onClick={handleNext}
                      disabled={!formData.address}
                      className='bg-black text-white py-2 px-3 rounded-full cursor-pointer'
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='space-y-4 bg-white p-8 rounded-2xl min-w-lg'>
                  <div>
                  
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='Your Name'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='Your Email'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder='Your phone number'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <select
                      id='timeline'
                      name='timeline'
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    >
                      <option value=''>Select a timeline</option>
                      <option value='I want to sell my property now'>
                        I want to sell my property now
                      </option>
                      <option value='In the next 3 months'>
                        In the next 3 months
                      </option>
                      <option value='In the next 12 months'>
                        In the next 12 months
                      </option>
                      <option value="I'm just curious...">
                        I'm just curious...
                      </option>
                    </select>
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type='button'
                      onClick={handleBack}
                      className='px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={
                        !formData.phone ||
                        !formData.timeline ||
                        !formData.email ||
                        !formData.name
                      }
                      className={`px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              )}

              {
                step === 3 && (
                    <div className='space-y-8 bg-white text-black p-8 rounded-2xl min-w-lg'>
                        <h3 className='font-bold text-3xl'>Thank You For Trusting Us</h3>
                        <p className='text-sm md:text-base'>We will reach out to you for further details.</p>
                        <button onClick={resetAndRefresh} className='bg-black text-white py-2 px-3 rounded-full cursor-pointer'>Get in Touch</button>
                    </div>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InterestForm };
