 "use client"
 import React from 'react';
import dynamic from 'next/dynamic';
const ProjectCreatePostForm= dynamic(()=> import('@/components/banner/create'), { ssr: false });
 const Home = () => {
  return (
    <div>
      <ProjectCreatePostForm/>
    </div>
  );
 };
 
 export default Home;