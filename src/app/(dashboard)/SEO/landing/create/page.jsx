 
import React from 'react';
import dynamic from 'next/dynamic';

const SEOCreateForm = dynamic(()=> import('@/components/seo/landing/create'), { ssr: false });
const Home = () => {
  return (
    <div>
      <SEOCreateForm />
    </div>
  );
};

export default Home;