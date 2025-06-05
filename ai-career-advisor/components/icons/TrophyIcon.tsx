
import React from 'react';

interface IconProps {
  className?: string;
}

const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 12.75 9.75V5.25A2.25 2.25 0 0 0 10.5 3h-1.5a2.25 2.25 0 0 0-2.25 2.25v4.5A3.375 3.375 0 0 0 7.5 14.25v4.5m3.75-.75h2.25M11.25 3H10.5m1.5 0H12m0 0v1.5m0-1.5a2.25 2.25 0 0 0-2.25-2.25H7.5A2.25 2.25 0 0 0 5.25 3v1.5M12 3a2.25 2.25 0 0 1 2.25-2.25H16.5A2.25 2.25 0 0 1 18.75 3v1.5" />
  </svg>
);

export default TrophyIcon;
