'use server';

import { db, storage } from '@/firebase/firebaseConfig';
import { IProperty } from '@/interfaces/propertyInterface';
import { serializeDoc } from '@/lib/utils';

export async function getProperties() {
  const snapshot = await db.collection('properties').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!)
  })) as IProperty[];
}

export async function getPropertyById(id: string) {
  const doc = await db.collection('properties').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...serializeDoc(doc.data()!) } as IProperty;
}

export async function createProperty(formData: FormData) {
  const title = formData.get('title') as string;
  const developer = formData.get('developer') as string;
  const location = formData.get('location') as string;
  const yieldValue = parseFloat(formData.get('yieldValue') as string) || 0;
  const price = parseFloat(formData.get('price') as string) || 0;
  const description = formData.get('description') as string;
  const currency = formData.get('currency') as string || 'NGN';
  const status = formData.get('status') as string || 'available';
  const tag = formData.get('tag') as string || 'pending';
  const category = formData.get('category') as string || '';
  const bedroom = formData.get('bedroom') as string || '';
  const bathroom = formData.get('bathroom') as string || '';
  const verified = formData.get('verified') === 'true';
  const interestsRaw = formData.get('interests');
  const interests = interestsRaw ? (typeof interestsRaw === 'string' && interestsRaw.startsWith('[') ? JSON.parse(interestsRaw) : formData.getAll('interests') as string[]) : [];
  const imageUrls: string[] = JSON.parse(formData.get('imageUrls') as string || '[]');
  const pdfUrl = formData.get('pdfUrl') as string || '';

  // let imageUrls: string[] = [];
  // let pdfUrl = '';

  // const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

  // for (const imageFile of imageFiles) {
  //   if (imageFile && imageFile.size > 0) {
  //     const fileName = `properties/${Date.now()}_${imageFile.name}`;
  //     const file = bucket.file(fileName);
  //     const buffer = Buffer.from(await imageFile.arrayBuffer());
  //     await file.save(buffer, {
  //       contentType: imageFile.type,
  //       metadata: { firebaseStorageDownloadTokens: Date.now().toString() },
  //     });
  //     await file.makePublic();
  //     imageUrls.push(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
  //   }
  // }

  // if (pdfFile && pdfFile.size > 0) {
  //   const fileName = `properties/pdfs/${Date.now()}_${pdfFile.name}`;
  //   const file = bucket.file(fileName);
  //   const buffer = Buffer.from(await pdfFile.arrayBuffer());
  //   await file.save(buffer, {
  //     contentType: pdfFile.type,
  //     metadata: { firebaseStorageDownloadTokens: Date.now().toString() },
  //   });
  //   await file.makePublic();
  //   pdfUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  // }

  const propertyData = {
    title,
    developer,
    location,
    yieldValue,
    price,
    description,
    currency,
    status,
    tag,
    category,
    bedroom,
    bathroom,
    verified,
    interests,
    pdfUrl,
    images: imageUrls,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await db.collection('properties').add(propertyData);
  return { id: docRef.id, ...propertyData };
}

export async function updateProperty(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const developer = formData.get('developer') as string;
  const location = formData.get('location') as string;
  const yieldValue = parseFloat(formData.get('yieldValue') as string) || 0;
  const price = parseFloat(formData.get('price') as string) || 0;
  const description = formData.get('description') as string;
  const currency = formData.get('currency') as string || 'NGN';
  const status = formData.get('status') as string || 'available';
  const tag = formData.get('tag') as string || 'pending';
  const category = formData.get('category') as string || '';
  const bedroom = formData.get('bedroom') as string || '';
  const bathroom = formData.get('bathroom') as string || '';
  const verified = formData.get('verified') === 'true';
  const interestsRaw = formData.get('interests');
  const interests = interestsRaw ? (typeof interestsRaw === 'string' && interestsRaw.startsWith('[') ? JSON.parse(interestsRaw) : formData.getAll('interests') as string[]) : [];
  const imageFiles = formData.getAll('images') as File[];
  const pdfFile = formData.get('pdf') as File | null;
  const existingImagesRaw = formData.get('existingImages') as string;
  const existingPdf = formData.get('existingPdf') as string || '';

  let imageUrls: string[] = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];
  let pdfUrl = existingPdf;

  const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

  for (const imageFile of imageFiles) {
    if (imageFile && imageFile.size > 0) {
      const fileName = `properties/${Date.now()}_${imageFile.name}`;
      const file = bucket.file(fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await file.save(buffer, {
        contentType: imageFile.type,
        metadata: { firebaseStorageDownloadTokens: Date.now().toString() },
      });
      await file.makePublic();
      imageUrls.push(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    }
  }

  if (pdfFile && pdfFile.size > 0) {
    const fileName = `properties/pdfs/${Date.now()}_${pdfFile.name}`;
    const file = bucket.file(fileName);
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    await file.save(buffer, {
      contentType: pdfFile.type,
      metadata: { firebaseStorageDownloadTokens: Date.now().toString() },
    });
    await file.makePublic();
    pdfUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  }

  const updateData = {
    title,
    developer,
    location,
    yieldValue,
    price,
    description,
    currency,
    status,
    tag,
    category,
    bedroom,
    bathroom,
    verified,
    interests,
    pdfUrl,
    images: imageUrls,
    updatedAt: new Date().toISOString(),
  };

  await db.collection('properties').doc(id).update(updateData);
  return { id, ...updateData };
}

export async function deleteProperty(id: string) {
  const doc = await db.collection('properties').doc(id).get();
  if (doc.exists) {
    const data = doc.data();
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

    // Delete image from storage
    if (data?.images && Array.isArray(data.images)) {
      for (const imageUrl of data.images) {
        try {
          const urlParts = imageUrl.split(`${bucket.name}/`);
          if (urlParts[1]) await bucket.file(urlParts[1]).delete();
        } catch (e) {
          console.error('Failed to delete property image from storage:', e);
        }
      }
    }

    // Delete PDF from storage
    if (data?.pdfUrl) {
      try {
        const urlParts = data.pdfUrl.split(`${bucket.name}/`);
        if (urlParts[1]) await bucket.file(urlParts[1]).delete();
      } catch (e) {
        console.error('Failed to delete property PDF from storage:', e);
      }
    }
  }

  await db.collection('properties').doc(id).delete();
  return { success: true };
}

export async function updatePropertyTag(id: string, tag: string) {
  await db.collection('properties').doc(id).update({ tag, updatedAt: new Date().toISOString() });
  return { success: true };
}

export async function updatePropertyStatus(id: string, status: string) {
  await db.collection('properties').doc(id).update({ status, updatedAt: new Date().toISOString() });
  return { success: true };
}

export async function submitPropertyForSale(formData: FormData) {
  const title = formData.get('title') as string;
  const developer = formData.get('developer') as string || '';
  const location = formData.get('location') as string;
  const yieldValue = parseFloat(formData.get('yieldValue') as string) || 0;
  const price = parseFloat(formData.get('price') as string) || 0;
  const description = formData.get('description') as string || '';
  const currency = formData.get('currency') as string || 'NGN';
  const status = 'Available';
  const tag = formData.get('tag') as string || 'Local';
  const category = formData.get('category') as string || 'Sale';
  const bedroom = formData.get('bedroom') as string || '';
  const bathroom = formData.get('bathroom') as string || '';
  const imageUrls: string[] = JSON.parse(formData.get('imageUrls') as string || '[]');
  const pdfUrl = formData.get('pdfUrl') as string || '';

  const propertyData = {
    title,
    developer,
    location,
    yieldValue,
    price,
    description,
    currency,
    status,
    tag,
    category,
    bedroom,
    bathroom,
    verified: false,
    interests: [],
    pdfUrl,
    images: imageUrls,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await db.collection('properties').add(propertyData);
  return { id: docRef.id, ...propertyData };
}
