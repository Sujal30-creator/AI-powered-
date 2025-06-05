
import React from 'react';

interface TestInputAreaProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const TestInputArea: React.FC<TestInputAreaProps> = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor="testInput" className="block text-sm font-medium text-gray-700 mb-1">
        Describe Your Interests & Skills
      </label>
      <textarea
        id="testInput"
        name="testInput"
        rows={6}
        className="mt-1 block w-full p-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm"
        placeholder={placeholder || "E.g., 'I enjoy solving complex math problems, coding in Python, and learning about new technologies. I'm strong in physics and logical reasoning.'"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-1 text-xs text-gray-500">This will help the AI understand your profile better.</p>
    </div>
  );
};

export default TestInputArea;
