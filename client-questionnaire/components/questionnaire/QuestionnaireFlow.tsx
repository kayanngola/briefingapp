'use client'; // Required for Next.js 13+ App Router components using hooks

'use client'; // This comment might already be here or at the top

import React, { useState, useEffect } from 'react'; // Added useEffect
import { questionnaireData, QuestionStep } from '../../data/questionnaireSteps';
import QuestionCard from './QuestionCard';
import ProgressBar from '../gamification/ProgressBar';
import { calculateTotalPrice } from '../../utils/calculatePrice';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink
import ReportDocument from '../pdf/ReportDocument'; // Import ReportDocument

const QuestionnaireFlow: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering for PDFLink

  useEffect(() => {
    setIsClient(true); // Set to true after component mounts
  }, []);

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < questionnaireData.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Calculate and log final price
      const calculatedPrice = calculateTotalPrice(answers, questionnaireData);
      setFinalPrice(calculatedPrice);
      console.log("Questionnaire finished. Answers:", answers);
      console.log("Calculated Total Price:", calculatedPrice);
      alert(`Questionnaire finished! Calculated Price: $${calculatedPrice}. Check console for more details.`);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentQuestion: QuestionStep = questionnaireData[currentStepIndex];
  const totalSteps = questionnaireData.length;

  // Main container for the entire questionnaire flow
  const baseContainerStyles = "w-full max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl";

  if (finalPrice !== null) {
    return (
      <div className={`${baseContainerStyles} text-center`}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-700 dark:text-slate-200">Questionnaire Complete!</h1>
        <p className="text-lg sm:text-xl mb-4 text-slate-600 dark:text-slate-300">Thank you for providing your requirements.</p>
        <p className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">
          Estimated Project Price: ${finalPrice.toFixed(2)}
        </p>
        <div className="mb-8 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/50">
          <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200">Summary of Answers:</h3>
          <pre className="text-sm text-left whitespace-pre-wrap break-all p-3 bg-white dark:bg-slate-800 rounded shadow-inner text-slate-600 dark:text-slate-300">{JSON.stringify(answers, null, 2)}</pre>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {isClient && ( 
            <PDFDownloadLink
              document={<ReportDocument answers={answers} questions={questionnaireData} finalPrice={finalPrice} />}
              fileName="ProjectBrief_Report.pdf"
              className="w-full sm:w-auto inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:ring-2 focus:ring-green-400"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF Report')}
            </PDFDownloadLink>
          )}
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setAnswers({});
              setFinalPrice(null);
            }}
            className="w-full sm:w-auto px-8 py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:ring-2 focus:ring-slate-400"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={baseContainerStyles}>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-slate-700 dark:text-slate-200">
        Client Questionnaire
      </h1>
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
      <QuestionCard
        questionStep={currentQuestion}
        onAnswerChange={handleAnswerChange}
        currentAnswer={answers[currentQuestion.id]}
      />
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="px-6 py-3 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 focus:ring-2 focus:ring-slate-400"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 focus:ring-2 focus:ring-blue-400"
        >
          {currentStepIndex === questionnaireData.length - 1 ? 'Finish & See Price' : 'Next'}
        </button>
      </div>
      {/* Optional: Display current answers for debugging
      <div className="mt-8 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold">Current Answers:</h3>
        <pre className="text-sm">{JSON.stringify(answers, null, 2)}</pre>
      </div>
      */}
    </div>
  );
};

export default QuestionnaireFlow;
