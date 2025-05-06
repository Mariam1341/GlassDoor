import React, { useState } from 'react';

export const ExamForm = ({ examData, onSubmit }) =>{
  const [answers, setAnswers] = useState({});
  // let examData = {
  //   "examTitle": "Java Fundamentals Quiz",
  //   "questions": [
  //     {
  //       "questionText": "Which of the following is NOT a primitive data type in Java?",
  //       "options": [
  //         "int",
  //         "boolean",
  //         "String",
  //         "double"
  //       ],
  //       "correctAnswer": "String",
  //       "explanation": "String is a class in Java, representing a sequence of characters.  int, boolean, and double are primitive data types."
  //     },
  //     {
  //       "questionText": "What is the purpose of the 'static' keyword in Java?",
  //       "options": [
  //         "To make a variable constant.",
  //         "To make a method or variable belong to the class itself, rather than an instance of the class.",
  //         "To create an object.",
  //         "To prevent a class from being inherited."
  //       ],
  //       "correctAnswer": "To make a method or variable belong to the class itself, rather than an instance of the class.",
  //       "explanation": "The 'static' keyword makes a member (method or variable) associated with the class, not with instances of the class. It can be accessed directly using the class name."
  //     },
  //     {
  //       "questionText": "Which of the following is the correct way to declare and initialize an array of integers with 5 elements in Java?",
  //       "options": [
  //         "int array[] = new int[5];",
  //         "int[] array = {1, 2, 3, 4, 5};",
  //         "int array[5];",
  //         "Both A and B"
  //       ],
  //       "correctAnswer": "Both A and B",
  //       "explanation": "Both 'int array[] = new int[5];' and 'int[] array = {1, 2, 3, 4, 5};' are valid ways to declare and initialize an array of integers in Java.  The first initializes an array with a fixed size, the second initializes with specific values."
  //     }
  //   ]
  // }

  const handleChange = (index, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(answers);
    console.log('Submitted Answers:', answers);
  };

  if (!examData || !examData.questions) {
    return <p>No exam data available.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{examData.examTitle || 'Exam'}</h2>
      {examData.questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p><strong>{index + 1}. {q.questionText}</strong></p>
          {q.options.map((option, optIndex) => (
            <div key={optIndex}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleChange(index, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit Answers</button>
    </form>
  );
}


export default ExamForm;
