'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'react-toastify';
import { 
  BiBed, 
  BiBath, 
  BiArea, 
  BiCar, 
  BiMap,  
  BiCalendar, 
  BiEnvelope,
  BiCheckCircle,
  BiShareAlt,
  BiGlobe,
  BiRightArrowAlt
} from 'react-icons/bi';

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const mappedData = {
            id: docSnap.id,
            title: data.title || data.name || 'Luxury Estate',
            price: data.price || 0,
            description: data.description || '',
            location: data.location || (data.city && data.country ? `${data.city}, ${data.country}` : ''),
            category: data.category || data.type || 'Residential',
            images: data.images || [],
            pdfUrl: data.pdfUrl || '',
            status: data.status || 'Available',
            currency: data.currency || 'USD',
            tag: data.tag || 'Exclusive',
            verified: data.verified || false,
            developer: data.developer || 'Wephco',
            beds: data.beds || data.bedrooms || 4,
            baths: data.baths || data.bathrooms || 5,
            sqft: data.sqft || data.square_foot || 4500,
            garage: data.garage || '3 Cars',
            amenities: data.amenities || ['Infinity Pool', 'Dolby Cinema', 'Smart Home Tech', 'Wine Cellar', 'Sauna'],
            history: data.history || [
              { action: 'Listed for Sale', price: data.price || 0, date: 'Recent' }
            ]
          };
          setProperty(mappedData);
          if (mappedData.images.length > 0) {
            setActiveImage(mappedData.images[0]);
          }
        } else {
          toast.error('Property not found');
        }
      } catch (error) {
        console.error('Error fetching property details: ', error);
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.warning('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      // Save to 'propertyEnquiries' collection in Firestore
      await addDoc(collection(db, 'propertyViewRequests'), {
        name,
        email,
        phone,
        propertyId: id,
        propertyName: property?.title || 'Unknown Property',
        preferredDate: date,
        message: message || `I am interested in scheduling a tour for ${property?.title}`,
        createdAt: new Date()
      });
      
      toast.success('Tour request submitted successfully! An agent will contact you shortly.');
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting enquiry: ', error);
      toast.error('Failed to submit tour request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col items-center justify-center gap-4 pt-24">
        <h2 className="text-3xl font-bold">Property Not Found</h2>
        <Link href="/properties" className="px-6 py-2 bg-primary text-background-dark font-bold rounded-md">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-20 selection:bg-primary selection:text-background-dark">
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Breadcrumbs & Title Section */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <nav className="flex gap-2 text-xs font-semibold uppercase tracking-widest text-primary/60 mb-3">
              <Link href="/properties">Properties</Link>
              <span>/</span>
              <span className="text-primary">{property.category}</span>
            </nav>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{property.title}</h2>
            <div className="flex items-center gap-2 text-slate-400">
              <BiMap className="text-primary text-lg" />
              <p className="text-sm md:text-base">{property.location}</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Asking Price</p>
            <p className="text-3xl md:text-4xl font-black text-slate-100">
              {formatCurrency(property.price, property.currency)}
            </p>
          </div>
        </div>

        {/* Hero Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          <div className="lg:col-span-3 aspect-[16/9] relative group overflow-hidden rounded-xl border border-primary/10">
            {activeImage ? (
              <Image 
                src={activeImage} 
                alt={property.title} 
                fill 
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-103"
                priority
              />
            ) : (
              <div className="w-full h-full bg-neutral-dark/30 flex items-center justify-center text-slate-500">No Image Available</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 flex gap-3">
              <span className="px-3 py-1 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest rounded-md">
                {property.status}
              </span>
              {property.verified && (
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-md">
                  Verified
                </span>
              )}
            </div>
          </div>
          
          {/* Thumbnails Sidebar */}
          <div className="hidden lg:grid grid-rows-3 gap-4 h-full">
            {property.images.slice(0, 3).map((img: string, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`rounded-lg overflow-hidden relative group cursor-pointer border ${
                  activeImage === img ? 'border-primary' : 'border-primary/10'
                }`}
              >
                <Image 
                  src={img} 
                  alt={`${property.title} gallery ${idx + 1}`} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            {property.images.length === 0 && (
              <div className="row-span-3 bg-neutral-dark/10 border border-primary/10 rounded-lg flex items-center justify-center text-slate-500">
                No Gallery
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-[#022618]/25 border border-primary/10 rounded-xl">
              <div className="flex flex-col items-center text-center">
                <BiBed className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Bedrooms</p>
                <p className="text-xl font-bold">{property.beds.toString().padStart(2, '0')}</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-primary/10">
                <BiBath className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Bathrooms</p>
                <p className="text-xl font-bold">{property.baths.toString().padStart(2, '0')}</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-primary/10">
                <BiArea className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Square Ft</p>
                <p className="text-xl font-bold">{Number(property.sqft).toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-primary/10">
                <BiCar className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Garage</p>
                <p className="text-xl font-bold">{property.garage}</p>
              </div>
            </div>

            {/* Description Section */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary"></span>
                The Experience
              </h3>
              <div className="text-slate-300 leading-relaxed text-base space-y-4 font-light">
                <p>{property.description}</p>
              </div>
            </section>

            {/* Key Features Grid */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
                Key Features &amp; Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                    <BiCheckCircle className="text-primary text-xl flex-shrink-0" />
                    <span className="text-slate-200 text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Property History Timeline */}
            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Property Registry History
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-primary/20">
                {property.history.map((hist: any, idx: number) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-background-dark"></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold text-base">{hist.action || 'Registry Entry'}</p>
                      <span className="text-xs font-semibold text-slate-500 uppercase">{hist.date}</span>
                    </div>
                    <p className="text-primary font-bold mt-1 text-sm">{formatCurrency(hist.price || property.price, property.currency)}</p>
                    <p className="text-xs text-slate-400 mt-1">Managed &amp; Verified by Wephco</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar Form */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-[#022618]/20 p-8 rounded-xl border border-primary/20 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-full border border-primary/30 relative overflow-hidden bg-cover bg-center">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zsUa1k2hpNYY-0ZmLrEad_lZ-sn8pZiwnQ025-hmLDaKhGOVjJuy8QyZJOzkPAGjN4Y_RfQBYth-Ss2K5KeOYh3_Qkq3IXoNp4Jfy1nE-YeMeAerqlB4LP3x0QMlDTjaJFbICc0BEazBBdOFud7f5jOtxeP5tXI-591BGEa050UGIeVXA1YuP9Zw8R1MkGqHnLkEvNtLoTDn53xz7vEnsBSsdS1YIn6C2Y94gN9mVRvetgeOZLv3Amj1kpl5O2Zqd92nYLWqxebf"
                    alt="Julian Sterling"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Listing Agent</p>
                  <h4 className="text-lg font-bold">Wephco Luxury Advisor</h4>
                  <p className="text-[10px] text-slate-400">concierge@wephco.com</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address *</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number *</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+234..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Preferred Tour Date</label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea 
                    placeholder="I am interested in scheduling a private tour..." 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:opacity-30 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-background-dark font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,53,0.3)] hover:scale-[1.01] transition-all active:scale-95 text-[10px] cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Scheduling...' : 'Schedule Viewing'}
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                {property.pdfUrl && (
                  <Link 
                    href={property.pdfUrl}
                    target="_blank"
                    className="w-full border border-white/20 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors text-center block"
                  >
                    Download Brochure
                  </Link>
                )}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Listing URL copied to clipboard');
                  }}
                  className="w-full flex items-center justify-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest py-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <BiShareAlt className="text-sm" /> Share Listing
                </button>
              </div>
            </div>
          </aside>
        </div>

      </main>

      {/* Map & Location Section */}
      <div className="bg-[#022618]/10 mt-20 py-16 border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-10 text-center uppercase tracking-widest">The Neighborhood</h3>
          <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-primary/20 relative shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBEK3SAogZclxHBaSsO5YXtgQdEqJO_j278wfOJ0Om5nOmiZzIOSYMkV4Al2gLIr0ZEP2epoRgyW-hjRhzTtZ83GC3jlUmyOwmMr7graDz-B3I-1suJ-vGT4os1HGDCUF3bTUgvyCunSJVqQNmMiWrugAvLJa6Bp-B0W1B13j74qZDy-NDmYldg91IVf8REJE1bBZ7hhJNNQDowD6YlwpECbS4mQaw0TSR365HGFBA6ysxp8V5QXzt6AtCxZnlVrwac6wMCaxrB-2n"
              alt="Neighborhood Map"
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-50 grayscale brightness-50"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
              <BiMap className="text-6xl drop-shadow-[0_0_15px_rgba(212,175,53,0.8)] animate-pulse" />
            </div>
            <div className="absolute bottom-6 left-6 bg-background-dark/95 border border-primary/20 p-6 rounded-xl max-w-xs md:max-w-sm shadow-xl">
              <h5 className="text-lg font-bold mb-2">{property.location.split(',')[0]} neighborhood</h5>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Consistently ranked among the most exclusive enclaves, this sector offers unmatched security, privacy, and long-term asset appreciation.
              </p>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex flex-col">
                  <span className="text-primary mb-1">98/100</span>
                  <span className="opacity-60">Safety Score</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-primary mb-1">Active</span>
                  <span className="opacity-60">Security Patrol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
