 "use client"
import React from 'react';
import dynamic from 'next/dynamic';

const Blog = dynamic(() => import('@/components/seo/blog/blog'), { ssr: false });
const Home = () => {
  return (
    <div>
      <Blog/>
    </div>
  );
};

export default Home;