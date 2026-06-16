import { EventItem } from './_components/EventCard';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-001',
    title: 'Eko Atlantic Penthouse Private Showcase',
    description: 'An exclusive, by-invitation-only viewing of Eko Atlantic’s most coveted off-market sky-penthouses. Meet the lead developers and architects over private dinner.',
    longDescription: 'Experience real estate in its purest luxury form. Wephco hosts an exclusive walk-through of the newly constructed offshore sky penthouses at Eko Atlantic. Guests will be treated to a private cocktail session, live 3D walkthroughs of customization architectures, and a three-course dinner during which off-market inventory terms and reservation contracts will be presented by lead development firms.',
    date: 'July 18, 2026',
    time: '6:00 PM WAT',
    location: 'Eko Atlantic Sky Residences, Lagos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3__jIO7Q6O8B4hGtEX2zv6aFO73APne6N5KPQiuAllL8trjOLsz4OmTMfTLsmgMkzgSFmnmmRrPfx-xuP1vZNL3sEW9Ar3g1RzOEuiLC5yD7uFOLEC5Cv3K60Ub8HXvwmX9GJZ3n8HQ2qlYkDsQ3aUElmYPKTJbE_4J0O5E1adCvVRjgbLhQBqa0IX7Lk7N5bikYezOw6enyf8flmujdmNLktGrms-ldkrGE_KmDlmUFoWYLl9Aqm7L4Yja7BmfmgtaGBL5xlcb7B',
    scope: 'Local',
    format: 'Physical',
    seatsRemaining: 6,
    isPast: false,
    highlights: [
      'Private viewing of exclusive off-market 4 & 5 bedroom penthouses.',
      'One-on-one sessions with primary structural architects.',
      'Complimentary multi-course dinner & premium wine pairing.',
      'Flexible offshore payment structures available exclusively for attendees.'
    ],
    agenda: [
      { time: '06:00 PM', title: 'Arrival & Welcome Cocktails', description: 'Champagne reception and networking at the Sky Residence Lounge.' },
      { time: '06:45 PM', title: 'Guided Architectural Showcase', description: 'Walkthrough of key penthouses and custom interior portfolios.' },
      { time: '07:30 PM', title: 'Private Dinner & Presentation', description: 'A gourmet dining experience paired with detailed asset overview.' },
      { time: '09:00 PM', title: 'Advisory & Reservation Sessions', description: 'Private contract discussions and property reservation clearances.' }
    ],
    hosts: [
      {
        name: 'Chief Adeniyi Silva',
        role: 'Managing Partner, Wephco Realty',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnWWMvGDO8XiXmd3uCP32omitlZfNgPFYXbNs3kwFH8OFtfi2Gfd_74HdszXXxGc620fD4kbLREt_K5iBOYms2V2gZe6-hg465Xuy9j6BcRVuPmIGlRkO45eccd4e_mbCx4ak-oqMgBjlcC7fQqBRkc4s9L_u4c163FdXeID7-0ZNsr8Kva14ZMPVEIbvo40lHdXG1gjUOoIssHZnoEtA5gUZyotIivbPaWK3sTagFLTw_AJxFK-V-MrpP7wKh3VZ6tAnD03IiI97u'
      },
      {
        name: 'Sarah Jenkins',
        role: 'Lead Architect, Atlantic Residences',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFf3jl_t3xv9uf7QoVeZCBv0qVy4Yae8DTwwKm3mQfhuBajacGmVuPfKyoRoi3KIWpNYYCCqkYBxweEUwMOC6EkwJ6t4x7KRmg4OrdOuRp3tb_4Tq582UgYI_VWixFvyL9Oum2-XSqlsMnY723y4kIVg-P5QVhVtQIh0Cc-UrnX5rW2sO0C2SrW75srz-rFv838-liLuhqab7uIhcsxAevSd8L6wk1IvV9OAzDMnmy74QFX6dBqttj-_XqscQwHnzCA7Ix9zBI_bC'
      }
    ]
  },
  {
    id: 'evt-002',
    title: 'Dubai Marina Luxury Roadshow',
    description: 'Immersive investment roundtable highlighting high-yield off-market duplexes in Dubai Marina and Palm Jumeirah. Includes private one-on-one portfolio consulting.',
    longDescription: 'Wephco’s legendary international roadshow makes its stop at the Dubai Marina. This exclusive gathering is configured to highlight high-yield off-market developments in Dubai’s premier communities. Participants will receive dedicated intelligence briefs outlining residency acquisition policies, fractional corporate taxes, and secondary currency protection strategies.',
    date: 'August 12, 2026',
    time: '11:00 AM GST',
    location: 'The Ritz-Carlton, Dubai Marina',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCggR4STnpUKYvKcmOgBv7THHB1NiiT36GQW7sPLPZdgS5ZAiO8rvcmHVkRr_e9ocDgcQjklSv4F5oHkjWUiegd4cRULtvabEATKG_5Kjxj4f1bPARau0zMbNFsmrU17jQqG8nGHyisrf1q935Fp49we0l8wBDh4yYooUPX4fcGZvX6dFBS5lmhPAFGbU8VwAAXhOr4B-uS50qANQbw0QRTFoECeWeSGTUkVuKmRV-s4tAjwjdWb-uIdccu4mVcNv-SWJeggRukgijh',
    scope: 'International',
    format: 'Physical',
    seatsRemaining: 12,
    isPast: false,
    highlights: [
      'In-depth review of luxury duplexes with guaranteed rental yields.',
      'Overview of Golden Visa & residency acquisition protocols.',
      'Tax optimization and secondary offshore assets strategies.',
      'Limited secondary market placements under developer cost.'
    ],
    agenda: [
      { time: '11:00 AM', title: 'Morning Portfolios Review', description: 'Initial introductions and high-level market statistics outline.' },
      { time: '12:00 PM', title: 'Golden Visa & Tax Seminar', description: 'Briefing on the legal frameworks for Dubai residency & tax protections.' },
      { time: '01:30 PM', title: 'VIP Networking Lunch', description: 'Informal discussions with Dubai asset managers over lunch.' },
      { time: '03:00 PM', title: 'One-on-One Wealth Structuring', description: 'Individual consultations to match specific investor criteria.' }
    ],
    hosts: [
      {
        name: 'Tariq Al-Mansoor',
        role: 'Director of Middle East Markets, Wephco',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiYgl6z_tCyRQO2aZHFj_dfmPmGbYm_40xlssUe7r1hmCqPNxbl06neTpcT9QqrwjkkTlp2mEIW2Zy2nI8WSzbfsCDY1OHKfzdCJMXbi2HjSc2Gz502sBr6pJkaUQmli4WOFe4DrKIz_6-Z30w-fYOpj_OqGg3X-oDRKjTSOVGf5CxzzNCGqmyGZ6i_G4ll0MpS_N23x1rQlXQ0_gXNItquXFtWztc6MMVepVmBiNGguwnSj5H5Ge2_1VyF_1SYPcx-hoPuDFbH9XY'
      }
    ]
  },
  {
    id: 'evt-003',
    title: 'Virtual 3D Tour: Cape Town Coastal Villa',
    description: 'Join our digital concierge for a live, highly detailed 3D walkthrough of a private oceanside sanctuary in Clifton, Cape Town. Live Q&A with luxury asset managers.',
    longDescription: 'For global investors who prefer digital convenience, Wephco presents a live, ultra-high-definition interactive walkthrough of our Clifton Sanctuary in Cape Town. Using immersive, customized 3D spatial tech, you can examine structural integrity, finishes, and panoramic ocean lines. A real-time Q&A will be hosted by local asset managers.',
    date: 'July 29, 2026',
    time: '2:00 PM GMT',
    location: 'Wephco Virtual Immersive Platform (Zoom VIP)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8RBsFfm0ZMilxQ_z1S4xE3x0JVqynPAOH9_OYqualxAWi3ecsTuegrcbQ1bN2kSiw7axmDVVJjwHHUWEhcjIGNq788GU0IzFVC9rto7eRQCujQutAHaCIU4YyDAp0ZjPYptPG1pRBjVXhEJsltmYUULYp_KCsrDsmZL-8F6mRA92GehgJOhSk3eFXZDapk_Aawz-fd-51P6jG2cZ9d4JfKId-bk17eTweg2_yVxl3WxNjzXBt2zE-F8UbE793mGE0Ca7aZf4PlNwT',
    scope: 'International',
    format: 'Virtual',
    seatsRemaining: 45,
    isPast: false,
    highlights: [
      'High-fidelity interactive 3D spatial camera walkthrough.',
      'Live drone view of the Clifton coastline context.',
      'Valuation breakdown and market comparative sheets.',
      'Q&A panel addressing property management structures.'
    ],
    agenda: [
      { time: '02:00 PM', title: 'Digital Broadcast Kickoff', description: 'Introduction to Wephco’s Cape Town luxury portfolio.' },
      { time: '02:15 PM', title: 'Immersive Spatial Walkthrough', description: 'Live virtual navigation through Clifton beachside villa.' },
      { time: '02:45 PM', title: 'Market Integration & Yields', description: 'Reviewing historical capital appreciation and short-let averages.' },
      { time: '03:15 PM', title: 'Interactive Q&A Session', description: 'Answering questions regarding management, operations, and transfer.' }
    ],
    hosts: [
      {
        name: 'Elena Rostova',
        role: 'Head of Global Concierge Services',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFf3jl_t3xv9uf7QoVeZCBv0qVy4Yae8DTwwKm3mQfhuBajacGmVuPfKyoRoi3KIWpNYYCCqkYBxweEUwMOC6EkwJ6t4x7KRmg4OrdOuRp3tb_4Tq582UgYI_VWixFvyL9Oum2-XSqlsMnY723y4kIVg-P5QVhVtQIh0Cc-UrnX5rW2sO0C2SrW75srz-rFv838-liLuhqab7uIhcsxAevSd8L6wk1IvV9OAzDMnmy74QFX6dBqttj-_XqscQwHnzCA7Ix9zBI_bC'
      }
    ]
  },
  {
    id: 'evt-004',
    title: 'Mayfair London Real Estate Exhibition',
    description: 'Wephco’s premier European showcase exhibiting ultra-luxury residential assets across Mayfair, Belgravia, and Knightsbridge, London. Completed with exceptional investor turnouts.',
    longDescription: 'Completed in early 2026, Wephco’s Mayfair Showcase connected high-net-worth African investors with premium central London residential assets. The three-day exhibition at The Connaught secured several transactions, confirming Wephco’s capacity to source off-market placements in highly competitive global climates.',
    date: 'May 04, 2026',
    time: '10:00 AM BST',
    location: 'The Connaught Hotel, Mayfair, London',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFf3jl_t3xv9uf7QoVeZCBv0qVy4Yae8DTwwKm3mQfhuBajacGmVuPfKyoRoi3KIWpNYYCCqkYBxweEUwMOC6EkwJ6t4x7KRmg4OrdOuRp3tb_4Tq582UgYI_VWixFvyL9Oum2-XSqlsMnY723y4kIVg-P5QVhVtQIh0Cc-UrnX5rW2sO0C2SrW75srz-rFv838-liLuhqab7uIhcsxAevSd8L6wk1IvV9OAzDMnmy74QFX6dBqttj-_XqscQwHnzCA7Ix9zBI_bC',
    scope: 'International',
    format: 'Physical',
    isPast: true,
    highlights: [
      'Exhibited Belgravia and Mayfair luxury townhouses.',
      'Tax & citizenship structuring specialists panels.',
      'Sovereign asset security advisory desks.',
      'Over £45M in transactions initiated during the exhibition.'
    ],
    agenda: [],
    hosts: [
      {
        name: 'Chief Adeniyi Silva',
        role: 'Managing Partner, Wephco Realty',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnWWMvGDO8XiXmd3uCP32omitlZfNgPFYXbNs3kwFH8OFtfi2Gfd_74HdszXXxGc620fD4kbLREt_K5iBOYms2V2gZe6-hg465Xuy9j6BcRVuPmIGlRkO45eccd4e_mbCx4ak-oqMgBjlcC7fQqBRkc4s9L_u4c163FdXeID7-0ZNsr8Kva14ZMPVEIbvo40lHdXG1gjUOoIssHZnoEtA5gUZyotIivbPaWK3sTagFLTw_AJxFK-V-MrpP7wKh3VZ6tAnD03IiI97u'
      }
    ],
    hasGallery: true,
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3__jIO7Q6O8B4hGtEX2zv6aFO73APne6N5KPQiuAllL8trjOLsz4OmTMfTLsmgMkzgSFmnmmRrPfx-xuP1vZNL3sEW9Ar3g1RzOEuiLC5yD7uFOLEC5Cv3K60Ub8HXvwmX9GJZ3n8HQ2qlYkDsQ3aUElmYPKTJbE_4J0O5E1adCvVRjgbLhQBqa0IX7Lk7N5bikYezOw6enyf8flmujdmNLktGrms-ldkrGE_KmDlmUFoWYLl9Aqm7L4Yja7BmfmgtaGBL5xlcb7B',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCggR4STnpUKYvKcmOgBv7THHB1NiiT36GQW7sPLPZdgS5ZAiO8rvcmHVkRr_e9ocDgcQjklSv4F5oHkjWUiegd4cRULtvabEATKG_5Kjxj4f1bPARau0zMbNFsmrU17jQqG8nGHyisrf1q935Fp49we0l8wBDh4yYooUPX4fcGZvX6dFBS5lmhPAFGbU8VwAAXhOr4B-uS50qANQbw0QRTFoECeWeSGTUkVuKmRV-s4tAjwjdWb-uIdccu4mVcNv-SWJeggRukgijh',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8RBsFfm0ZMilxQ_z1S4xE3x0JVqynPAOH9_OYqualxAWi3ecsTuegrcbQ1bN2kSiw7axmDVVJjwHHUWEhcjIGNq788GU0IzFVC9rto7eRQCujQutAHaCIU4YyDAp0ZjPYptPG1pRBjVXhEJsltmYUULYp_KCsrDsmZL-8F6mRA92GehgJOhSk3eFXZDapk_Aawz-fd-51P6jG2cZ9d4JfKId-bk17eTweg2_yVxl3WxNjzXBt2zE-F8UbE793mGE0Ca7aZf4PlNwT',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFf3jl_t3xv9uf7QoVeZCBv0qVy4Yae8DTwwKm3mQfhuBajacGmVuPfKyoRoi3KIWpNYYCCqkYBxweEUwMOC6EkwJ6t4x7KRmg4OrdOuRp3tb_4Tq582UgYI_VWixFvyL9Oum2-XSqlsMnY723y4kIVg-P5QVhVtQIh0Cc-UrnX5rW2sO0C2SrW75srz-rFv838-liLuhqab7uIhcsxAevSd8L6wk1IvV9OAzDMnmy74QFX6dBqttj-_XqscQwHnzCA7Ix9zBI_bC',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOLGUwyUhxm-nLIji8OosXtupLJ3ECjoz5IZVmbj7-AfMy8MPcNvFChsrbZa_kdRxdCUMhD1XmRM7Ee2NCNozx_55eRUVUkcidxHhboEGzTyte8fyYSyaYNz4H9kmCcpfuzNFdpRidlqaKcFXbONMrbPVxWIXky9ES9gBt3CrR9WLUBGKZu-3oeIaPTz3OPZmVjJELjqKd7T3AooE8RSuFNsKfmC28wGg-tlE2STmXEG-eydvL1jT1xKLj4zcWQe9siVO4Id_JXc_c',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCggR4STnpUKYvKcmOgBv7THHB1NiiT36GQW7sPLPZdgS5ZAiO8rvcmHVkRr_e9ocDgcQjklSv4F5oHkjWUiegd4cRULtvabEATKG_5Kjxj4f1bPARau0zMbNFsmrU17jQqG8nGHyisrf1q935Fp49we0l8wBDh4yYooUPX4fcGZvX6dFBS5lmhPAFGbU8VwAAXhOr4B-uS50qANQbw0QRTFoECeWeSGTUkVuKmRV-s4tAjwjdWb-uIdccu4mVcNv-SWJeggRukgijh'
    ]
  }
];
