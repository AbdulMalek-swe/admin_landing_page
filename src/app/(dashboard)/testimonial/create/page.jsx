"use client"
import React from 'react';
import dynamic from 'next/dynamic';
 
const CreatePostForm = dynamic(()=> import('@/components/testimonial/create'), { ssr: false });
const Home = () => {
  return (
    <div>
      <CreatePostForm />
    </div>
  );
};

export default Home;