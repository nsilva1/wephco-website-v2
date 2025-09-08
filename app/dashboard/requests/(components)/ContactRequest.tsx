'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IContactUs } from '@/interfaces/userInterface';
import { getAllContactRequests } from '@/actions/contact';
import { Loader } from '@/components/Loader';

const ContactRequest = () => {
  const [requests, setRequests] = useState<IContactUs[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllContactRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
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

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-2xl">No Contact Requests</h3>
      </div>
    );
  }

  let tableHead = (
    <thead>
      <tr className="bg-black text-white">
        <th>Actions</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Message</th>
        <th>Date</th>
      </tr>
    </thead>
  );

  let tableBody = (
    <tbody>
      {requests.map((request, index) => (
        <tr
          key={request.id}
          className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
          <td className="p-4">
            {request.status ? (
              <button></button>
            ) : (
              <button>Contact Customer</button>
            )}
          </td>
          <td className="p-4">{request.name}</td>
          <td className="p-4">{request.email}</td>
          <td className="p-4">{request.phoneNumber}</td>
          <td className="p-4">{request.message}</td>
          <td className="p-4">
            {new Date(request.createdAt!).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="flex flex-col items-center h-screen overflow-x-auto p-5">
      <table className="w-full leading-normal">
        <caption className="text-lg font-semibold mb-4">
          Requests to Sell Property
        </caption>
        {tableHead}
        {tableBody}
      </table>
    </div>
  );
};

export { ContactRequest };
