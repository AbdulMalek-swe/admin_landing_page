"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = () => {
  const route = useRouter();
  useEffect(()=>{
   route.push("/auth/log-in")
  },[])
  return (
    <div>
      
    </div>
  );
};

export default Home;