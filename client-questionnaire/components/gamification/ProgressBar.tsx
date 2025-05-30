import React from 'react';

interface ProgressBarProps {
  currentStep: number; // Current step (0-indexed or 1-indexed)
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const effectiveCurrentStep = Math.min(currentStep, totalSteps);
  const progressPercentage = totalSteps > 0 ? (effectiveCurrentStep / totalSteps) * 100 : 0;

  return (
    <div className="mb-8"> {/* Increased margin bottom for more spacing */}
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 shadow-inner"> {/* Slightly thicker bar, added shadow */}
        <div
          className="bg-blue-500 dark:bg-blue-400 h-3 rounded-full transition-all duration-500 ease-in-out" // Smoother transition
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="sr-only">{progressPercentage.toFixed(0)}% Complete</span> {/* Accessibility */}
        </div>
      </div>
      <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-1">
        Step {effectiveCurrentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
