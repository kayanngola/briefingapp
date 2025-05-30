import QuestionnaireFlow from '../components/questionnaire/QuestionnaireFlow';

export default function Home() {
  return (
    // Updated main to use Tailwind classes for centering and overall page styling
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center py-8 px-4">
      {/* Removed the inner container div, QuestionnaireFlow will manage its own max-width */}
      <QuestionnaireFlow />
    </main>
  );
}
