import React from 'react';
import ShowProducts from '../components/ShowProducts';

const Home = ({ arrProducts }) => { 
  if (!Array.isArray(arrProducts)) {
    return <div className='h-screen border-2'>
      <div className='text-blue-800 text-3xl font-bold'>
      Loading products...
      </div>
      </div>
  }
  return (
    
    <div>
      <ShowProducts arrProducts={arrProducts} />
    </div>
  );
};

export default Home;
