'use client';
import { useState, useEffect } from 'react';
import { Avatar, Badge, Image } from '@heroui/react';
import {
  useGoogleLogin,
  TokenResponse,
  googleLogout,
} from '@react-oauth/google';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { postLogin } from '@/app/_api/auth';

interface UserInfo {
  name: string | null;
  picture: string | null;
  email: string | null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: null,
    picture: null,
    email: null,
  });

  // Check localStorage on mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedTokenExpiry = localStorage.getItem('tokenExpiry');

    if (storedUserInfo && storedTokenExpiry) {
      const expiryTime = parseInt(storedTokenExpiry, 10);
      if (Date.now() < expiryTime) {
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        // Token expired, clear storage
        localStorage.removeItem('userInfo');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (
      tokenResponse: Omit<
        TokenResponse,
        'error' | 'error_description' | 'error_uri'
      >
    ) => {
      try {
        const data = await postLogin({
          access_token: tokenResponse.access_token,
          provider: 'google',
        });

        const fetchedUserInfo: UserInfo = {
          name: data.user.name,
          picture: data.user.avatar,
          email: data.user.email,
        };

        const expiryTime = Date.now() + tokenResponse.expires_in * 1000;

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userInfo', JSON.stringify(fetchedUserInfo));
        localStorage.setItem('tokenExpiry', expiryTime.toString());

        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('token');
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('accessToken');

    setUserInfo({ name: null, picture: null, email: null });
    googleLogout();
  };

  const routes = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'List', href: '/list' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Chat', href: '/chat' },
    { name: 'Setting', href: '/setting' },
  ];

  return (
    <div
      className={`h-full w-64 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out z-50 flex flex-col`}
    >
      <div className="h-10 w-full flex items-center justify-between mb-5">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={userInfo.name ? handleLogout : handleLogin}
        >
          <Avatar
            alt={userInfo.name || 'User Avatar'}
            className="flex-shrink-0"
            size="md"
            src={
              userInfo.picture ||
              'https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png'
            }
          />
          <p>{userInfo.name || 'Login with Google'}</p>
        </div>
        <div className="cursor-pointer flex">
          <Badge color="danger" content="" size="sm">
            <Image
              src="/icons/bell.svg"
              width={24}
              height={24}
              alt="Notifications"
            />
          </Badge>
        </div>
      </div>
      <ul className="flex-1">
        {routes.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index}>
              <Link
                className={`block p-3 text-lg cursor-pointer rounded-lg ${
                  isActive ? 'bg-custom text-default-500' : ''
                }`}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
