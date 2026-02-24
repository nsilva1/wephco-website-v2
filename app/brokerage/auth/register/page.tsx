'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthForm } from '../../../../components/BrokerageAuthForm';
import { Loader } from '@/components/Loader';


const RegistrationPage = () => {
  const { currentUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && currentUser) {
            router.push('/brokerage/home');
        }
    }, [currentUser, loading, router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center font-outfit overflow-y-scroll">
            <AuthForm login={false} />
        </div>
    );
}

export default RegistrationPage

