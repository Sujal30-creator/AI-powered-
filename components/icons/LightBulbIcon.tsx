
import React from 'react';

interface IconProps {
  className?: string;
}

const LightBulbIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a2.25 2.25 0 0 0 2.25 2.25h.01A2.25 2.25 0 0 0 12 21Zm-3.75 0V12.75M12 3v.01M12 3c2.485 0 4.5 2.015 4.5 4.5S14.485 12 12 12 7.5 9.985 7.5 7.5 9.515 3 12 3Zm0 0c.08.011.16.022.24.033M12 3a6.98 6.98 0 0 0-.24.033M12 3a6.98 6.98 0 0 1 .24.033m4.26 1.69A6.98 6.98 0 0 1 12 3.032M7.74 4.69A6.98 6.98 0 0 0 12 3.032M12 12v3.75m0-3.75a6.01 6.01 0 0 1 1.5-.189m-1.5.189a6.01 6.01 0 0 0-1.5-.189" />
  </svg>
);

export default LightBulbIcon;
