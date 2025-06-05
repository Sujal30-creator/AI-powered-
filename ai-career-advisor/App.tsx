
import React, { useState, useCallback } from 'react';
import { EducationalLevel, SubjectRecommendation, Competition } from './types';
import { getSubjectRecommendations, getCompetitionInfo } from './services/geminiService';
import EducationalLevelSelector from './components/EducationalLevelSelector';
import TestInputArea from './components/TestInputArea';
import SubjectCard from './components/SubjectCard';
import CompetitionCard from './components/CompetitionCard';
import LoadingSpinner from './components/LoadingSpinner';
import AcademicCapIcon from './components/icons/AcademicCapIcon';

const App: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<EducationalLevel | ''>('');
  const [studentInput, setStudentInput] = useState<string>('');
  const [subjectRecommendations, setSubjectRecommendations] = useState<SubjectRecommendation[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    if (!selectedLevel || !studentInput.trim()) {
      setError("Please select your educational level and describe your interests/skills.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setShowResults(true);
    setSubjectRecommendations([]);
    setCompetitions([]);

    try {
      const recommendations = await getSubjectRecommendations(selectedLevel, studentInput);
      setSubjectRecommendations(recommendations);

      if (recommendations.length > 0) {
        const subjectNames = recommendations.map(r => r.subject);
        const competitionData = await getCompetitionInfo(subjectNames, selectedLevel);
        setCompetitions(competitionData);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLevel, studentInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <AcademicCapIcon className="h-12 w-12 text-primary-600" />
            <h1 className="ml-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              AI Career <span className="text-primary-600">Advisor</span>
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Discover your path: Get AI-powered subject and competition recommendations.
          </p>
        </header>

        <main className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-8">
          <section aria-labelledby="input-section-title">
            <h2 id="input-section-title" className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
              Tell Us About Yourself
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EducationalLevelSelector selectedLevel={selectedLevel} onChange={setSelectedLevel} />
              <TestInputArea value={studentInput} onChange={setStudentInput} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !selectedLevel || !studentInput.trim()}
              className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isLoading ? 'Analyzing...' : 'Get Recommendations'}
            </button>
          </section>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {showResults && (
            <>
              {isLoading && <LoadingSpinner />}

              {!isLoading && subjectRecommendations.length > 0 && (
                <section aria-labelledby="recommendations-title" className="mt-10">
                  <h2 id="recommendations-title" className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
                    Recommended Subjects
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {subjectRecommendations.map((rec, index) => (
                      <SubjectCard key={index} recommendation={rec} />
                    ))}
                  </div>
                </section>
              )}

              {!isLoading && competitions.length > 0 && (
                <section aria-labelledby="competitions-title" className="mt-10">
                  <h2 id="competitions-title" className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
                    Relevant Competitions & Challenges
                  </h2>
                   <p className="text-sm text-gray-600 mb-4">Note: Competition details are AI-generated examples and may not reflect real-time availability.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {competitions.map((comp, index) => (
                      <CompetitionCard key={index} competition={comp} />
                    ))}
                  </div>
                </section>
              )}
              
              {!isLoading && !error && subjectRecommendations.length === 0 && competitions.length === 0 && (
                 <div className="text-center py-8 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <p>No recommendations found based on your input. Try refining your description.</p>
                  </div>
              )}
            </>
          )}
        </main>
        <footer className="text-center mt-12 py-4">
          <p className="text-sm text-gray-500">
            Powered by Gemini AI. &copy; {new Date().getFullYear()} AI Career Advisor.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
