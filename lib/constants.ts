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
import acquisitionConsultation from '@/images/acquisition-consultation.jpg'
import internatinalPropertyBrokerage from '@/images/international-property-brokerage.jpg'
import dealPreparation from '@/images/deal-preparation-coaching.jpg'
import investorCircle from '@/images/investor-circle-access.jpg'
import legacyWealth from '@/images/legacy-wealth-structuring.jpg'
import privateRealEstate from '@/images/private-real-estate-advisory.jpg'


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
    // {
    //     label: 'Projects',
    //     path: '/projects'
    // }
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
        label: 'Property Enquiries',
        icon: BiBuildings,
        path: '/dashboard/property-enquiry'
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

export const faqData = [
  {
    question: "Is Wephco a real estate company?",
    answer:
      "No, Wephco is a brokerage firm which positions us as an intermediary between the owner of the property and the buyer. We also have services such as property management.",
  },
  {
    question: "Does Wephco accept partnerships?",
    answer: "Most definitely!! We encourage and welcome partnerships.",
  },
  {
    question: "What is Wephco affiliate program?",
    answer:
      "It's a referral system that allows you to earn when a client purchases a property via your referral, all you have to do is book an appointment and we will take it from there.",
  },
  {
    question: "Are there extra costs apart from the price of the property?",
    answer: "No, there's no hidden charges or extra costs.",
  },
]


export const wephcoServices = [
    {
        image: internatinalPropertyBrokerage,
        title: 'International Property Brokerage',
        description: 'We connect African and global investors with high-value properties in prime markets such as the UAE, UK, Monaco, USA, Turkey, Australia, and Africa. Whether acquiring luxury residences, investment apartments, or commercial assets, we offer access to opportunities rarely available on the open market.'
    },
    {
        image: acquisitionConsultation,
        title: 'Acquisition Consultation',
        description: 'Every investor has a unique vision. Wephco provides tailored advisory sessions to align acquisitions with your long-term objectives — whether wealth preservation, portfolio diversification, or family legacy planning'
    },
    {
        image: dealPreparation,
        title: 'Deal Preparation & Coaching',
        description: 'We guide our clients through the complexities of international property transactions — from negotiations and legal compliance to financing structures. Our coaching ensures confidence and clarity in every deal.'
    },
    {
        image: privateRealEstate,
        title: 'Private Real Estate Advisory',
        description: 'Designed for ultra-high-net-worth individuals, our private advisory service offers discreet solutions for cross-border investments, residency-linked acquisitions, offshore holdings, and intergenerational wealth transfer'
    },
    {
        image: investorCircle,
        title: 'Investor Circle Access',
        description: 'Wephco clients enjoy membership in an exclusive circle where premium opportunities are shared ahead of the market. This ensures first-mover advantage on rare and highly profitable investments'
    },
    {
        image: legacyWealth,
        title: 'Legacy & Wealth Structuring',
        description: 'Beyond acquisitions, we help investors structure real estate holdings in alignment with long-term goals — securing family security, estate planning, and generational influence'
    }
]