require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const QuizQuestion = require('./models/QuizQuestion');
    const tenantId = new mongoose.Types.ObjectId('697a3d4173c9d3c273aef570');
    const instructorId = new mongoose.Types.ObjectId('697a3c92903954e2291a2d89');

    // Load previously generated questions
    const file1 = JSON.parse(fs.readFileSync('/Users/itity/.gemini/antigravity-ide/brain/6d482ce6-c470-4068-95ae-a29499cca318/dsa_quiz_questions.json', 'utf8'));
    const file2 = JSON.parse(fs.readFileSync('/Users/itity/.gemini/antigravity-ide/brain/6d482ce6-c470-4068-95ae-a29499cca318/dsa_operations_quiz_questions.json', 'utf8'));

    // Create 4 display questions
    const displayQuestions = [
      {
        title: "SLL: Display from Head to Tail. Which loop accurately traverses a Singly Linked List to print every element?",
        topic: "Singly Linked List",
        difficulty: "easy",
        language: "cpp",
        codeSnippet: "void display(Node* head) {\n    Node* temp = head;\n    while (________) {\n        cout << temp->data << \" \";\n        temp = temp->next;\n    }\n}",
        options: [
          { text: "temp->next != NULL" },
          { text: "temp != NULL" },
          { text: "temp->next == NULL" },
          { text: "temp == NULL" }
        ],
        correctAnswer: 1,
        tags: ["sll", "display", "code-snippet"]
      },
      {
        title: "DLL: Display from Head to Tail. Traversing a Doubly Linked List is identical to an SLL in the forward direction. Which property allows printing it in reverse?",
        topic: "Doubly Linked List",
        difficulty: "easy",
        options: [
          { text: "The tail pointer automatically prints in reverse." },
          { text: "Using the 'prev' pointer, starting from the last node until reaching NULL." },
          { text: "The 'next' pointer wraps around." },
          { text: "It cannot be printed in reverse." }
        ],
        correctAnswer: 1,
        tags: ["dll", "display", "theory"]
      },
      {
        title: "SCLL: Display from Head to Tail. How do you prevent an infinite loop while printing a Singly Circular Linked List?",
        topic: "Singly Circular Linked List",
        difficulty: "medium",
        language: "cpp",
        codeSnippet: "void display(Node* head) {\n    if (!head) return;\n    Node* temp = head;\n    do {\n        cout << temp->data << \" \";\n        temp = temp->next;\n    } while (________);\n}",
        options: [
          { text: "temp != NULL" },
          { text: "temp->next != NULL" },
          { text: "temp != head" },
          { text: "temp->next != head" }
        ],
        correctAnswer: 2,
        tags: ["scll", "display", "code-snippet"]
      },
      {
        title: "DCLL: Display from Head to Tail. What is true about displaying elements of a Doubly Circular Linked List?",
        topic: "Doubly Circular Linked List",
        difficulty: "medium",
        options: [
          { text: "You can traverse continuously in either direction (next or prev) without ever hitting NULL." },
          { text: "You must always hit a NULL pointer at the end." },
          { text: "It can only be traversed forward, not backward." },
          { text: "It requires two separate loops to print." }
        ],
        correctAnswer: 0,
        tags: ["dcll", "display", "theory"]
      }
    ];

    const allQuestions = [...file1, ...file2, ...displayQuestions];

    // Format for DB
    const dbQuestions = allQuestions.map(q => ({
      title: q.title,
      topic: q.topic || 'Data Structures',
      difficulty: q.difficulty || 'medium',
      codeSnippet: q.codeSnippet || '',
      language: q.language || '',
      options: q.options,
      correctAnswer: q.correctAnswer,
      tags: q.tags || [],
      tenant: tenantId,
      createdBy: instructorId
    }));

    const result = await QuizQuestion.insertMany(dbQuestions);
    console.log(`Successfully inserted ${result.length} questions into the database.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seed();
