import { PropertyCardProps } from "@/components/PropertyCard"

export const navbarMenu = [
    {
        label:'Buy',
        path: '/buy'
    },
    {
        label:'Sell',
        path: '/sell'
    },
    {
        label: 'Agents',
        path: '/agents'
    }
]

export const sampleProperties: PropertyCardProps[] = [
    {
        imageURL: '/images/property1.jpg',
        price: 1200000,
        location: '1234 Elm Street',
        currency: 'USD',
        beds: 3,
        baths: 2,
        sqft: 2000
    },
    {
        imageURL: '/images/property2.jpg',
        price: 45000000,
        location: '40 Accra Street',
        currency: 'NGN',
        beds: 4,
        baths: 3,
        sqft: 2500
    },
    {
        imageURL: '/images/property3.jpg',
        price: 1800000,
        location: '91011 Oak Street',
        currency: 'USD',
        beds: 5,
        baths: 4,
        sqft: 3000
    },
    // {
    //     imageURL: '/images/property4.jpg',
    //     price: 900000,
    //     location: '5678 Maple Street',
    //     currency: 'USD',
    //     beds: 2,
    //     baths: 1,
    //     sqft: 1500
    // },
    // {
    //     imageURL: '/images/property5.jpg',
    //     price: 2000000,
    //     location: '1314 Pine Street',
    //     currency: 'USD',
    //     beds: 4,
    //     baths: 3,
    //     sqft: 2500
    // },
    // {
    //     imageURL: '/images/property6.jpg',
    //     price: 3000000,
    //     location: '1516 Cedar Street',
    //     currency: 'USD',
    //     beds: 5,
    //     baths: 4,
    //     sqft: 3500
    // }
]