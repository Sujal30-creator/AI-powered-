
import React from 'react';
import { SubjectRecommendation } from '../types';
import LightBulbIcon from './icons/LightBulbIcon';

interface SubjectCardProps {
  recommendation: SubjectRecommendation;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <LightBulbIcon className="h-8 w-8 text-primary-500 mr-3" />
        <h3 className="text-xl font-semibold text-primary-700">{recommendation.subject}</h3>
      </div>
      <div className="space-y-2 text-gray-700">
        <div>
          <p className="font-medium text-gray-800">Reason:</p>
          <p className="text-sm">{recommendation.reason}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">Career Prospects:</p>
          <p className="text-sm">{recommendation.careerProspects}</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
