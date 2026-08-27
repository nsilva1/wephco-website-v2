'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'react-toastify';
import { BiBed, BiBath, BiArea, BiMap, BiShareAlt } from 'react-icons/bi';
import { CountryFlag } from '@/components/CountryFlag';
import { sendPropertyInquiryEmail } from '@/actions/email';

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
            title: data.title,
            price: data.price || 0,
            description: data.description || '',
            location:
              data.location ||
              (data.city && data.country
                ? `${data.city}, ${data.country}`
                : ''),
            category: data.category || data.type || 'Residential',
            images: data.images || [],
            pdfUrl: data.pdfUrl || '',
            status: data.status || 'Available',
            currency: data.currency || 'USD',
            tag: data.tag || 'Exclusive',
            verified: data.verified || false,
            developer: data.developer || 'Wephco',
            agent: data.agent || null,
            beds: data.beds || data.bedroom || data.bedrooms || 4,
            baths: data.baths || data.bathroom || data.bathrooms || 5,
            sqft: data.sqft || data.square_foot || 4500,
            garage: data.garage || '3 Cars',
            amenities: data.amenities || [
              'Infinity Pool',
              'Dolby Cinema',
              'Smart Home Tech',
              'Wine Cellar',
              'Sauna',
            ],
            history: data.history || [
              {
                action: 'Listed for Sale',
                price: data.price || 0,
                date: 'Recent',
              },
            ],
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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.warning('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Save to 'propertyViewRequests' collection in Firestore
      await addDoc(collection(db, 'propertyViewRequests'), {
        name,
        email,
        phone,
        propertyId: id,
        propertyName: property?.title || 'Unknown Property',
        preferredDate: date,
        message:
          message ||
          `I am interested in scheduling a tour for ${property?.title}`,
        createdAt: new Date(),
      });

      // Trigger Resend email for indicating property interest
      try {
        await sendPropertyInquiryEmail({
          toEmail: email,
          username: name,
          agentName: property?.agent?.name || 'Wephco Advisory Team',
          agentEmail: property?.agent?.email || 'support@wephco.com',
          agentPhone: property?.agent?.phone || '+234 800 WEPHCO',
          property: property?.title || 'Property',
          propertyLink: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch (emailErr) {
        console.warn('Failed to send property inquiry confirmation email:', emailErr);
      }

      toast.success(
        'Tour request submitted successfully! An agent will contact you shortly.'
      );

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
        <Link
          href="/properties"
          className="px-6 py-2 bg-primary text-background-dark font-bold rounded-md">
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
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              {property.title}
            </h2>
            <div className="flex items-center gap-2 text-slate-400">
              <BiMap className="text-primary text-lg" />
              <p className="text-sm md:text-base">{property.location}</p>
              <CountryFlag countryName={property.location.split(' ')[1]} />
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
              Asking Price
            </p>
            <p className="text-3xl md:text-4xl font-black text-slate-100">
              {formatCurrency(property.price, property.currency)}
            </p>
          </div>
        </div>

        {/* Hero Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          <div className="lg:col-span-3 aspect-video relative group overflow-hidden rounded-xl border border-primary/10">
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
              <div className="w-full h-full bg-neutral-dark/30 flex items-center justify-center text-slate-500">
                No Image Available
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
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
                }`}>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-[#022618]/25 border border-primary/10 rounded-xl">
              <div className="flex flex-col items-center text-center">
                <BiBed className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                  Bedrooms
                </p>
                <p className="text-xl font-bold">{property.beds.toString()}</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-primary/10">
                <BiBath className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                  Bathrooms
                </p>
                <p className="text-xl font-bold">{property.baths.toString()}</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-primary/10">
                <BiArea className="text-primary mb-2 text-3xl" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                  Square Ft
                </p>
                <p className="text-xl font-bold">
                  {Number(property.sqft).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-primary"></span>
                The Experience
              </h3>
              <div className="text-slate-300 leading-relaxed text-base space-y-4 font-light">
                <p>{property.description}</p>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar Form */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-[#022618]/20 p-8 rounded-xl border border-primary/20 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <h4 className="text-lg font-bold">Schedule Viewing</h4>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Full Name *
                  </label>
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
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Email Address *
                  </label>
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
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Phone Number *
                  </label>
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
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Preferred Tour Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Message
                  </label>
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
                  className="w-full bg-primary text-background-dark font-black uppercase tracking-[0.2em] py-4 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,53,0.3)] hover:scale-[1.01] transition-all active:scale-95 text-[10px] cursor-pointer disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                {property.pdfUrl && (
                  <Link
                    href={property.pdfUrl}
                    target="_blank"
                    className="w-full border border-white/20 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors text-center block">
                    Download Brochure
                  </Link>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Listing URL copied to clipboard');
                  }}
                  className="w-full flex items-center justify-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest py-2 hover:opacity-80 transition-opacity cursor-pointer">
                  <BiShareAlt className="text-sm" /> Share Listing
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
