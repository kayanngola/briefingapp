import { QuestionStep } from '../data/questionnaireSteps';

export function calculateTotalPrice(
  answers: Record<number, any>,
  questions: QuestionStep[]
): number {
  let totalPrice = 0;

  for (const questionIdStr in answers) {
    const questionId = parseInt(questionIdStr, 10);
    const answer = answers[questionId];
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      console.warn(`Question with ID ${questionId} not found.`);
      continue;
    }

    // Add base cost for the question itself, if any
    if (question.baseCost) {
      // For "text" type, we add baseCost regardless of answer content for now.
      // For other types, baseCost might apply if it's a general cost for attempting the question.
      if (question.type === 'text' && answer) { // Only add if there's an answer for text type
         totalPrice += question.baseCost;
      } else if (question.type !== 'text') { // For non-text types, add if defined
         totalPrice += question.baseCost;
      }
    }

    if (question.optionsCosts) {
      if (question.type === 'single-select' && typeof answer === 'string') {
        if (question.optionsCosts[answer]) {
          totalPrice += question.optionsCosts[answer];
        }
      } else if (question.type === 'multiple-choice' && Array.isArray(answer)) {
        answer.forEach((selectedOption: string) => {
          if (question.optionsCosts && question.optionsCosts[selectedOption]) {
            totalPrice += question.optionsCosts[selectedOption];
          }
        });
      }
    }
  }

  return totalPrice;
}
