// components/ProtectedRoute.tsx
'use client';

import { useContext, useState, useEffect } from 'react';
import {AuthContext} from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User } from '@/types/interfaces';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children}: ProtectedRouteProps) => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const [user, setUser] = useState<User | null> (null);
    const [loading, setLoading] = useState(true);
    if(context){
        setUser(context.user);
        setLoading(context.loading);
    }


  useEffect(() => {
    if (user === undefined) return; // Prevent execution if user state is still undefined
    
    if (!user) {
        router.replace('/'); // Use replace() to avoid adding to history
    }
    setLoading(false);
}, [user, router]);

if (loading || !user) return null;

return <>{children}</>;
};

export default ProtectedRoute;