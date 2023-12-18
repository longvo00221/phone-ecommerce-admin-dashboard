'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra nếu có user trong localStorage
    if (typeof window !== "undefined") {

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        // Nếu có, chuyển hướng về trang chính ('/')
        router.push('/');
      }else{
        router.push("/sign-in")
      }
    }
    
  }, [router]);

  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  );
};

export default AuthLayout;
