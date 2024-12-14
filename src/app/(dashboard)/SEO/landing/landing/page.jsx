 
import React from 'react';
import dynamic from 'next/dynamic';
const LandingSeo = dynamic(()=> import('@/components/seo/landing/landing'), { ssr: false });
const Home = () => {
  return (
    <div>
      <LandingSeo/>
    </div>
  );
};

export default Home;