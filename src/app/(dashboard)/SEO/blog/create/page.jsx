 
import React from 'react';
import dynamic from 'next/dynamic';

const SEOCreateForm = dynamic(()=> import('@/components/seo/blog/create'), { ssr: false });
const Home = () => {
  return (
    <div>
      <SEOCreateForm/>
    </div>
  );
};

export default Home;