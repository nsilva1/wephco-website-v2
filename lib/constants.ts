// import { PropertyCardProps } from "@/components/PropertyCard"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";
import wellahealth from '@/images/wellahealth.svg'
import aldar from '@/images/aldar.png'
import damac from '@/images/damac.svg'
import sober from '@/images/sober.png'
import aarano from '@/images/aarano.png'
import { MdDashboard, MdSettings, MdHandshake } from "react-icons/md";
import { BiBuildings, BiHeadphone } from "react-icons/bi";
import { BsPeopleFill, BsPersonFillGear } from "react-icons/bs";
import { Role } from "@/interfaces/userInterface";


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
        label: 'Affiliates',
        path: '/affiliates'
    },
    {
        label: 'About Us',
        path: '/about'
    },
    {
        label: 'Services',
        path: '/services'
    }
]


export const newsArticles = [
    {
        publication: 'News Dairy',
        title: 'Wephco signs property partnership deal in Abu Dhabi',
        link: 'https://newsdiaryonline.com/wephco-signs-property-partnership-deal-in-abu-dhabi'
    },
    {
        publication: 'Leadership',
        title: 'Firm Woos Nigerians To Invest In Abu Dhabi Real Estate Sector',
        link: 'https://leadership.ng/firm-woos-nigerians-to-invest-in-abu-dhabi-real-estate-sector'
    },
    {
        publication: 'Daily Trust',
        title: 'Firm woos Nigerian investors to Abu Dhabi property',
        link: 'https://dailytrust.com/firm-woos-nigerian-investors-to-abu-dhabi-property/'
    },
    {
        publication: 'Freedom Online',
        title: 'Estate coy partners UAE govt. to promote investments abroad',
        link: 'https://freedomonline.com.ng/estate-coy-partners-uae-govt-to-promote-investments-abroad/?amp=1'
    },
    {
        publication: 'Blueprint',
        title: 'Firm urges Nigerians to invest in Abu Dhabi real sector',
        link: 'https://blueprint.ng/firm-urges-nigerians-to-invest-in-abu-dhabi-real-sector/'
    }
]

export const socialLinks = [
    {
        icon: FaFacebookF,
        link: 'https://www.facebook.com/wephco'
    },
    {
        icon: FaInstagram,
        link: 'https://www.instagram.com/wephco/'
    },
    {
        icon: FaXTwitter,
        link: 'https://x.com/wephco'
    },
    {
        icon: FaLinkedinIn,
        link: 'https://www.linkedin.com/wephco'
    }
]

export const partners = [
    {
        title: 'Wellahealth',
        image: wellahealth
    },
    {
        title: 'Aldar',
        image: aldar
    },
    {
        title: 'Damac',
        image: damac
    },
    {
        title: 'Sober',
        image: sober
    },
    {
        title: 'AA Rano',
        image: aarano
    },
]

export const dashboardMenu = [
    {
        label: 'Dashboard',
        icon: MdDashboard,
        path: '/dashboard'
    },
    {
        label: 'Properties',
        icon: BiBuildings,
        path: '/dashboard/properties'
    },
    {
        label: 'Support Requests',
        icon: BiHeadphone,
        path: '/dashboard/requests'
    },
    {
        label: 'Consultations',
        icon: MdHandshake,
        path: '/dashboard/consultations'
    },
    {
        label: 'Affiliates',
        icon: BsPeopleFill,
        path: '/dashboard/affiliates'
    },
    {
        label: 'Settings',
        icon: MdSettings,
        path: '/dashboard/settings'
    },
    {
        label: 'Profile',
        icon: BsPersonFillGear,
        path: '/dashboard/profile'
    },
]

export const allowedRoles = [Role.ADMIN, Role.SUPERADMIN, Role.SUPPORT]