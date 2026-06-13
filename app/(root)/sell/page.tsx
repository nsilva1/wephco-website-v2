'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  ImageIcon, 
  FileText,
  Building2, 
  DollarSign, 
  Bed, 
  Bath, 
  X,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { BiArea } from 'react-icons/bi';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import { uploadFile } from '@/lib/helperFunctions';
import { submitPropertyForSale } from '@/actions/property-management';
import { IProperty } from '@/interfaces/propertyInterface';


export default function SellPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    developer: '',
    location: '',
    yieldValue: '0',
    price: '',
    description: '',
    currency: 'USD',
    tag: 'Local',
    category: 'Sale',
    bedroom: '',
    bathroom: '',
    square_foot: '',
  });

  type Currency = 'USD' | 'NGN';
  type Tag = 'Local' | 'International';
  type Category = 'Rent' | 'Lease' | 'Sale';

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiles((prev) => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPdf(file);
      setPdfFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formState.title || !formState.location || !formState.price) {
      toast.warning('Please fill in all required fields');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.warning('Please upload at least one image of your property');
      return;
    }

    const numberOfBedrooms = Number(formState.bedroom);
    const numberOfBathrooms = Number(formState.bathroom);
    const squareFoot = Number(formState.square_foot);

    if(isNaN(numberOfBedrooms) || isNaN(numberOfBathrooms) || isNaN(squareFoot)) {
      toast.warning('Please enter valid numbers for bedrooms, bathrooms, and square footage');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload files to Storage
      const imageUrls = await Promise.all(
        selectedFiles.map((item) => uploadFile(item.file, 'properties'))
      );
      
      let pdfUrl = '';
      if (selectedPdf) {
        pdfUrl = await uploadFile(selectedPdf, 'properties/pdfs');
      }

      // 2. Prepare Form Data for Server Action
      const formData: IProperty = {
        title: formState.title,
        developer: formState.developer,
        location: formState.location,
        yieldValue: Number(formState.yieldValue),
        price: Number(formState.price),
        status: 'Available',
        description: formState.description,
        images: imageUrls,
        currency: formState.currency as Currency,
        tag: formState.tag as Tag,
        category: formState.category as Category,
        bedroom: numberOfBedrooms,
        bathroom: numberOfBathrooms,
        square_foot: squareFoot,
        pdfUrl: pdfUrl,
        verified: false,
        interests: [],
      }

      // 3. Submit
      await submitPropertyForSale(formData);

      toast.success('Your property listing has been submitted successfully for admin review!');
      
      // Reset Form
      setFormState({
        title: '',
        developer: '',
        location: '',
        yieldValue: '0',
        price: '',
        description: '',
        currency: 'USD',
        tag: 'Local',
        category: 'Sale',
        bedroom: '',
        bathroom: '',
        square_foot: ''
      });
      setSelectedFiles([]);
      setSelectedPdf(null);
      setPdfFileName(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit property listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans">
      {/* Hero Header */}
      <section className="relative">
        <div 
          className="w-full h-[360px] md:h-[450px] bg-cover bg-center flex items-center justify-center p-6 text-center" 
          style={{
            backgroundImage: `linear-gradient(rgba(32, 29, 18, 0.8), rgba(32, 29, 18, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3__jIO7Q6O8B4hGtEX2zv6aFO73APne6N5KPQiuAllL8trjOLsz4OmTMfTLsmgMkzgSFmnmmRrPfx-xuP1vZNL3sEW9Ar3g1RzOEuiLC5yD7uFOLEC5Cv3K60Ub8HXvwmX9GJZ3n8HQ2qlYkDsQ3aUElmYPKTJbE_4J0O5E1adCvVRjgbLhQBqa0IX7Lk7N5bikYezOw6enyf8flmujdmNLktGrms-ldkrGE_KmDlmUFoWYLl9Aqm7L4Yja7BmfmgtaGBL5xlcb7B')`
          }}
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              List Your Property With Us
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Put your property in front of premium potential buyers worldwide. Submit your property information below and let our experts handle the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Main Submission Form */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 -mt-20 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column - Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Building2 className="size-5" /> Property Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Property Title *</label>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Premium 5 Bedroom Penthouse"
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Developer (Optional)</label>
                      <input
                        type="text"
                        value={formState.developer}
                        onChange={(e) => handleChange('developer', e.target.value)}
                        placeholder="e.g. Emaar, Damac"
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Location *</label>
                      <input
                        type="text"
                        value={formState.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="e.g. Ikoyi, Lagos or Dubai Marina, UAE"
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Category</label>
                        <select
                          value={formState.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="Sale">For Sale</option>
                          <option value="Rent">For Rent</option>
                          <option value="Lease">For Lease</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Listing Scope</label>
                        <select
                          value={formState.tag}
                          onChange={(e) => handleChange('tag', e.target.value)}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="Local">Local (Nigeria)</option>
                          <option value="International">International (Global)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Bed className="size-3.5 text-primary" /> Bedrooms
                        </label>
                        <input
                          type="number"
                          value={formState.bedroom}
                          onChange={(e) => handleChange('bedroom', e.target.value)}
                          placeholder="e.g. 4"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Bath className="size-3.5 text-primary" /> Bathrooms
                        </label>
                        <input
                          type="number"
                          value={formState.bathroom}
                          onChange={(e) => handleChange('bathroom', e.target.value)}
                          placeholder="e.g. 5"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <BiArea className="size-3.5 text-primary" /> Square Feet
                        </label>
                        <input
                          type="number"
                          value={formState.square_foot}
                          onChange={(e) => handleChange('square_foot', e.target.value)}
                          placeholder="e.g. 500"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & Media */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <DollarSign className="size-5" /> Pricing & Financials
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Price *</label>
                        <input
                          type="number"
                          value={formState.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          placeholder="0"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Currency</label>
                        <select
                          value={formState.currency}
                          onChange={(e) => handleChange('currency', e.target.value)}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="NGN">NGN (₦)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                        <TrendingUp className="size-3.5 text-primary" /> Projected Yield Value (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formState.yieldValue}
                        onChange={(e) => handleChange('yieldValue', e.target.value)}
                        placeholder="e.g. 7.5"
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Property Description</label>
                      <textarea
                        value={formState.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Provide features, views, amenities, and details..."
                        rows={4}
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Media Upload (Images & Brochure PDF) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/10 pt-8">
              
              {/* Images upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Property Images (Min 1 image) *</label>
                <div
                  className="border-2 border-dashed border-primary/20 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-slate-800/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon className="h-10 w-10 text-primary/70" />
                    <p className="text-sm font-medium">Click to select property photos</p>
                    <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {selectedFiles.map((sf, idx) => (
                      <div key={idx} className="relative w-full h-24 group rounded-lg overflow-hidden border border-primary/10">
                        <Image src={sf.preview} alt="Preview" fill className="object-cover" sizes="150px" />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                          onClick={() => removeNewImage(idx)}
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PDF brochure upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">PDF Brochure (Optional)</label>
                <div
                  className="border-2 border-dashed border-primary/20 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors bg-slate-800/20"
                  onClick={() => pdfInputRef.current?.click()}
                >
                  {pdfFileName ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-10 w-10 text-primary" />
                      <p className="text-sm font-medium text-slate-300">{pdfFileName}</p>
                      <p className="text-xs text-slate-500">Click to change PDF brochure</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <FileText className="h-10 w-10 text-primary/70" />
                      <p className="text-sm font-medium">Click to upload a PDF brochure</p>
                      <p className="text-xs text-slate-500">PDF file up to 20MB</p>
                    </div>
                  )}
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handlePdfChange}
                  />
                </div>
                {pdfFileName && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:text-red-300 transition-colors mt-2"
                    onClick={() => { setSelectedPdf(null); setPdfFileName(null); }}
                  >
                    Remove PDF brochure
                  </button>
                )}
              </div>

            </div>

            {/* Submit Button */}
            <div className="border-t border-primary/10 pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark font-extrabold rounded-lg hover:bg-primary/95 transition-all text-lg shadow-xl shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader /> : (
                  <>
                    <span>Submit Property Listing</span>
                    <CheckCircle2 className="size-5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}
