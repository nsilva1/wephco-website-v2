'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getConsultations } from '@/actions/consultation';
import { Loader } from '@/components/Loader';
import { IConsultation } from '@/interfaces/userInterface';
import { NotebookPen } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';

const ConsultationsPage = () => {
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

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <h3 className="text-2xl text-red-500 font-semibold">{error}</h3>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Consultations
          </h2>
          <p className="text-slate-600 mt-1">
            Manage and respond to client consultation requests
          </p>
        </div>
      </div>

      {consultations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100 shadow-sm mt-6">
          <NotebookPen className="h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">
            No Consultations Yet
          </h3>
          <p className="text-slate-500 mt-1">
            Submissions from the consultation form will appear here.
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={consultations} />
      )}
    </div>
  );
};

export default ConsultationsPage;
