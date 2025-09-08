'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getConsultations } from '@/actions/consultation';
import { Loader } from '@/components/Loader';
import { IConsultation } from '@/interfaces/userInterface';
// import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { Role } from '@/interfaces/userInterface';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { allowedRoles } from '@/lib/constants';
import { Tooltip } from '@/components/Tooltip';
import { Contact, NotebookPen } from 'lucide-react';

const ConsultationsPage = () => {
  // const router = useRouter()

  const { data: session, status } = useSession();

  const [consultations, setConsultations] = useState<IConsultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getConsultations();
      setConsultations(data);
    } catch (err) {
      setError('Failed to fetch consultations');
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = useCallback(() => {
    if (
      status === 'unauthenticated' ||
      !session?.user ||
      !allowedRoles.includes(session?.user.role as Role)
    ) {
      toast.error(
        'You are not authorized to view this page. Please log in with an admin or support account.'
      );
      signOut({ redirectTo: '/auth/login' });
    } else {
      // User is authenticated and has the right role
      fetchConsultations();
    }
  }, [status]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-2xl text-red-500">{error}</h3>
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <h3 className="text-2xl">No Consultations yet</h3>
      </div>
    );
  }

  let tableHead = (
    <thead>
      <tr>
        <th className="p-4 text-left font-semibold">Actions</th>
        <th className="p-4 text-left font-semibold">Service</th>
        <th className="p-4 text-left font-semibold">Meeting Date</th>
        <th className="p-4 text-left font-semibold">Meeting Location</th>
        <th className="p-4 text-left font-semibold">Phone</th>
        <th className="p-4 text-left font-semibold">Email</th>
        <th className="p-4 text-left font-semibold">Organisation</th>
        <th className="p-4 text-left font-semibold">Contact Name</th>
        <th className="p-4 text-left font-semibold">Mode of Contact</th>
        <th className="p-4 text-left font-semibold">Details</th>
      </tr>
    </thead>
  );

  let tableBody = (
    <tbody>
      {consultations.map((consultation, index) => (
        <tr
          key={consultation.id}
          className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
          <td className="flex gap-2 p-4">
            <Tooltip text="Contact Customer" position="top">
              <Contact className="text-blue-500 hover:text-blue-700 cursor-pointer" />
            </Tooltip>
            <Tooltip text="Add a Note" position="top">
              <NotebookPen className="text-green-500 hover:text-green-700 cursor-pointer" />
            </Tooltip>
          </td>
          <td className="p-4">{consultation.service}</td>
          <td className="p-4">
            {new Date(consultation.meetingDate).toDateString()}
          </td>
          <td className="p-4">{consultation.meetingLocation}</td>
          <td className="p-4">{consultation.phoneNumber}</td>
          <td className="p-4">{consultation.email}</td>
          <td className="p-4">{consultation.organizationName}</td>
          <td className="p-4">{consultation.name}</td>
          <td className="p-4">{consultation.preferredModeOfContact}</td>
          <td className="p-4">{consultation.details}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="flex flex-col items-center h-screen overflow-x-scroll p-5">
      <table className="w-full leading-normal mt-10 text-sm">
        <caption className="text-2xl font-bold mb-4">Consultations</caption>
        {tableHead}
        {tableBody}
      </table>
    </div>
  );
};

export default ConsultationsPage;
