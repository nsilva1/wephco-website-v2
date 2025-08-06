import axios from "axios";

export const getAllCountries = async (): Promise<{label: string, value: string}[]> => {
    const options = {
  method: 'GET',
  url: 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries',
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
  }
};

try {
    const response = await axios.request(options);
    const countryData = response.data;
    const countries = countryData.map((country: any) => {
        return {
            label: country.name,
            value: country.isoCode
        }
    })
    return countries;
} catch (error) {
    console.error("Error fetching list of countries:", error);
    throw error;
}
}

export const getCitiesByCountry = async (countryCode: string): Promise<{label: string, value:string}[]> => {
    const options = {
  method: 'GET',
  url: 'https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode',
  params: {countrycode: countryCode},
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
  }
};

try {
	const response = await axios.request(options);
    const cityData = response.data;
    const cities = cityData.map((city: any) => {
        return {
            label: city.name,
            value: city.name
        }
    })
    return cities;
} catch (error) {
	console.error("Error fetching list of cities:", error);
    throw error;
}
}