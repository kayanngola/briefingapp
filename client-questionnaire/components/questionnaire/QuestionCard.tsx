import React from 'react';
import { QuestionStep } from '../../data/questionnaireSteps';

interface QuestionCardProps {
  questionStep: QuestionStep;
  onAnswerChange: (questionId: number, answer: any) => void;
  currentAnswer: any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionStep, onAnswerChange, currentAnswer }) => {
  const { id, title, questionText, type, options } = questionStep;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onAnswerChange(id, e.target.value);
  };

  const handleOptionChange = (option: string) => {
    if (type === 'multiple-choice') {
      const newAnswers = currentAnswer ? [...currentAnswer] : [];
      if (newAnswers.includes(option)) {
        onAnswerChange(id, newAnswers.filter(ans => ans !== option));
      } else {
        onAnswerChange(id, [...newAnswers, option]);
      }
    } else {
      onAnswerChange(id, option);
    }
  };

  const inputBaseClasses = "mt-1 block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500";

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-700/30 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">{title}</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-300 text-base leading-relaxed">{questionText}</p>

      {type === 'text' && (
        <textarea
          rows={3}
          value={currentAnswer || ''}
          onChange={handleInputChange}
          className={`${inputBaseClasses} resize-none`}
          placeholder="Your answer here..."
        />
      )}

      {type === 'number' && (
        <input
          type="number"
          value={currentAnswer || ''}
          onChange={handleInputChange}
          className={inputBaseClasses}
          placeholder="Enter a number"
        />
      )}

      {(type === 'single-select' || type === 'multiple-choice') && options && (
        <div className="space-y-3">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center p-3 bg-white dark:bg-slate-600 rounded-md shadow-sm border border-slate-200 dark:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors cursor-pointer"
            >
              <input
                type={type === 'single-select' ? 'radio' : 'checkbox'}
                name={type === 'single-select' ? `question-${id}` : `question-${id}-${option}`} // Ensure unique names for checkboxes if needed, or group by name for radio
                value={option}
                checked={
                  type === 'multiple-choice'
                    ? currentAnswer?.includes(option)
                    : currentAnswer === option
                }
                onChange={() => handleOptionChange(option)}
                className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 focus:ring-blue-500 dark:focus:ring-blue-500"
              />
              <span className="ml-3 text-slate-700 dark:text-slate-200">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
