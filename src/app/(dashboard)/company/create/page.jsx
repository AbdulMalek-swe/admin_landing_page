"use client"
import React from 'react';
import dynamic from 'next/dynamic';
const CreatePostForm = dynamic(()=> import('@/components/company/create'), { ssr: false });
const page = () => {
  return (
    <div>
      <CreatePostForm/>
    </div>
  );
};

export default page;