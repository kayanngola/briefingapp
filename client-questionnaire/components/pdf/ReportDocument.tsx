'use client'; // Ensure this component can be used in client-side rendering contexts

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { QuestionStep } from '../../data/questionnaireSteps'; // Adjust path as needed

// Register a simple font (optional, but good for consistency)
// You might need to host this font or ensure it's available
// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
// });

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica', // Using a default font
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#444',
  },
  questionBlock: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  questionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#555',
  },
  answerText: {
    fontSize: 11,
    color: '#666',
  },
  finalPriceSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    textAlign: 'right',
  },
  finalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF', // Blue color for price
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey',
  }
});

interface ReportDocumentProps {
  answers: Record<number, any>;
  questions: QuestionStep[];
  finalPrice: number;
}

const ReportDocument: React.FC<ReportDocumentProps> = ({ answers, questions, finalPrice }) => {
  const getAnswerDisplay = (question: QuestionStep, answer: any): string => {
    if (answer === undefined || answer === null) return 'Not answered';
    if (question.type === 'multiple-choice' && Array.isArray(answer)) {
      return answer.join(', ');
    }
    if (typeof answer === 'object' && answer !== null) {
      return JSON.stringify(answer);
    }
    return String(answer);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Software Project Brief Report</Text>

        <Text style={styles.sectionTitle}>Project Requirements:</Text>
        {questions.map((question) => {
          // Exclude budget question from the main report details if it's only for reference
          if (question.title === "Estimated Budget") return null; 

          const answer = answers[question.id];
          return (
            <View key={question.id} style={styles.questionBlock} wrap={false}>
              <Text style={styles.questionTitle}>{question.title}:</Text>
              <Text style={styles.answerText}>
                {getAnswerDisplay(question, answer)}
              </Text>
            </View>
          );
        })}

        <View style={styles.finalPriceSection}>
          <Text style={styles.finalPriceText}>
            Estimated Total Price: ${finalPrice.toFixed(2)}
          </Text>
        </View>
        
        <Text style={styles.footer} fixed>
          Generated on: {new Date().toLocaleDateString()} - This is an automated estimate.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportDocument;
