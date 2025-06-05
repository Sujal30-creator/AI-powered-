
import React from 'react';
import { EducationalLevel } from '../types';
import { EDUCATIONAL_LEVELS } from '../constants';

interface EducationalLevelSelectorProps {
  selectedLevel: EducationalLevel | '';
  onChange: (level: EducationalLevel) => void;
}

const EducationalLevelSelector: React.FC<EducationalLevelSelectorProps> = ({ selectedLevel, onChange }) => {
  return (
    <div>
      <label htmlFor="educationalLevel" className="block text-sm font-medium text-gray-700 mb-1">
        Select Your Educational Level
      </label>
      <select
        id="educationalLevel"
        name="educationalLevel"
        value={selectedLevel}
        onChange={(e) => onChange(e.target.value as EducationalLevel)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm"
      >
        <option value="" disabled>-- Select Level --</option>
        {EDUCATIONAL_LEVELS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EducationalLevelSelector;
