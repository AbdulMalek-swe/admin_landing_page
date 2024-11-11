"use client"
// import CreatePostForm from '@/components/blog/create';

import dynamic from 'next/dynamic';
import React from 'react';
const CreatePostForm = dynamic(()=> import('@/components/blog/create'), { ssr: false });
const Home = () => {
  return (
    <div>
      <CreatePostForm/>
    </div>
  );
};

export default Home;