
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    <p className="ml-3 text-gray-700">Loading recommendations...</p>
  </div>
);

export default LoadingSpinner;
