
import React from 'react';
import { Competition } from '../types';
import TrophyIcon from './icons/TrophyIcon';

interface CompetitionCardProps {
  competition: Competition;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <TrophyIcon className="h-8 w-8 text-amber-500 mr-3" />
        <h3 className="text-xl font-semibold text-amber-700">{competition.name}</h3>
      </div>
      <p className="text-sm text-gray-700 mb-2">{competition.description}</p>
      <a
        href={competition.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
      >
        Learn More &rarr;
      </a>
    </div>
  );
};

export default CompetitionCard;
