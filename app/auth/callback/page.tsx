// app/auth/callback/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/reduxHooks/redux.hooks';
import { setRegisteredCredentials } from '@/services/authService/auth.slice';
import Spinner from '@/components/Layouts/Loaders/Spinner';
import { useLazyGetCreditStatusQuery } from '@/services/authService/auth.api';
import { ErrorSvg } from '@/components/Svg/AuthSvg';

const CallBack = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [triggerGetCredits] = useLazyGetCreditStatusQuery();
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false); // Multiple calls prevent karne ke liye

  useEffect(() => {
    // Agar already run ho chuka hai to return
    if (hasRun.current) return;
    hasRun.current = true;

    const handleGoogleCallback = async () => {
      try {
        // URL se token extract karo
        const token = searchParams.get('token');
        
        if (!token) {
          setError('Authentication failed. No token received.');
          setTimeout(() => router.push('/auth/login'), 2000);
          return;
        }

        // Credit status fetch karo jo user details bhi return karega
        const result = await triggerGetCredits().unwrap();
        
        if (result.data.user && result.data.userType === 'registered') {
          // Redux state update karo
          dispatch(setRegisteredCredentials({
            user: result.data.user,
            accessToken: token
          }));

          // Success! Dashboard pe redirect karo
          setTimeout(() => {
            router.push('/user?page=dashboard');
          }, 1000);
        } else {
          setError('Invalid user data received.');
          setTimeout(() => router.push('/auth/login'), 2000);
        }
      } catch (err: any) {
        console.error('Google callback error:', err);
        setError(err?.data?.message || 'Authentication failed. Please try again.');
        setTimeout(() => router.push('/auth/login'), 2000);
      }
    };

    handleGoogleCallback();
  }, []); // Empty dependency array with useRef

  return (
    <div className="w-full md:h-[45vw] h-[80vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center">
      <div className="w-full flex flex-col items-center gap-6 p-8">
        {error ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <ErrorSvg />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Authentication Failed
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {error}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                Redirecting to login...
              </p>
            </div>
          </>
        ) : (
          <>
            <Spinner size={"xl"} color='dark:stroke-dark stroke-light' />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Completing Sign In
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Setting up your account...
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CallBack;