export interface QuestionStep {
  id: number;
  title: string;
  questionText: string;
  type: string; // e.g., 'multiple-choice', 'single-select', 'text', 'number'
  options?: string[]; // Optional, for multiple-choice or single-select
  baseCost?: number;
  optionsCosts?: { [option: string]: number };
}

export const questionnaireData: QuestionStep[] = [
  {
    id: 1,
    title: "Project Type",
    questionText: "What type of project are you looking to develop?",
    type: "single-select",
    options: ["Website", "Mobile App", "Web App", "Desktop App"],
    optionsCosts: {
      "Website": 500,
      "Mobile App": 2000,
      "Web App": 1500,
      "Desktop App": 1000,
    },
  },
  {
    id: 2,
    title: "Desired Features",
    questionText: "What features are you looking for? (Select multiple)",
    type: "multiple-choice",
    options: ["User Authentication", "Payment Gateway", "Admin Panel", "Social Media Integration"],
    optionsCosts: {
      "User Authentication": 200,
      "Payment Gateway": 300,
      "Admin Panel": 400,
      "Social Media Integration": 150,
    },
  },
  {
    id: 3,
    title: "Project Complexity",
    questionText: "Describe the overall complexity of your project (e.g., simple, moderate, complex). This will help us estimate additional costs.",
    type: "text",
    baseCost: 100, // Base cost for any text input, can be adjusted based on input later
  },
  {
    id: 4,
    title: "Estimated Budget",
    questionText: "What is your estimated budget for this project? (This will not affect the calculated price but helps us understand your expectations)",
    type: "number",
  },
];
