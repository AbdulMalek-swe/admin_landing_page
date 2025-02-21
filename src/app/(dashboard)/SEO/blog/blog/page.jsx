 "use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Blog = dynamic(() => import('@/components/seo/blog/blog'), { ssr: false });
const Home = () => {
  const  router  = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Blog/>
    </div>
  );
};

export default Home;