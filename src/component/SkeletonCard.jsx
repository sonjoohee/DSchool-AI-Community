import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='w-full p-3 pr-8 animate-pulse'>
      <div className='w-full h-fit mb-5'>
        <div className='flex mb-2 space-x-2 items-center'>
          <div className='h-5 bg-gray-300 rounded w-3/4'></div>
          <div className='h-4 bg-gray-300 rounded w-16'></div>
          <div className='h-4 bg-gray-300 rounded w-8'></div>
        </div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-300 rounded w-full'></div>
          <div className='h-4 bg-gray-300 rounded w-5/6'></div>
        </div>
      </div>
      <div className='w-full h-0.5 bg-gray-300' />
    </div>
  );
};

export default SkeletonCard;