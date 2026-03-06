const mongoose = require('mongoose');
const Lab = require('../models/Lab');
require('dotenv').config();

const sampleLabs = [
  {
    title: 'C Hello World Program',
    description: 'Write your first C program to print Hello World',
    difficulty: 'Easy',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Learn C syntax', 'Use printf function', 'Understand main function'],
      requirements: ['Include stdio.h header', 'Print "Hello, World!"', 'Return 0 from main'],
      constraints: ['Use standard library only'],
      deliverables: ['main.c']
    },
    testCases: [{ input: '', expectedOutput: 'Hello, World!', isPublic: true }],
    initialFiles: [
      { path: 'main.c', content: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 15,
    points: 50
  },
  {
    title: 'C Variables and Data Types',
    description: 'Demonstrate different data types in C',
    difficulty: 'Easy',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Declare variables', 'Use different data types', 'Print formatted output'],
      requirements: ['Declare int, float, char variables', 'Assign values', 'Print using printf with format specifiers'],
      constraints: ['Use standard data types'],
      deliverables: ['variables.c']
    },
    testCases: [{ input: '', expectedOutput: 'Integer: 10\nFloat: 3.14\nChar: A', isPublic: true }],
    initialFiles: [
      { path: 'variables.c', content: '#include <stdio.h>\n\nint main() {\n    // Declare and initialize variables\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'C Arithmetic Operations',
    description: 'Perform basic arithmetic operations',
    difficulty: 'Easy',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Use arithmetic operators', 'Perform calculations', 'Display results'],
      requirements: ['Take two numbers', 'Perform +, -, *, /, % operations', 'Print results'],
      constraints: ['Use int data type'],
      deliverables: ['arithmetic.c']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2\nRemainder: 0', isPublic: true }],
    initialFiles: [
      { path: 'arithmetic.c', content: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 5;\n    // Perform operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'C If-Else Statements',
    description: 'Implement conditional statements',
    difficulty: 'Easy',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Use if-else statements', 'Make decisions', 'Compare values'],
      requirements: ['Check if number is positive/negative/zero', 'Find largest of three numbers', 'Check even or odd'],
      constraints: ['Use conditional operators'],
      deliverables: ['conditions.c']
    },
    testCases: [{ input: '', expectedOutput: 'Positive\nLargest: 30\nEven', isPublic: true }],
    initialFiles: [
      { path: 'conditions.c', content: '#include <stdio.h>\n\nint main() {\n    // Write conditional statements\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'C Loops - For and While',
    description: 'Use loops to iterate',
    difficulty: 'Easy',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Use for loop', 'Use while loop', 'Implement loop control'],
      requirements: ['Print numbers 1 to 10', 'Calculate factorial', 'Print multiplication table'],
      constraints: ['Use both for and while loops'],
      deliverables: ['loops.c']
    },
    testCases: [{ input: '', expectedOutput: 'Numbers: 1 2 3 4 5 6 7 8 9 10\nFactorial: 120', isPublic: true }],
    initialFiles: [
      { path: 'loops.c', content: '#include <stdio.h>\n\nint main() {\n    // Write loops\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'C Arrays',
    description: 'Work with arrays in C',
    difficulty: 'Medium',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Declare arrays', 'Access array elements', 'Iterate through arrays'],
      requirements: ['Create an array of 5 integers', 'Find sum and average', 'Find largest element', 'Reverse the array'],
      constraints: ['Use single dimensional arrays'],
      deliverables: ['arrays.c']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 50\nAverage: 10.00\nLargest: 20\nReversed: 20 15 10 5 0', isPublic: true }],
    initialFiles: [
      { path: 'arrays.c', content: '#include <stdio.h>\n\nint main() {\n    int arr[5] = {0, 5, 10, 15, 20};\n    // Work with array\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'C Strings',
    description: 'Manipulate strings in C',
    difficulty: 'Medium',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Work with character arrays', 'Use string functions', 'String manipulation'],
      requirements: ['Find string length', 'Copy string', 'Concatenate strings', 'Compare strings', 'Reverse string'],
      constraints: ['Use string.h functions'],
      deliverables: ['strings.c']
    },
    testCases: [{ input: '', expectedOutput: 'Length: 5\nCopied: Hello\nReversed: olleH', isPublic: true }],
    initialFiles: [
      { path: 'strings.c', content: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100] = "Hello";\n    // String operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'C Functions',
    description: 'Create and use functions',
    difficulty: 'Medium',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Define functions', 'Pass parameters', 'Return values'],
      requirements: ['Create function to add two numbers', 'Create function to check prime', 'Create function for factorial', 'Call functions from main'],
      constraints: ['Use function prototypes'],
      deliverables: ['functions.c']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nPrime: Yes\nFactorial: 120', isPublic: true }],
    initialFiles: [
      { path: 'functions.c', content: '#include <stdio.h>\n\n// Function prototypes\n\nint main() {\n    // Call functions\n    return 0;\n}\n\n// Function definitions', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'C Pointers',
    description: 'Understand and use pointers',
    difficulty: 'Medium',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Declare pointers', 'Use address operator', 'Dereference pointers'],
      requirements: ['Declare pointer variables', 'Store address of variables', 'Access values using pointers', 'Swap two numbers using pointers'],
      constraints: ['Use pointer operators'],
      deliverables: ['pointers.c']
    },
    testCases: [{ input: '', expectedOutput: 'Value: 10\nAddress: 0x...\nSwapped: a=20, b=10', isPublic: true }],
    initialFiles: [
      { path: 'pointers.c', content: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    int *ptr;\n    // Use pointers\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'C Structures',
    description: 'Create and use structures',
    difficulty: 'Medium',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Define structures', 'Access structure members', 'Array of structures'],
      requirements: ['Create Student structure', 'Store student details', 'Display student information', 'Create array of structures'],
      constraints: ['Use structure keyword'],
      deliverables: ['structures.c']
    },
    testCases: [{ input: '', expectedOutput: 'Name: John\nRoll: 101\nMarks: 85.5', isPublic: true }],
    initialFiles: [
      { path: 'structures.c', content: '#include <stdio.h>\n\nstruct Student {\n    // Define members\n};\n\nint main() {\n    // Use structure\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'C File Handling',
    description: 'Read and write files in C',
    difficulty: 'Hard',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Open files', 'Read from files', 'Write to files', 'Close files'],
      requirements: ['Create a file', 'Write data to file', 'Read data from file', 'Count lines in file', 'Handle file errors'],
      constraints: ['Use file pointers'],
      deliverables: ['fileio.c']
    },
    testCases: [{ input: '', expectedOutput: 'File created\nData written\nData read: Hello World\nLines: 3', isPublic: true }],
    initialFiles: [
      { path: 'fileio.c', content: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    // File operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C Dynamic Memory Allocation',
    description: 'Use malloc, calloc, realloc, and free',
    difficulty: 'Hard',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Allocate memory dynamically', 'Use malloc and calloc', 'Free memory'],
      requirements: ['Allocate memory for array using malloc', 'Allocate memory using calloc', 'Reallocate memory', 'Free allocated memory'],
      constraints: ['Use stdlib.h functions'],
      deliverables: ['dynamic_memory.c']
    },
    testCases: [{ input: '', expectedOutput: 'Memory allocated\nArray: 1 2 3 4 5\nMemory freed', isPublic: true }],
    initialFiles: [
      { path: 'dynamic_memory.c', content: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n    // Dynamic memory allocation\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C Recursion',
    description: 'Implement recursive functions',
    difficulty: 'Hard',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Understand recursion', 'Implement recursive functions', 'Base case and recursive case'],
      requirements: ['Factorial using recursion', 'Fibonacci using recursion', 'Sum of digits using recursion', 'Tower of Hanoi'],
      constraints: ['Use recursive approach'],
      deliverables: ['recursion.c']
    },
    testCases: [{ input: '', expectedOutput: 'Factorial: 120\nFibonacci: 0 1 1 2 3 5 8\nSum: 15', isPublic: true }],
    initialFiles: [
      { path: 'recursion.c', content: '#include <stdio.h>\n\n// Recursive functions\n\nint main() {\n    // Call recursive functions\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C Linked List Implementation',
    description: 'Create and manipulate a singly linked list',
    difficulty: 'Hard',
    technology: 'C',
    category: 'c',
    srs: {
      objectives: ['Create linked list', 'Insert nodes', 'Delete nodes', 'Traverse list'],
      requirements: ['Define node structure', 'Insert at beginning', 'Insert at end', 'Delete node', 'Display list'],
      constraints: ['Use dynamic memory allocation'],
      deliverables: ['linked_list.c']
    },
    testCases: [{ input: '', expectedOutput: 'List: 10 -> 20 -> 30\nAfter deletion: 10 -> 30', isPublic: true }],
    initialFiles: [
      { path: 'linked_list.c', content: '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    // Linked list operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'GCC', command: 'gcc', versionCommand: 'gcc --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'C++ Hello World Program',
    description: 'Write your first C++ program',
    difficulty: 'Easy',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Learn C++ syntax', 'Use cout', 'Understand namespace'],
      requirements: ['Include iostream', 'Print "Hello, World!"', 'Use std namespace'],
      constraints: ['Use standard library'],
      deliverables: ['main.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Hello, World!', isPublic: true }],
    initialFiles: [
      { path: 'main.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 15,
    points: 50
  },
  {
    title: 'C++ Variables and Data Types',
    description: 'Work with different data types',
    difficulty: 'Easy',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Declare variables', 'Use different data types', 'Type casting'],
      requirements: ['Declare int, float, double, char, bool', 'Assign values', 'Print using cout'],
      constraints: ['Use standard data types'],
      deliverables: ['variables.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Integer: 10\nFloat: 3.14\nChar: A\nBoolean: 1', isPublic: true }],
    initialFiles: [
      { path: 'variables.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare variables\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'C++ Operators',
    description: 'Use arithmetic, relational, and logical operators',
    difficulty: 'Easy',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Use arithmetic operators', 'Apply relational operators', 'Implement logical operators'],
      requirements: ['Perform arithmetic operations', 'Compare values', 'Use logical operators', 'Bitwise operators'],
      constraints: ['Use C++ operators'],
      deliverables: ['operators.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nProduct: 50\nComparison: 1\nLogical: 0', isPublic: true }],
    initialFiles: [
      { path: 'operators.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Use operators\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'C++ Control Statements',
    description: 'Implement if-else and switch statements',
    difficulty: 'Easy',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Use if-else statements', 'Implement switch-case', 'Nested conditions'],
      requirements: ['Check positive/negative/zero', 'Find largest of three', 'Calculator using switch', 'Check leap year'],
      constraints: ['Use control statements'],
      deliverables: ['control.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Positive\nLargest: 30\nResult: 15\nLeap Year', isPublic: true }],
    initialFiles: [
      { path: 'control.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Control statements\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'C++ Loops',
    description: 'Use for, while, and do-while loops',
    difficulty: 'Easy',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Use for loop', 'Use while loop', 'Use do-while loop', 'Nested loops'],
      requirements: ['Print numbers 1 to 10', 'Calculate factorial', 'Print patterns', 'Fibonacci series'],
      constraints: ['Use all loop types'],
      deliverables: ['loops.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Numbers: 1 2 3 4 5 6 7 8 9 10\nFactorial: 120\nFibonacci: 0 1 1 2 3 5 8', isPublic: true }],
    initialFiles: [
      { path: 'loops.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Loops\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'C++ Arrays',
    description: 'Work with single and multi-dimensional arrays',
    difficulty: 'Medium',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Declare arrays', 'Access elements', 'Multi-dimensional arrays'],
      requirements: ['Create array', 'Find sum and average', 'Find largest element', 'Sort array', '2D array operations'],
      constraints: ['Use array operations'],
      deliverables: ['arrays.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 50\nAverage: 10\nLargest: 20\nSorted: 0 5 10 15 20', isPublic: true }],
    initialFiles: [
      { path: 'arrays.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 5, 20, 15, 0};\n    // Array operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'C++ Strings',
    description: 'Manipulate strings using string class',
    difficulty: 'Medium',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Use string class', 'String methods', 'String manipulation'],
      requirements: ['Find length', 'Concatenate strings', 'Compare strings', 'Reverse string', 'Check palindrome'],
      constraints: ['Use string class'],
      deliverables: ['strings.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Length: 5\nConcatenated: HelloWorld\nReversed: olleH\nPalindrome: true', isPublic: true }],
    initialFiles: [
      { path: 'strings.cpp', content: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str = "Hello";\n    // String operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'C++ Functions',
    description: 'Create and use functions',
    difficulty: 'Medium',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Define functions', 'Function overloading', 'Default arguments', 'Inline functions'],
      requirements: ['Create functions with parameters', 'Function overloading', 'Default parameters', 'Return values', 'Inline functions'],
      constraints: ['Use function features'],
      deliverables: ['functions.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nOverloaded: 30\nDefault: 10\nInline: 25', isPublic: true }],
    initialFiles: [
      { path: 'functions.cpp', content: '#include <iostream>\nusing namespace std;\n\n// Function declarations\n\nint main() {\n    // Call functions\n    return 0;\n}\n\n// Function definitions', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'C++ Pointers',
    description: 'Understand and use pointers',
    difficulty: 'Medium',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Declare pointers', 'Pointer arithmetic', 'Pointers and arrays', 'Pointer to pointer'],
      requirements: ['Declare pointers', 'Dereference pointers', 'Pointer arithmetic', 'Swap using pointers', 'Dynamic memory'],
      constraints: ['Use pointer operations'],
      deliverables: ['pointers.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Value: 10\nAddress: 0x...\nSwapped: a=20, b=10\nArray: 1 2 3', isPublic: true }],
    initialFiles: [
      { path: 'pointers.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n    int *ptr;\n    // Pointer operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'C++ References',
    description: 'Use references and reference variables',
    difficulty: 'Medium',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Declare references', 'Pass by reference', 'Reference vs pointer'],
      requirements: ['Create reference variables', 'Pass by reference to functions', 'Swap using references', 'Return by reference'],
      constraints: ['Use references'],
      deliverables: ['references.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Reference: 10\nSwapped: a=20, b=10\nModified: 100', isPublic: true }],
    initialFiles: [
      { path: 'references.cpp', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    int &ref = a;\n    // Reference operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'C++ Classes and Objects',
    description: 'Implement OOP with classes',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Define classes', 'Create objects', 'Constructors and destructors', 'Access specifiers'],
      requirements: ['Create class with data members', 'Define constructors', 'Member functions', 'Access specifiers', 'Create objects'],
      constraints: ['Use OOP principles'],
      deliverables: ['classes.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Student: John, Roll: 101\nConstructor called\nDestructor called', isPublic: true }],
    initialFiles: [
      { path: 'classes.cpp', content: '#include <iostream>\nusing namespace std;\n\nclass Student {\n    // Define class\n};\n\nint main() {\n    // Create objects\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'C++ Inheritance',
    description: 'Implement inheritance and polymorphism',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Single inheritance', 'Multiple inheritance', 'Method overriding', 'Virtual functions'],
      requirements: ['Create base and derived classes', 'Single and multiple inheritance', 'Override methods', 'Use virtual functions'],
      constraints: ['Use inheritance'],
      deliverables: ['inheritance.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Base class\nDerived class\nOverridden method\nVirtual function', isPublic: true }],
    initialFiles: [
      { path: 'inheritance.cpp', content: '#include <iostream>\nusing namespace std;\n\nclass Base {\n    // Base class\n};\n\nclass Derived : public Base {\n    // Derived class\n};\n\nint main() {\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C++ Operator Overloading',
    description: 'Overload operators for custom classes',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Overload operators', 'Binary operators', 'Unary operators', 'Friend functions'],
      requirements: ['Overload + operator', 'Overload ++ operator', 'Overload << operator', 'Use friend functions'],
      constraints: ['Use operator overloading'],
      deliverables: ['operator_overload.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nIncremented: 11\nOutput: Complex(5, 3)', isPublic: true }],
    initialFiles: [
      { path: 'operator_overload.cpp', content: '#include <iostream>\nusing namespace std;\n\nclass Complex {\n    // Define class\n};\n\nint main() {\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C++ Templates',
    description: 'Create function and class templates',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Function templates', 'Class templates', 'Template specialization'],
      requirements: ['Create function template', 'Create class template', 'Use templates with different types', 'Template specialization'],
      constraints: ['Use templates'],
      deliverables: ['templates.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Max int: 20\nMax float: 3.14\nArray: 1 2 3 4 5', isPublic: true }],
    initialFiles: [
      { path: 'templates.cpp', content: '#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C++ STL - Vectors and Iterators',
    description: 'Use Standard Template Library containers',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['Use vector container', 'Iterators', 'STL algorithms'],
      requirements: ['Create vector', 'Add and remove elements', 'Use iterators', 'Sort vector', 'Use STL algorithms'],
      constraints: ['Use STL'],
      deliverables: ['stl.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'Vector: 10 20 30\nSorted: 10 20 30\nFound: 20', isPublic: true }],
    initialFiles: [
      { path: 'stl.cpp', content: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    // STL operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'C++ File Handling',
    description: 'Read and write files',
    difficulty: 'Hard',
    technology: 'C++',
    category: 'cpp',
    srs: {
      objectives: ['File I/O operations', 'Read from files', 'Write to files'],
      requirements: ['Create file', 'Write data', 'Read data', 'Append to file', 'Handle file errors'],
      constraints: ['Use fstream'],
      deliverables: ['fileio.cpp']
    },
    testCases: [{ input: '', expectedOutput: 'File created\nData written\nData read: Hello World\nLines: 3', isPublic: true }],
    initialFiles: [
      { path: 'fileio.cpp', content: '#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main() {\n    // File operations\n    return 0;\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'G++', command: 'g++', versionCommand: 'g++ --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'Java Hello World Program',
    description: 'Write your first Java program',
    difficulty: 'Easy',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Learn Java syntax', 'Use System.out.println', 'Understand main method'],
      requirements: ['Create Main class', 'Print "Hello, World!"', 'Use public static void main'],
      constraints: ['Use standard Java syntax'],
      deliverables: ['Main.java']
    },
    testCases: [{ input: '', expectedOutput: 'Hello, World!', isPublic: true }],
    initialFiles: [
      { path: 'Main.java', content: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 15,
    points: 50
  },
  {
    title: 'Java Variables and Data Types',
    description: 'Demonstrate different data types in Java',
    difficulty: 'Easy',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Declare variables', 'Use primitive data types', 'Print formatted output'],
      requirements: ['Declare int, float, double, char, boolean variables', 'Assign values', 'Print using System.out.println'],
      constraints: ['Use primitive data types'],
      deliverables: ['Variables.java']
    },
    testCases: [{ input: '', expectedOutput: 'Integer: 10\nFloat: 3.14\nChar: A\nBoolean: true', isPublic: true }],
    initialFiles: [
      { path: 'Variables.java', content: 'public class Variables {\n    public static void main(String[] args) {\n        // Declare and initialize variables\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'Java Operators',
    description: 'Use arithmetic, relational, and logical operators',
    difficulty: 'Easy',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use arithmetic operators', 'Apply relational operators', 'Implement logical operators'],
      requirements: ['Perform arithmetic operations', 'Compare values', 'Use logical AND, OR, NOT'],
      constraints: ['Use Java operators'],
      deliverables: ['Operators.java']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nProduct: 50\nGreater: true\nLogical: true', isPublic: true }],
    initialFiles: [
      { path: 'Operators.java', content: 'public class Operators {\n    public static void main(String[] args) {\n        // Use operators\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'Java Control Statements',
    description: 'Implement if-else and switch statements',
    difficulty: 'Easy',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use if-else statements', 'Implement switch-case', 'Make decisions'],
      requirements: ['Check positive/negative/zero', 'Find largest of three numbers', 'Implement calculator using switch'],
      constraints: ['Use control statements'],
      deliverables: ['ControlStatements.java']
    },
    testCases: [{ input: '', expectedOutput: 'Positive\nLargest: 30\nResult: 15', isPublic: true }],
    initialFiles: [
      { path: 'ControlStatements.java', content: 'public class ControlStatements {\n    public static void main(String[] args) {\n        // Write control statements\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'Java Loops',
    description: 'Use for, while, and do-while loops',
    difficulty: 'Easy',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use for loop', 'Use while loop', 'Use do-while loop'],
      requirements: ['Print numbers 1 to 10', 'Calculate factorial', 'Print Fibonacci series', 'Find sum of digits'],
      constraints: ['Use all three loop types'],
      deliverables: ['Loops.java']
    },
    testCases: [{ input: '', expectedOutput: 'Numbers: 1 2 3 4 5 6 7 8 9 10\nFactorial: 120\nFibonacci: 0 1 1 2 3 5 8', isPublic: true }],
    initialFiles: [
      { path: 'Loops.java', content: 'public class Loops {\n    public static void main(String[] args) {\n        // Write loops\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Java Arrays',
    description: 'Work with single and multi-dimensional arrays',
    difficulty: 'Medium',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Declare arrays', 'Access array elements', 'Iterate through arrays'],
      requirements: ['Create array of integers', 'Find sum and average', 'Find largest element', 'Sort array', 'Work with 2D array'],
      constraints: ['Use array operations'],
      deliverables: ['Arrays.java']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 50\nAverage: 10.0\nLargest: 20\nSorted: 0 5 10 15 20', isPublic: true }],
    initialFiles: [
      { path: 'Arrays.java', content: 'public class Arrays {\n    public static void main(String[] args) {\n        int[] arr = {10, 5, 20, 15, 0};\n        // Work with arrays\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'Java Strings',
    description: 'Manipulate strings using String class',
    difficulty: 'Medium',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use String class', 'String methods', 'String manipulation'],
      requirements: ['Find string length', 'Convert to uppercase/lowercase', 'Check palindrome', 'Reverse string', 'Count vowels'],
      constraints: ['Use String class methods'],
      deliverables: ['Strings.java']
    },
    testCases: [{ input: '', expectedOutput: 'Length: 5\nUppercase: HELLO\nPalindrome: true\nReversed: olleH', isPublic: true }],
    initialFiles: [
      { path: 'Strings.java', content: 'public class Strings {\n    public static void main(String[] args) {\n        String str = "Hello";\n        // String operations\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'Java Methods',
    description: 'Create and use methods',
    difficulty: 'Medium',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Define methods', 'Pass parameters', 'Return values', 'Method overloading'],
      requirements: ['Create method to add numbers', 'Create method to check prime', 'Implement method overloading', 'Use static methods'],
      constraints: ['Use method definitions'],
      deliverables: ['Methods.java']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nPrime: true\nOverloaded: 30', isPublic: true }],
    initialFiles: [
      { path: 'Methods.java', content: 'public class Methods {\n    // Define methods here\n    \n    public static void main(String[] args) {\n        // Call methods\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'Java Classes and Objects',
    description: 'Implement OOP concepts with classes',
    difficulty: 'Medium',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Define classes', 'Create objects', 'Use constructors', 'Instance variables and methods'],
      requirements: ['Create Student class', 'Define constructor', 'Create instance methods', 'Create multiple objects'],
      constraints: ['Use OOP principles'],
      deliverables: ['Student.java']
    },
    testCases: [{ input: '', expectedOutput: 'Student: John, Roll: 101, Grade: A\nStudent: Alice, Roll: 102, Grade: B', isPublic: true }],
    initialFiles: [
      { path: 'Student.java', content: 'class Student {\n    // Define class members\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create objects\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'Java Inheritance',
    description: 'Implement inheritance and method overriding',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Implement inheritance', 'Use extends keyword', 'Override methods', 'Use super keyword'],
      requirements: ['Create parent class Vehicle', 'Create child classes Car and Bike', 'Override methods', 'Demonstrate inheritance'],
      constraints: ['Use inheritance'],
      deliverables: ['Inheritance.java']
    },
    testCases: [{ input: '', expectedOutput: 'Vehicle started\nCar: Toyota, 4 wheels\nBike: Honda, 2 wheels', isPublic: true }],
    initialFiles: [
      { path: 'Inheritance.java', content: 'class Vehicle {\n    // Parent class\n}\n\nclass Car extends Vehicle {\n    // Child class\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Demonstrate inheritance\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'Java Interfaces and Abstract Classes',
    description: 'Implement interfaces and abstract classes',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Define interfaces', 'Create abstract classes', 'Implement multiple interfaces'],
      requirements: ['Create interface Shape', 'Create abstract class Animal', 'Implement interface methods', 'Demonstrate abstraction'],
      constraints: ['Use interface and abstract keywords'],
      deliverables: ['Abstraction.java']
    },
    testCases: [{ input: '', expectedOutput: 'Area: 78.5\nPerimeter: 31.4\nAnimal sound: Bark', isPublic: true }],
    initialFiles: [
      { path: 'Abstraction.java', content: 'interface Shape {\n    // Interface methods\n}\n\nabstract class Animal {\n    // Abstract class\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Demonstrate abstraction\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'Java Exception Handling',
    description: 'Handle exceptions using try-catch blocks',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use try-catch blocks', 'Handle multiple exceptions', 'Use finally block', 'Throw exceptions'],
      requirements: ['Handle ArithmeticException', 'Handle ArrayIndexOutOfBoundsException', 'Use multiple catch blocks', 'Implement finally block'],
      constraints: ['Use exception handling'],
      deliverables: ['ExceptionHandling.java']
    },
    testCases: [{ input: '', expectedOutput: 'Exception: Division by zero\nException: Array index out of bounds\nFinally executed', isPublic: true }],
    initialFiles: [
      { path: 'ExceptionHandling.java', content: 'public class ExceptionHandling {\n    public static void main(String[] args) {\n        // Exception handling\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'Java Collections - ArrayList',
    description: 'Work with ArrayList collection',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Use ArrayList', 'Add and remove elements', 'Iterate through ArrayList'],
      requirements: ['Create ArrayList of integers', 'Add elements', 'Remove elements', 'Sort ArrayList', 'Search element'],
      constraints: ['Use ArrayList methods'],
      deliverables: ['ArrayListDemo.java']
    },
    testCases: [{ input: '', expectedOutput: 'List: [10, 20, 30, 40]\nSorted: [10, 20, 30, 40]\nContains 20: true', isPublic: true }],
    initialFiles: [
      { path: 'ArrayListDemo.java', content: 'import java.util.ArrayList;\nimport java.util.Collections;\n\npublic class ArrayListDemo {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>();\n        // ArrayList operations\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'Java File Handling',
    description: 'Read and write files in Java',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Create files', 'Write to files', 'Read from files', 'Handle file exceptions'],
      requirements: ['Create a file', 'Write data to file', 'Read data from file', 'Count lines and words', 'Handle IOException'],
      constraints: ['Use File and FileWriter/FileReader classes'],
      deliverables: ['FileHandling.java']
    },
    testCases: [{ input: '', expectedOutput: 'File created\nData written\nData read: Hello World\nLines: 3', isPublic: true }],
    initialFiles: [
      { path: 'FileHandling.java', content: 'import java.io.*;\n\npublic class FileHandling {\n    public static void main(String[] args) {\n        // File operations\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'Java Multithreading',
    description: 'Create and manage threads',
    difficulty: 'Hard',
    technology: 'Java',
    category: 'java',
    srs: {
      objectives: ['Create threads', 'Implement Runnable', 'Extend Thread class', 'Thread synchronization'],
      requirements: ['Create thread by extending Thread class', 'Create thread by implementing Runnable', 'Start threads', 'Demonstrate thread execution'],
      constraints: ['Use Thread class and Runnable interface'],
      deliverables: ['Multithreading.java']
    },
    testCases: [{ input: '', expectedOutput: 'Thread 1 running\nThread 2 running\nThreads completed', isPublic: true }],
    initialFiles: [
      { path: 'Multithreading.java', content: 'class MyThread extends Thread {\n    // Thread implementation\n}\n\npublic class Multithreading {\n    public static void main(String[] args) {\n        // Create and start threads\n    }\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Java', command: 'javac', versionCommand: 'java --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'Python Variables and Data Types',
    description: 'Create a Python program that demonstrates variables and basic data types',
    difficulty: 'Easy',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Understand Python variables', 'Work with different data types', 'Print formatted output'],
      requirements: [
        'Create variables for name (string), age (integer), height (float), and is_student (boolean)',
        'Print each variable with a descriptive label',
        'Use f-strings for formatting'
      ],
      constraints: ['Use Python 3 syntax', 'No external libraries'],
      deliverables: ['variables.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Name: John\nAge: 25\nHeight: 5.9\nStudent: True', isPublic: true }
    ],
    initialFiles: [
      { path: 'variables.py', content: '# Create your variables here\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Python Operators and Expressions',
    description: 'Write a program using arithmetic, comparison, and logical operators',
    difficulty: 'Easy',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use arithmetic operators', 'Apply comparison operators', 'Implement logical operators'],
      requirements: [
        'Perform arithmetic operations on two numbers',
        'Compare two numbers and print results',
        'Use logical operators (and, or, not)',
        'Calculate area and perimeter of a rectangle'
      ],
      constraints: ['Use Python 3 syntax', 'No external libraries'],
      deliverables: ['operators.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Sum: 15\nProduct: 50\nArea: 50\nPerimeter: 30', isPublic: true }
    ],
    initialFiles: [
      { path: 'operators.py', content: '# Operators and expressions\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Python Conditional Statements',
    description: 'Implement decision making using if-elif-else statements',
    difficulty: 'Easy',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use if-elif-else statements', 'Implement nested conditions', 'Make decisions based on input'],
      requirements: [
        'Check if a number is positive, negative, or zero',
        'Find the largest of three numbers',
        'Check if a year is a leap year',
        'Grade calculator based on marks'
      ],
      constraints: ['Use conditional statements', 'No external libraries'],
      deliverables: ['conditions.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Positive\nLargest: 45\nLeap Year: Yes\nGrade: A', isPublic: true }
    ],
    initialFiles: [
      { path: 'conditions.py', content: '# Conditional statements\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Python Loops - For and While',
    description: 'Use loops to iterate and solve problems',
    difficulty: 'Easy',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use for loops', 'Use while loops', 'Implement loop control statements'],
      requirements: [
        'Print numbers from 1 to 10 using for loop',
        'Calculate factorial using while loop',
        'Print multiplication table of a number',
        'Find sum of digits of a number'
      ],
      constraints: ['Use both for and while loops', 'No external libraries'],
      deliverables: ['loops.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Numbers: 1 2 3 4 5 6 7 8 9 10\nFactorial: 120\nSum of digits: 15', isPublic: true }
    ],
    initialFiles: [
      { path: 'loops.py', content: '# Loops - for and while\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Python Strings and Methods',
    description: 'Manipulate strings using built-in methods',
    difficulty: 'Easy',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use string methods', 'String slicing', 'String formatting'],
      requirements: [
        'Convert string to uppercase and lowercase',
        'Count vowels in a string',
        'Reverse a string',
        'Check if string is palindrome',
        'Replace characters in a string'
      ],
      constraints: ['Use string methods', 'No external libraries'],
      deliverables: ['strings.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Uppercase: PYTHON\nVowels: 2\nReversed: nohtyP\nPalindrome: True', isPublic: true }
    ],
    initialFiles: [
      { path: 'strings.py', content: '# String operations\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'Python Lists and Tuples',
    description: 'Work with lists and tuples data structures',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Create and manipulate lists', 'Use list methods', 'Work with tuples'],
      requirements: [
        'Create a list and perform operations (append, remove, sort)',
        'Find maximum and minimum in a list',
        'Create a tuple and access elements',
        'List comprehension to create a new list',
        'Merge two lists'
      ],
      constraints: ['Use built-in methods', 'No external libraries'],
      deliverables: ['lists_tuples.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Max: 90\nMin: 10\nSorted: [10, 20, 30, 40, 90]\nSquares: [1, 4, 9, 16, 25]', isPublic: true }
    ],
    initialFiles: [
      { path: 'lists_tuples.py', content: '# Lists and tuples\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python Dictionaries and Sets',
    description: 'Implement programs using dictionaries and sets',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Work with dictionaries', 'Use dictionary methods', 'Perform set operations'],
      requirements: [
        'Create a dictionary and add/update/delete items',
        'Iterate through dictionary keys and values',
        'Create sets and perform union, intersection, difference',
        'Count frequency of elements using dictionary',
        'Remove duplicates using sets'
      ],
      constraints: ['Use dictionary and set methods', 'No external libraries'],
      deliverables: ['dict_sets.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Keys: name, age, city\nUnion: {1, 2, 3, 4, 5}\nFrequency: a:3, b:2, c:1', isPublic: true }
    ],
    initialFiles: [
      { path: 'dict_sets.py', content: '# Dictionaries and sets\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python Functions and Recursion',
    description: 'Create functions and implement recursive solutions',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Define functions', 'Use parameters and return values', 'Implement recursion'],
      requirements: [
        'Create function to check prime number',
        'Implement recursive function for fibonacci series',
        'Create function with default arguments',
        'Implement recursive function for factorial',
        'Use lambda functions'
      ],
      constraints: ['Use function definitions', 'Implement recursion'],
      deliverables: ['functions.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Prime: True\nFibonacci: 0 1 1 2 3 5 8\nFactorial: 120', isPublic: true }
    ],
    initialFiles: [
      { path: 'functions.py', content: '# Functions and recursion\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python File Handling',
    description: 'Read from and write to files',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Open and read files', 'Write data to files', 'Handle file exceptions'],
      requirements: [
        'Read content from a text file',
        'Write data to a new file',
        'Append data to existing file',
        'Count lines, words, and characters in a file',
        'Handle file not found exception'
      ],
      constraints: ['Use context managers', 'Include error handling'],
      deliverables: ['file_handling.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Lines: 5\nWords: 25\nCharacters: 120', isPublic: true }
    ],
    initialFiles: [
      { path: 'file_handling.py', content: '# File handling\n', readOnly: false },
      { path: 'sample.txt', content: 'Python programming\nFile handling\nRead and write\nException handling\nContext managers', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python Exception Handling',
    description: 'Implement error handling using try-except blocks',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use try-except blocks', 'Handle multiple exceptions', 'Use finally clause'],
      requirements: [
        'Handle division by zero exception',
        'Handle value error for invalid input',
        'Handle file not found exception',
        'Use multiple except blocks',
        'Implement finally clause for cleanup'
      ],
      constraints: ['Use exception handling', 'No external libraries'],
      deliverables: ['exceptions.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Error handled: Division by zero\nError handled: Invalid input\nCleanup completed', isPublic: true }
    ],
    initialFiles: [
      { path: 'exceptions.py', content: '# Exception handling\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python Modules and Packages',
    description: 'Create and import modules',
    difficulty: 'Medium',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Create modules', 'Import modules', 'Use built-in modules'],
      requirements: [
        'Create a custom module with functions',
        'Import and use the custom module',
        'Use math module for calculations',
        'Use random module to generate random numbers',
        'Use datetime module for date operations'
      ],
      constraints: ['Create separate module files', 'Use import statements'],
      deliverables: ['main.py', 'mymodule.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Custom function result: 15\nSquare root: 5.0\nRandom: 42\nDate: 2024-01-01', isPublic: true }
    ],
    initialFiles: [
      { path: 'main.py', content: '# Main program\n', readOnly: false },
      { path: 'mymodule.py', content: '# Custom module\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 150
  },
  {
    title: 'Python Object-Oriented Programming - Classes',
    description: 'Implement OOP concepts using classes and objects',
    difficulty: 'Hard',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Define classes', 'Create objects', 'Use instance and class variables'],
      requirements: [
        'Create a Student class with attributes and methods',
        'Implement constructor (__init__)',
        'Create instance methods',
        'Use class variables',
        'Create multiple objects and demonstrate functionality'
      ],
      constraints: ['Use OOP principles', 'No external libraries'],
      deliverables: ['student_class.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Student: John, Roll: 101, Grade: A\nTotal students: 3', isPublic: true }
    ],
    initialFiles: [
      { path: 'student_class.py', content: '# Student class\n\nclass Student:\n    pass\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 200
  },
  {
    title: 'Python Inheritance and Polymorphism',
    description: 'Implement inheritance and polymorphism concepts',
    difficulty: 'Hard',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Implement inheritance', 'Use method overriding', 'Demonstrate polymorphism'],
      requirements: [
        'Create a base class Vehicle',
        'Create derived classes Car and Bike',
        'Override methods in derived classes',
        'Demonstrate polymorphism',
        'Use super() to call parent class methods'
      ],
      constraints: ['Use inheritance', 'Implement method overriding'],
      deliverables: ['inheritance.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Car: Toyota, 4 wheels\nBike: Honda, 2 wheels\nPolymorphism demonstrated', isPublic: true }
    ],
    initialFiles: [
      { path: 'inheritance.py', content: '# Inheritance and polymorphism\n\nclass Vehicle:\n    pass\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 200
  },
  {
    title: 'Python Regular Expressions',
    description: 'Use regex for pattern matching and text processing',
    difficulty: 'Hard',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Use re module', 'Create regex patterns', 'Match and search patterns'],
      requirements: [
        'Validate email addresses using regex',
        'Extract phone numbers from text',
        'Find all URLs in a string',
        'Replace patterns in text',
        'Split string using regex'
      ],
      constraints: ['Use re module', 'Create proper regex patterns'],
      deliverables: ['regex.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Valid email: True\nPhone: 123-456-7890\nURLs found: 2', isPublic: true }
    ],
    initialFiles: [
      { path: 'regex.py', content: '# Regular expressions\nimport re\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 200
  },
  {
    title: 'Python Data Structures - Stack and Queue',
    description: 'Implement stack and queue data structures',
    difficulty: 'Hard',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Implement stack using list', 'Implement queue using collections', 'Perform operations'],
      requirements: [
        'Create a Stack class with push, pop, and peek methods',
        'Create a Queue class with enqueue and dequeue methods',
        'Implement isEmpty and size methods',
        'Demonstrate stack operations (LIFO)',
        'Demonstrate queue operations (FIFO)'
      ],
      constraints: ['Implement from scratch', 'Use appropriate data structures'],
      deliverables: ['stack_queue.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Stack top: 30\nQueue front: 10\nStack: [10, 20, 30]\nQueue: [10, 20, 30]', isPublic: true }
    ],
    initialFiles: [
      { path: 'stack_queue.py', content: '# Stack and Queue implementation\n\nclass Stack:\n    pass\n\nclass Queue:\n    pass\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'Python Database - SQLite Operations',
    description: 'Perform database operations using SQLite',
    difficulty: 'Hard',
    technology: 'Python',
    category: 'python',
    srs: {
      objectives: ['Connect to SQLite database', 'Create tables', 'Perform CRUD operations'],
      requirements: [
        'Create a database connection',
        'Create a students table',
        'Insert records into the table',
        'Query and display records',
        'Update and delete records',
        'Close database connection'
      ],
      constraints: ['Use sqlite3 module', 'Handle exceptions'],
      deliverables: ['database.py']
    },
    testCases: [
      { input: '', expectedOutput: 'Table created\nRecords inserted: 3\nRecords fetched: 3\nDatabase closed', isPublic: true }
    ],
    initialFiles: [
      { path: 'database.py', content: '# SQLite database operations\nimport sqlite3\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'JavaScript Hello World',
    description: 'Write your first JavaScript program',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Learn JavaScript syntax', 'Use console.log', 'Understand basic output'],
      requirements: ['Print "Hello, World!" to console', 'Use console.log function'],
      constraints: ['Use ES6 syntax'],
      deliverables: ['hello.js']
    },
    testCases: [{ input: '', expectedOutput: 'Hello, World!', isPublic: true }],
    initialFiles: [
      { path: 'hello.js', content: '// Write your code here\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 15,
    points: 50
  },
  {
    title: 'JavaScript Variables and Data Types',
    description: 'Work with variables and different data types',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Declare variables using let, const, var', 'Use different data types', 'Type conversion'],
      requirements: ['Declare variables with let and const', 'Use string, number, boolean, null, undefined', 'Print variable types using typeof'],
      constraints: ['Use ES6 syntax'],
      deliverables: ['variables.js']
    },
    testCases: [{ input: '', expectedOutput: 'String: Hello\nNumber: 42\nBoolean: true\nType: string', isPublic: true }],
    initialFiles: [
      { path: 'variables.js', content: '// Declare variables\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'JavaScript Operators',
    description: 'Use arithmetic, comparison, and logical operators',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Use arithmetic operators', 'Apply comparison operators', 'Implement logical operators'],
      requirements: ['Perform arithmetic operations', 'Compare values', 'Use &&, ||, ! operators', 'Ternary operator'],
      constraints: ['Use ES6 syntax'],
      deliverables: ['operators.js']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nProduct: 50\nComparison: true\nLogical: false', isPublic: true }],
    initialFiles: [
      { path: 'operators.js', content: '// Use operators\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'JavaScript Control Flow',
    description: 'Implement if-else and switch statements',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Use if-else statements', 'Implement switch-case', 'Nested conditions'],
      requirements: ['Check positive/negative/zero', 'Find largest of three numbers', 'Grade calculator using switch', 'Check leap year'],
      constraints: ['Use control statements'],
      deliverables: ['control.js']
    },
    testCases: [{ input: '', expectedOutput: 'Positive\nLargest: 30\nGrade: A\nLeap Year', isPublic: true }],
    initialFiles: [
      { path: 'control.js', content: '// Control flow statements\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'JavaScript Loops',
    description: 'Use for, while, and do-while loops',
    difficulty: 'Easy',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Use for loop', 'Use while loop', 'Use for...of and for...in loops'],
      requirements: ['Print numbers 1 to 10', 'Calculate factorial', 'Print Fibonacci series', 'Sum of array elements'],
      constraints: ['Use different loop types'],
      deliverables: ['loops.js']
    },
    testCases: [{ input: '', expectedOutput: 'Numbers: 1 2 3 4 5 6 7 8 9 10\nFactorial: 120\nFibonacci: 0 1 1 2 3 5 8', isPublic: true }],
    initialFiles: [
      { path: 'loops.js', content: '// Loops\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'JavaScript Functions',
    description: 'Create and use functions',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Define functions', 'Arrow functions', 'Function parameters and return values', 'Default parameters'],
      requirements: ['Create regular function', 'Create arrow function', 'Function with default parameters', 'Higher-order function'],
      constraints: ['Use ES6 syntax'],
      deliverables: ['functions.js']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nSquare: 25\nDefault: Hello World\nFiltered: [2, 4, 6]', isPublic: true }],
    initialFiles: [
      { path: 'functions.js', content: '// Functions\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'JavaScript Arrays',
    description: 'Work with arrays and array methods',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Create arrays', 'Use array methods', 'Array manipulation'],
      requirements: ['Use push, pop, shift, unshift', 'Use map, filter, reduce', 'Find, sort, reverse arrays', 'Array destructuring'],
      constraints: ['Use ES6 array methods'],
      deliverables: ['arrays.js']
    },
    testCases: [{ input: '', expectedOutput: 'Sum: 15\nFiltered: [2, 4, 6]\nMapped: [2, 4, 6, 8, 10]\nSorted: [1, 2, 3, 4, 5]', isPublic: true }],
    initialFiles: [
      { path: 'arrays.js', content: 'const arr = [1, 2, 3, 4, 5];\n// Array operations\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'JavaScript Objects',
    description: 'Create and manipulate objects',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Create objects', 'Access object properties', 'Object methods', 'Object destructuring'],
      requirements: ['Create object literals', 'Add and delete properties', 'Use this keyword', 'Object destructuring', 'Object.keys, Object.values'],
      constraints: ['Use ES6 object syntax'],
      deliverables: ['objects.js']
    },
    testCases: [{ input: '', expectedOutput: 'Name: John\nAge: 25\nKeys: name, age, city\nMethod called', isPublic: true }],
    initialFiles: [
      { path: 'objects.js', content: '// Objects\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'JavaScript Strings',
    description: 'Manipulate strings using string methods',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Use string methods', 'Template literals', 'String manipulation'],
      requirements: ['Use length, toUpperCase, toLowerCase', 'String slicing and splitting', 'Template literals', 'Check palindrome', 'Count vowels'],
      constraints: ['Use ES6 string features'],
      deliverables: ['strings.js']
    },
    testCases: [{ input: '', expectedOutput: 'Length: 5\nUppercase: HELLO\nTemplate: Hello World\nPalindrome: true', isPublic: true }],
    initialFiles: [
      { path: 'strings.js', content: 'const str = "Hello";\n// String operations\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'JavaScript ES6 Features',
    description: 'Use modern ES6+ features',
    difficulty: 'Medium',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Destructuring', 'Spread and rest operators', 'Template literals', 'Default parameters'],
      requirements: ['Array and object destructuring', 'Use spread operator', 'Use rest parameters', 'Template literals with expressions'],
      constraints: ['Use ES6+ syntax'],
      deliverables: ['es6.js']
    },
    testCases: [{ input: '', expectedOutput: 'Destructured: 1, 2\nSpread: [1, 2, 3, 4, 5]\nRest: 15\nTemplate: Sum is 15', isPublic: true }],
    initialFiles: [
      { path: 'es6.js', content: '// ES6 features\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'JavaScript Classes and OOP',
    description: 'Implement object-oriented programming',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Create classes', 'Use constructors', 'Inheritance', 'Static methods'],
      requirements: ['Create class with constructor', 'Define methods', 'Implement inheritance using extends', 'Use super keyword', 'Static methods'],
      constraints: ['Use ES6 class syntax'],
      deliverables: ['classes.js']
    },
    testCases: [{ input: '', expectedOutput: 'Student: John, Roll: 101\nInherited: Alice, Grade: A\nStatic method called', isPublic: true }],
    initialFiles: [
      { path: 'classes.js', content: '// Classes and OOP\nclass Student {\n    // Define class\n}\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'JavaScript Promises and Async/Await',
    description: 'Handle asynchronous operations',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Create promises', 'Use then and catch', 'Async/await syntax', 'Error handling'],
      requirements: ['Create a promise', 'Chain promises', 'Use async/await', 'Handle promise rejection', 'Promise.all'],
      constraints: ['Use modern async patterns'],
      deliverables: ['async.js']
    },
    testCases: [{ input: '', expectedOutput: 'Promise resolved\nAsync result: Success\nAll promises resolved', isPublic: true }],
    initialFiles: [
      { path: 'async.js', content: '// Promises and async/await\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'JavaScript DOM Manipulation',
    description: 'Manipulate HTML DOM elements',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Select DOM elements', 'Modify elements', 'Event handling', 'Create elements'],
      requirements: ['Use querySelector', 'Modify innerHTML and textContent', 'Add event listeners', 'Create and append elements', 'Modify styles'],
      constraints: ['Use modern DOM APIs'],
      deliverables: ['dom.js', 'index.html']
    },
    testCases: [{ input: '', expectedOutput: 'Element selected\nContent modified\nEvent listener added\nElement created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head><title>DOM</title></head>\n<body>\n    <div id="app"></div>\n    <script src="dom.js"></script>\n</body>\n</html>', readOnly: false },
      { path: 'dom.js', content: '// DOM manipulation\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'JavaScript JSON Operations',
    description: 'Work with JSON data',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Parse JSON', 'Stringify objects', 'Manipulate JSON data'],
      requirements: ['Parse JSON string', 'Convert object to JSON', 'Access nested JSON properties', 'Filter JSON array', 'Modify JSON data'],
      constraints: ['Use JSON methods'],
      deliverables: ['json.js']
    },
    testCases: [{ input: '', expectedOutput: 'Parsed: John\nStringified: {"name":"John"}\nFiltered: 2 items', isPublic: true }],
    initialFiles: [
      { path: 'json.js', content: '// JSON operations\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'JavaScript Error Handling',
    description: 'Handle errors using try-catch',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Use try-catch blocks', 'Throw custom errors', 'Finally block', 'Error types'],
      requirements: ['Handle errors with try-catch', 'Throw custom errors', 'Use finally block', 'Handle different error types', 'Create custom error class'],
      constraints: ['Use error handling'],
      deliverables: ['errors.js']
    },
    testCases: [{ input: '', expectedOutput: 'Error caught: Division by zero\nCustom error thrown\nFinally executed', isPublic: true }],
    initialFiles: [
      { path: 'errors.js', content: '// Error handling\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'JavaScript Modules',
    description: 'Create and use ES6 modules',
    difficulty: 'Hard',
    technology: 'JavaScript',
    category: 'javascript',
    srs: {
      objectives: ['Export modules', 'Import modules', 'Default and named exports'],
      requirements: ['Create module with exports', 'Import functions from module', 'Use default export', 'Use named exports', 'Import all as namespace'],
      constraints: ['Use ES6 module syntax'],
      deliverables: ['main.js', 'utils.js']
    },
    testCases: [{ input: '', expectedOutput: 'Module imported\nFunction called: 15\nDefault export used', isPublic: true }],
    initialFiles: [
      { path: 'main.js', content: '// Main file\n', readOnly: false },
      { path: 'utils.js', content: '// Utility module\nexport function add(a, b) {\n    return a + b;\n}\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }],
    timeLimit: 50,
    points: 200
  },

  {
    title: 'React Hello World',
    description: 'Create your first React component',
    difficulty: 'Easy',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Create React component', 'Use JSX', 'Render component'],
      requirements: ['Create functional component', 'Return JSX', 'Display "Hello, React!"'],
      constraints: ['Use functional components'],
      deliverables: ['App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Hello, React!', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'function App() {\n  // Create component\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'React JSX Basics',
    description: 'Work with JSX syntax',
    difficulty: 'Easy',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Use JSX syntax', 'Embed expressions', 'JSX attributes'],
      requirements: ['Create elements with JSX', 'Use JavaScript expressions in JSX', 'Add className and styles', 'Render lists'],
      constraints: ['Use JSX syntax'],
      deliverables: ['App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'JSX rendered correctly', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'function App() {\n  const name = "React";\n  // Use JSX\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'React Props',
    description: 'Pass and use props in components',
    difficulty: 'Easy',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Pass props', 'Receive props', 'Use props in component'],
      requirements: ['Create component that accepts props', 'Pass props from parent', 'Display props data', 'Use destructuring'],
      constraints: ['Use functional components'],
      deliverables: ['App.jsx', 'Card.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Props displayed', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'import Card from "./Card";\n\nfunction App() {\n  return <Card />;\n}\n\nexport default App;', readOnly: false },
      { path: 'Card.jsx', content: 'function Card(props) {\n  // Use props\n}\n\nexport default Card;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'React useState Hook',
    description: 'Manage state with useState',
    difficulty: 'Medium',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Use useState hook', 'Update state', 'Handle events'],
      requirements: ['Import useState', 'Create state variable', 'Update state on button click', 'Display state value'],
      constraints: ['Use hooks'],
      deliverables: ['Counter.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Counter working', isPublic: true }],
    initialFiles: [
      { path: 'Counter.jsx', content: 'import { useState } from "react";\n\nfunction Counter() {\n  // Use useState\n}\n\nexport default Counter;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'React Event Handling',
    description: 'Handle user events in React',
    difficulty: 'Medium',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Handle click events', 'Handle form events', 'Event object'],
      requirements: ['Handle button click', 'Handle input change', 'Handle form submit', 'Prevent default behavior'],
      constraints: ['Use event handlers'],
      deliverables: ['Form.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Events handled', isPublic: true }],
    initialFiles: [
      { path: 'Form.jsx', content: 'import { useState } from "react";\n\nfunction Form() {\n  // Handle events\n}\n\nexport default Form;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'React Conditional Rendering',
    description: 'Render components conditionally',
    difficulty: 'Medium',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Use conditional rendering', 'Ternary operator', 'Logical AND'],
      requirements: ['Use if-else in component', 'Use ternary operator in JSX', 'Use && operator', 'Toggle visibility'],
      constraints: ['Use conditional techniques'],
      deliverables: ['App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Conditional rendering working', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'import { useState } from "react";\n\nfunction App() {\n  // Conditional rendering\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'React Lists and Keys',
    description: 'Render lists with keys',
    difficulty: 'Medium',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Render lists', 'Use map function', 'Add keys'],
      requirements: ['Use map to render array', 'Add unique keys', 'Render list of components', 'Handle dynamic lists'],
      constraints: ['Use proper keys'],
      deliverables: ['TodoList.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'List rendered with keys', isPublic: true }],
    initialFiles: [
      { path: 'TodoList.jsx', content: 'function TodoList() {\n  const todos = ["Task 1", "Task 2", "Task 3"];\n  // Render list\n}\n\nexport default TodoList;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'React Forms and Controlled Components',
    description: 'Create controlled form inputs',
    difficulty: 'Medium',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Create controlled inputs', 'Handle form data', 'Form validation'],
      requirements: ['Create controlled input', 'Handle multiple inputs', 'Form submission', 'Basic validation'],
      constraints: ['Use controlled components'],
      deliverables: ['LoginForm.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Form working', isPublic: true }],
    initialFiles: [
      { path: 'LoginForm.jsx', content: 'import { useState } from "react";\n\nfunction LoginForm() {\n  // Create form\n}\n\nexport default LoginForm;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'React useEffect Hook',
    description: 'Use useEffect for side effects',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Use useEffect', 'Dependency array', 'Cleanup function'],
      requirements: ['Import useEffect', 'Run effect on mount', 'Use dependency array', 'Cleanup on unmount'],
      constraints: ['Use useEffect hook'],
      deliverables: ['Timer.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'useEffect working', isPublic: true }],
    initialFiles: [
      { path: 'Timer.jsx', content: 'import { useState, useEffect } from "react";\n\nfunction Timer() {\n  // Use useEffect\n}\n\nexport default Timer;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'React Component Composition',
    description: 'Compose components together',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Component composition', 'Children prop', 'Reusable components'],
      requirements: ['Create wrapper component', 'Use children prop', 'Compose multiple components', 'Create layout components'],
      constraints: ['Use composition'],
      deliverables: ['Card.jsx', 'App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Composition working', isPublic: true }],
    initialFiles: [
      { path: 'Card.jsx', content: 'function Card({ children }) {\n  // Use children\n}\n\nexport default Card;', readOnly: false },
      { path: 'App.jsx', content: 'import Card from "./Card";\n\nfunction App() {\n  return <div></div>;\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'React useContext Hook',
    description: 'Share data with Context API',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Create context', 'Use useContext', 'Provider pattern'],
      requirements: ['Create context', 'Create provider component', 'Use useContext in child', 'Share state globally'],
      constraints: ['Use Context API'],
      deliverables: ['ThemeContext.jsx', 'App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Context working', isPublic: true }],
    initialFiles: [
      { path: 'ThemeContext.jsx', content: 'import { createContext } from "react";\n\nexport const ThemeContext = createContext();\n', readOnly: false },
      { path: 'App.jsx', content: 'import { useState } from "react";\nimport { ThemeContext } from "./ThemeContext";\n\nfunction App() {\n  // Use context\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'React Custom Hooks',
    description: 'Create reusable custom hooks',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Create custom hook', 'Reuse logic', 'Hook rules'],
      requirements: ['Create custom hook', 'Use useState and useEffect in hook', 'Return values from hook', 'Use hook in component'],
      constraints: ['Follow hook rules'],
      deliverables: ['useFetch.js', 'App.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Custom hook working', isPublic: true }],
    initialFiles: [
      { path: 'useFetch.js', content: 'import { useState, useEffect } from "react";\n\nfunction useFetch(url) {\n  // Create custom hook\n}\n\nexport default useFetch;', readOnly: false },
      { path: 'App.jsx', content: 'import useFetch from "./useFetch";\n\nfunction App() {\n  // Use custom hook\n}\n\nexport default App;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'React useReducer Hook',
    description: 'Manage complex state with useReducer',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Use useReducer', 'Create reducer function', 'Dispatch actions'],
      requirements: ['Create reducer function', 'Use useReducer hook', 'Dispatch actions', 'Handle multiple action types'],
      constraints: ['Use useReducer'],
      deliverables: ['Counter.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'useReducer working', isPublic: true }],
    initialFiles: [
      { path: 'Counter.jsx', content: 'import { useReducer } from "react";\n\nfunction reducer(state, action) {\n  // Reducer logic\n}\n\nfunction Counter() {\n  // Use useReducer\n}\n\nexport default Counter;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'React Router - Basic Routing',
    description: 'Implement routing with React Router',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Setup React Router', 'Create routes', 'Navigation'],
      requirements: ['Install react-router-dom', 'Create routes', 'Use Link component', 'Navigate between pages'],
      constraints: ['Use React Router v6'],
      deliverables: ['App.jsx', 'Home.jsx', 'About.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Routing working', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'import { BrowserRouter, Routes, Route } from "react-router-dom";\n\nfunction App() {\n  // Setup routes\n}\n\nexport default App;', readOnly: false },
      { path: 'Home.jsx', content: 'function Home() {\n  return <h1>Home</h1>;\n}\n\nexport default Home;', readOnly: false },
      { path: 'About.jsx', content: 'function About() {\n  return <h1>About</h1>;\n}\n\nexport default About;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'React Todo App',
    description: 'Build a complete todo application',
    difficulty: 'Hard',
    technology: 'React',
    category: 'react',
    srs: {
      objectives: ['Build full app', 'CRUD operations', 'State management'],
      requirements: ['Add todos', 'Delete todos', 'Toggle complete', 'Filter todos', 'Local storage'],
      constraints: ['Use React hooks'],
      deliverables: ['App.jsx', 'TodoList.jsx', 'TodoItem.jsx']
    },
    testCases: [{ input: '', expectedOutput: 'Todo app working', isPublic: true }],
    initialFiles: [
      { path: 'App.jsx', content: 'import { useState } from "react";\n\nfunction App() {\n  // Todo app\n}\n\nexport default App;', readOnly: false },
      { path: 'TodoList.jsx', content: 'function TodoList({ todos }) {\n  // Render todos\n}\n\nexport default TodoList;', readOnly: false },
      { path: 'TodoItem.jsx', content: 'function TodoItem({ todo }) {\n  // Render todo item\n}\n\nexport default TodoItem;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Node.js', command: 'node', versionCommand: 'node --version' }, { name: 'npm', command: 'npm', versionCommand: 'npm --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'MongoDB Basics - Create Database and Collection',
    description: 'Learn to create database and collections',
    difficulty: 'Easy',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Create database', 'Create collection', 'Show databases'],
      requirements: ['Use use command to create database', 'Create collection', 'List databases and collections'],
      constraints: ['Use MongoDB shell commands'],
      deliverables: ['commands.js']
    },
    testCases: [{ input: '', expectedOutput: 'Database and collection created', isPublic: true }],
    initialFiles: [
      { path: 'commands.js', content: '// MongoDB commands\n// use mydb\n// db.createCollection("users")\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'MongoDB Insert Operations',
    description: 'Insert documents into collections',
    difficulty: 'Easy',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Insert single document', 'Insert multiple documents', 'insertOne and insertMany'],
      requirements: ['Use insertOne()', 'Use insertMany()', 'Insert documents with different fields'],
      constraints: ['Use insert methods'],
      deliverables: ['insert.js']
    },
    testCases: [{ input: '', expectedOutput: 'Documents inserted', isPublic: true }],
    initialFiles: [
      { path: 'insert.js', content: '// Insert operations\n// db.users.insertOne({ name: "John", age: 25 })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MongoDB Find Operations',
    description: 'Query documents from collections',
    difficulty: 'Easy',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Find all documents', 'Find with conditions', 'Projection'],
      requirements: ['Use find()', 'Use findOne()', 'Query with conditions', 'Use projection'],
      constraints: ['Use find methods'],
      deliverables: ['find.js']
    },
    testCases: [{ input: '', expectedOutput: 'Documents found', isPublic: true }],
    initialFiles: [
      { path: 'find.js', content: '// Find operations\n// db.users.find()\n// db.users.find({ age: { $gt: 20 } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MongoDB Update Operations',
    description: 'Update documents in collections',
    difficulty: 'Easy',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Update single document', 'Update multiple documents', 'Update operators'],
      requirements: ['Use updateOne()', 'Use updateMany()', 'Use $set operator', 'Use $inc operator'],
      constraints: ['Use update methods'],
      deliverables: ['update.js']
    },
    testCases: [{ input: '', expectedOutput: 'Documents updated', isPublic: true }],
    initialFiles: [
      { path: 'update.js', content: '// Update operations\n// db.users.updateOne({ name: "John" }, { $set: { age: 26 } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MongoDB Delete Operations',
    description: 'Delete documents from collections',
    difficulty: 'Easy',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Delete single document', 'Delete multiple documents', 'Drop collection'],
      requirements: ['Use deleteOne()', 'Use deleteMany()', 'Drop collection', 'Delete with conditions'],
      constraints: ['Use delete methods'],
      deliverables: ['delete.js']
    },
    testCases: [{ input: '', expectedOutput: 'Documents deleted', isPublic: true }],
    initialFiles: [
      { path: 'delete.js', content: '// Delete operations\n// db.users.deleteOne({ name: "John" })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MongoDB Query Operators',
    description: 'Use comparison and logical operators',
    difficulty: 'Medium',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Use comparison operators', 'Use logical operators', 'Complex queries'],
      requirements: ['Use $gt, $lt, $gte, $lte', 'Use $eq, $ne', 'Use $and, $or, $not', 'Use $in, $nin'],
      constraints: ['Use query operators'],
      deliverables: ['operators.js']
    },
    testCases: [{ input: '', expectedOutput: 'Query operators used', isPublic: true }],
    initialFiles: [
      { path: 'operators.js', content: '// Query operators\n// db.users.find({ age: { $gt: 20, $lt: 30 } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'MongoDB Sorting and Limiting',
    description: 'Sort and limit query results',
    difficulty: 'Medium',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Sort documents', 'Limit results', 'Skip documents'],
      requirements: ['Use sort()', 'Use limit()', 'Use skip()', 'Combine sort, limit, skip'],
      constraints: ['Use cursor methods'],
      deliverables: ['sort_limit.js']
    },
    testCases: [{ input: '', expectedOutput: 'Sorted and limited results', isPublic: true }],
    initialFiles: [
      { path: 'sort_limit.js', content: '// Sort and limit\n// db.users.find().sort({ age: 1 }).limit(5)\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 30,
    points: 125
  },
  {
    title: 'MongoDB Indexing',
    description: 'Create and use indexes',
    difficulty: 'Medium',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Create indexes', 'View indexes', 'Drop indexes'],
      requirements: ['Create single field index', 'Create compound index', 'View indexes', 'Drop index'],
      constraints: ['Use index methods'],
      deliverables: ['indexes.js']
    },
    testCases: [{ input: '', expectedOutput: 'Indexes created', isPublic: true }],
    initialFiles: [
      { path: 'indexes.js', content: '// Indexing\n// db.users.createIndex({ name: 1 })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'MongoDB Aggregation Pipeline',
    description: 'Use aggregation framework',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Use aggregate()', 'Pipeline stages', 'Aggregation operators'],
      requirements: ['Use $match stage', 'Use $group stage', 'Use $project stage', 'Use $sort stage'],
      constraints: ['Use aggregation pipeline'],
      deliverables: ['aggregation.js']
    },
    testCases: [{ input: '', expectedOutput: 'Aggregation completed', isPublic: true }],
    initialFiles: [
      { path: 'aggregation.js', content: '// Aggregation pipeline\n// db.users.aggregate([\n//   { $match: { age: { $gt: 20 } } },\n//   { $group: { _id: "$city", count: { $sum: 1 } } }\n// ])\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'MongoDB Array Operations',
    description: 'Work with array fields',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Query arrays', 'Update arrays', 'Array operators'],
      requirements: ['Use $push to add to array', 'Use $pull to remove from array', 'Use $addToSet', 'Query array elements'],
      constraints: ['Use array operators'],
      deliverables: ['arrays.js']
    },
    testCases: [{ input: '', expectedOutput: 'Array operations completed', isPublic: true }],
    initialFiles: [
      { path: 'arrays.js', content: '// Array operations\n// db.users.updateOne({ name: "John" }, { $push: { hobbies: "reading" } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MongoDB Embedded Documents',
    description: 'Work with nested documents',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Insert embedded documents', 'Query nested fields', 'Update nested fields'],
      requirements: ['Insert document with nested object', 'Query using dot notation', 'Update nested fields', 'Use $elemMatch'],
      constraints: ['Use embedded documents'],
      deliverables: ['embedded.js']
    },
    testCases: [{ input: '', expectedOutput: 'Embedded documents handled', isPublic: true }],
    initialFiles: [
      { path: 'embedded.js', content: '// Embedded documents\n// db.users.insertOne({ name: "John", address: { city: "NYC", zip: "10001" } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MongoDB Text Search',
    description: 'Implement text search functionality',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Create text index', 'Perform text search', 'Text search operators'],
      requirements: ['Create text index', 'Use $text operator', 'Use $search', 'Sort by text score'],
      constraints: ['Use text search'],
      deliverables: ['text_search.js']
    },
    testCases: [{ input: '', expectedOutput: 'Text search working', isPublic: true }],
    initialFiles: [
      { path: 'text_search.js', content: '// Text search\n// db.articles.createIndex({ content: "text" })\n// db.articles.find({ $text: { $search: "mongodb" } })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'MongoDB Data Validation',
    description: 'Implement schema validation',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Create validation rules', 'Validate documents', 'Validation operators'],
      requirements: ['Create collection with validator', 'Use $jsonSchema', 'Required fields', 'Data type validation'],
      constraints: ['Use validation'],
      deliverables: ['validation.js']
    },
    testCases: [{ input: '', expectedOutput: 'Validation working', isPublic: true }],
    initialFiles: [
      { path: 'validation.js', content: '// Data validation\n// db.createCollection("users", {\n//   validator: {\n//     $jsonSchema: {\n//       required: ["name", "email"]\n//     }\n//   }\n// })\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'MongoDB Transactions',
    description: 'Use multi-document transactions',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Start transaction', 'Commit transaction', 'Abort transaction'],
      requirements: ['Start session', 'Begin transaction', 'Perform operations', 'Commit or abort'],
      constraints: ['Use transactions'],
      deliverables: ['transactions.js']
    },
    testCases: [{ input: '', expectedOutput: 'Transaction completed', isPublic: true }],
    initialFiles: [
      { path: 'transactions.js', content: '// Transactions\n// const session = db.getMongo().startSession()\n// session.startTransaction()\n// // operations\n// session.commitTransaction()\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'MongoDB Backup and Restore',
    description: 'Backup and restore database',
    difficulty: 'Hard',
    technology: 'MongoDB',
    category: 'mongodb',
    srs: {
      objectives: ['Export data', 'Import data', 'Backup database'],
      requirements: ['Use mongoexport', 'Use mongoimport', 'Export to JSON', 'Import from JSON'],
      constraints: ['Use backup tools'],
      deliverables: ['backup.js']
    },
    testCases: [{ input: '', expectedOutput: 'Backup completed', isPublic: true }],
    initialFiles: [
      { path: 'backup.js', content: '// Backup and restore\n// mongoexport --db=mydb --collection=users --out=users.json\n// mongoimport --db=mydb --collection=users --file=users.json\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MongoDB', command: 'mongosh', versionCommand: 'mongosh --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'MySQL Database and Table Creation',
    description: 'Create database and tables',
    difficulty: 'Easy',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Create database', 'Create tables', 'Define columns'],
      requirements: ['CREATE DATABASE', 'CREATE TABLE', 'Define data types', 'Primary key'],
      constraints: ['Use SQL syntax'],
      deliverables: ['create.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Database and table created', isPublic: true }],
    initialFiles: [
      { path: 'create.sql', content: '-- Create database and table\nCREATE DATABASE mydb;\nUSE mydb;\n-- CREATE TABLE users...', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'MySQL INSERT Operations',
    description: 'Insert data into tables',
    difficulty: 'Easy',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Insert single row', 'Insert multiple rows', 'INSERT statement'],
      requirements: ['INSERT INTO', 'Insert with all columns', 'Insert with specific columns', 'Insert multiple rows'],
      constraints: ['Use INSERT syntax'],
      deliverables: ['insert.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Data inserted', isPublic: true }],
    initialFiles: [
      { path: 'insert.sql', content: '-- Insert operations\nINSERT INTO users (name, email, age) VALUES ("John", "john@email.com", 25);\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'MySQL SELECT Queries',
    description: 'Query data from tables',
    difficulty: 'Easy',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['SELECT statement', 'WHERE clause', 'Column selection'],
      requirements: ['SELECT all columns', 'SELECT specific columns', 'WHERE conditions', 'DISTINCT'],
      constraints: ['Use SELECT syntax'],
      deliverables: ['select.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Data retrieved', isPublic: true }],
    initialFiles: [
      { path: 'select.sql', content: '-- SELECT queries\nSELECT * FROM users;\nSELECT name, email FROM users WHERE age > 20;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MySQL UPDATE Operations',
    description: 'Update existing data',
    difficulty: 'Easy',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['UPDATE statement', 'SET clause', 'WHERE clause'],
      requirements: ['UPDATE single row', 'UPDATE multiple rows', 'Update with conditions', 'Update multiple columns'],
      constraints: ['Use UPDATE syntax'],
      deliverables: ['update.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Data updated', isPublic: true }],
    initialFiles: [
      { path: 'update.sql', content: '-- UPDATE operations\nUPDATE users SET age = 26 WHERE name = "John";\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MySQL DELETE Operations',
    description: 'Delete data from tables',
    difficulty: 'Easy',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['DELETE statement', 'WHERE clause', 'TRUNCATE'],
      requirements: ['DELETE with condition', 'DELETE multiple rows', 'TRUNCATE table', 'DROP table'],
      constraints: ['Use DELETE syntax'],
      deliverables: ['delete.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Data deleted', isPublic: true }],
    initialFiles: [
      { path: 'delete.sql', content: '-- DELETE operations\nDELETE FROM users WHERE age < 18;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'MySQL WHERE Clause and Operators',
    description: 'Use WHERE clause with various operators',
    difficulty: 'Medium',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Comparison operators', 'Logical operators', 'Pattern matching'],
      requirements: ['Use =, !=, <, >, <=, >=', 'Use AND, OR, NOT', 'Use LIKE', 'Use IN, BETWEEN'],
      constraints: ['Use WHERE operators'],
      deliverables: ['where.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Filtered results', isPublic: true }],
    initialFiles: [
      { path: 'where.sql', content: '-- WHERE clause\nSELECT * FROM users WHERE age BETWEEN 20 AND 30;\nSELECT * FROM users WHERE name LIKE "J%";\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 30,
    points: 125
  },
  {
    title: 'MySQL ORDER BY and LIMIT',
    description: 'Sort and limit query results',
    difficulty: 'Medium',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Sort results', 'Limit results', 'Pagination'],
      requirements: ['ORDER BY ASC/DESC', 'LIMIT clause', 'OFFSET', 'Multiple column sorting'],
      constraints: ['Use ORDER BY and LIMIT'],
      deliverables: ['sort_limit.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Sorted and limited results', isPublic: true }],
    initialFiles: [
      { path: 'sort_limit.sql', content: '-- ORDER BY and LIMIT\nSELECT * FROM users ORDER BY age DESC LIMIT 10;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 30,
    points: 125
  },
  {
    title: 'MySQL Aggregate Functions',
    description: 'Use aggregate functions',
    difficulty: 'Medium',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['COUNT, SUM, AVG', 'MIN, MAX', 'GROUP BY'],
      requirements: ['Use COUNT()', 'Use SUM(), AVG()', 'Use MIN(), MAX()', 'GROUP BY clause'],
      constraints: ['Use aggregate functions'],
      deliverables: ['aggregate.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Aggregated results', isPublic: true }],
    initialFiles: [
      { path: 'aggregate.sql', content: '-- Aggregate functions\nSELECT COUNT(*) FROM users;\nSELECT AVG(age) FROM users;\nSELECT city, COUNT(*) FROM users GROUP BY city;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'MySQL JOINS - INNER JOIN',
    description: 'Join tables using INNER JOIN',
    difficulty: 'Medium',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['INNER JOIN', 'Join conditions', 'Multiple tables'],
      requirements: ['Create related tables', 'INNER JOIN syntax', 'Join on foreign key', 'Select from joined tables'],
      constraints: ['Use INNER JOIN'],
      deliverables: ['inner_join.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Joined results', isPublic: true }],
    initialFiles: [
      { path: 'inner_join.sql', content: '-- INNER JOIN\nSELECT users.name, orders.order_date\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MySQL JOINS - LEFT and RIGHT JOIN',
    description: 'Use LEFT JOIN and RIGHT JOIN',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['LEFT JOIN', 'RIGHT JOIN', 'NULL handling'],
      requirements: ['LEFT JOIN syntax', 'RIGHT JOIN syntax', 'Handle NULL values', 'Difference from INNER JOIN'],
      constraints: ['Use outer joins'],
      deliverables: ['outer_join.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Outer join results', isPublic: true }],
    initialFiles: [
      { path: 'outer_join.sql', content: '-- LEFT and RIGHT JOIN\nSELECT users.name, orders.order_date\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MySQL Subqueries',
    description: 'Use subqueries in SELECT, WHERE, FROM',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Subquery in WHERE', 'Subquery in FROM', 'Correlated subquery'],
      requirements: ['Subquery with IN', 'Subquery with EXISTS', 'Subquery in SELECT', 'Nested subqueries'],
      constraints: ['Use subqueries'],
      deliverables: ['subqueries.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Subquery results', isPublic: true }],
    initialFiles: [
      { path: 'subqueries.sql', content: '-- Subqueries\nSELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'MySQL Indexes',
    description: 'Create and use indexes',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['Create indexes', 'Index types', 'Performance'],
      requirements: ['CREATE INDEX', 'UNIQUE index', 'Composite index', 'DROP INDEX'],
      constraints: ['Use indexes'],
      deliverables: ['indexes.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Indexes created', isPublic: true }],
    initialFiles: [
      { path: 'indexes.sql', content: '-- Indexes\nCREATE INDEX idx_name ON users(name);\nCREATE UNIQUE INDEX idx_email ON users(email);\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MySQL Constraints',
    description: 'Use table constraints',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE, NOT NULL'],
      requirements: ['Define PRIMARY KEY', 'Define FOREIGN KEY', 'Use UNIQUE constraint', 'Use NOT NULL, DEFAULT'],
      constraints: ['Use constraints'],
      deliverables: ['constraints.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Constraints applied', isPublic: true }],
    initialFiles: [
      { path: 'constraints.sql', content: '-- Constraints\nCREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  age INT DEFAULT 18\n);\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'MySQL Views',
    description: 'Create and use views',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['CREATE VIEW', 'Query views', 'Update views'],
      requirements: ['Create view', 'Query from view', 'Update view', 'Drop view'],
      constraints: ['Use views'],
      deliverables: ['views.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Views created', isPublic: true }],
    initialFiles: [
      { path: 'views.sql', content: '-- Views\nCREATE VIEW active_users AS\nSELECT * FROM users WHERE status = "active";\n\nSELECT * FROM active_users;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'MySQL Transactions',
    description: 'Use transactions for data integrity',
    difficulty: 'Hard',
    technology: 'MySQL',
    category: 'mysql',
    srs: {
      objectives: ['START TRANSACTION', 'COMMIT', 'ROLLBACK'],
      requirements: ['Begin transaction', 'Execute multiple queries', 'COMMIT changes', 'ROLLBACK on error'],
      constraints: ['Use transactions'],
      deliverables: ['transactions.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Transaction completed', isPublic: true }],
    initialFiles: [
      { path: 'transactions.sql', content: '-- Transactions\nSTART TRANSACTION;\n-- Multiple operations\nCOMMIT;\n-- or ROLLBACK;\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'MySQL', command: 'mysql', versionCommand: 'mysql --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'PostgreSQL Database and Table Creation',
    description: 'Create database and tables in PostgreSQL',
    difficulty: 'Easy',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['Create database', 'Create tables', 'Define data types'],
      requirements: ['CREATE DATABASE', 'CREATE TABLE', 'Define columns with data types', 'PRIMARY KEY'],
      constraints: ['Use PostgreSQL syntax'],
      deliverables: ['create.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Database and table created', isPublic: true }],
    initialFiles: [
      { path: 'create.sql', content: '-- Create database and table\nCREATE DATABASE mydb;\n\\c mydb\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100)\n);', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'PostgreSQL Data Types',
    description: 'Work with PostgreSQL data types',
    difficulty: 'Easy',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['Use various data types', 'Type casting', 'Special types'],
      requirements: ['Use INTEGER, VARCHAR, TEXT', 'Use DATE, TIMESTAMP', 'Use BOOLEAN, JSON', 'Use ARRAY type'],
      constraints: ['Use PostgreSQL data types'],
      deliverables: ['datatypes.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Data types used', isPublic: true }],
    initialFiles: [
      { path: 'datatypes.sql', content: '-- PostgreSQL data types\nCREATE TABLE products (\n  id SERIAL,\n  name VARCHAR(100),\n  price NUMERIC(10,2),\n  created_at TIMESTAMP,\n  tags TEXT[]\n);', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'PostgreSQL CRUD Operations',
    description: 'Perform INSERT, SELECT, UPDATE, DELETE',
    difficulty: 'Easy',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['Insert data', 'Query data', 'Update data', 'Delete data'],
      requirements: ['INSERT INTO', 'SELECT with WHERE', 'UPDATE with conditions', 'DELETE with conditions'],
      constraints: ['Use CRUD operations'],
      deliverables: ['crud.sql']
    },
    testCases: [{ input: '', expectedOutput: 'CRUD operations completed', isPublic: true }],
    initialFiles: [
      { path: 'crud.sql', content: '-- CRUD operations\nINSERT INTO users (name, email) VALUES (\'John\', \'john@email.com\');\nSELECT * FROM users;\nUPDATE users SET name = \'Jane\' WHERE id = 1;\nDELETE FROM users WHERE id = 1;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'PostgreSQL Joins',
    description: 'Join multiple tables',
    difficulty: 'Medium',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
      requirements: ['Create related tables', 'INNER JOIN syntax', 'LEFT and RIGHT JOIN', 'FULL OUTER JOIN'],
      constraints: ['Use JOIN operations'],
      deliverables: ['joins.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Joined data', isPublic: true }],
    initialFiles: [
      { path: 'joins.sql', content: '-- Joins\nSELECT users.name, orders.order_date\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'PostgreSQL Aggregate Functions',
    description: 'Use aggregate functions and GROUP BY',
    difficulty: 'Medium',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['COUNT, SUM, AVG', 'MIN, MAX', 'GROUP BY, HAVING'],
      requirements: ['Use aggregate functions', 'GROUP BY clause', 'HAVING clause', 'Multiple aggregations'],
      constraints: ['Use aggregation'],
      deliverables: ['aggregate.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Aggregated results', isPublic: true }],
    initialFiles: [
      { path: 'aggregate.sql', content: '-- Aggregate functions\nSELECT COUNT(*) FROM users;\nSELECT city, COUNT(*) FROM users GROUP BY city;\nSELECT city, AVG(age) FROM users GROUP BY city HAVING AVG(age) > 25;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'PostgreSQL Subqueries',
    description: 'Use subqueries and CTEs',
    difficulty: 'Medium',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['Subqueries', 'Common Table Expressions', 'Nested queries'],
      requirements: ['Subquery in WHERE', 'Subquery in FROM', 'WITH clause (CTE)', 'Correlated subquery'],
      constraints: ['Use subqueries'],
      deliverables: ['subqueries.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Subquery results', isPublic: true }],
    initialFiles: [
      { path: 'subqueries.sql', content: '-- Subqueries and CTEs\nSELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);\n\nWITH avg_age AS (\n  SELECT AVG(age) as average FROM users\n)\nSELECT * FROM users, avg_age WHERE age > average;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'PostgreSQL Indexes',
    description: 'Create and manage indexes',
    difficulty: 'Medium',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['Create indexes', 'Index types', 'Performance optimization'],
      requirements: ['CREATE INDEX', 'UNIQUE index', 'Partial index', 'Multi-column index'],
      constraints: ['Use indexes'],
      deliverables: ['indexes.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Indexes created', isPublic: true }],
    initialFiles: [
      { path: 'indexes.sql', content: '-- Indexes\nCREATE INDEX idx_name ON users(name);\nCREATE UNIQUE INDEX idx_email ON users(email);\nCREATE INDEX idx_active_users ON users(name) WHERE active = true;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'PostgreSQL Constraints',
    description: 'Use table and column constraints',
    difficulty: 'Medium',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['PRIMARY KEY', 'FOREIGN KEY', 'CHECK, UNIQUE'],
      requirements: ['Define PRIMARY KEY', 'Define FOREIGN KEY with CASCADE', 'CHECK constraint', 'NOT NULL, DEFAULT'],
      constraints: ['Use constraints'],
      deliverables: ['constraints.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Constraints applied', isPublic: true }],
    initialFiles: [
      { path: 'constraints.sql', content: '-- Constraints\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  age INT CHECK (age >= 18),\n  status VARCHAR(20) DEFAULT \'active\'\n);', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'PostgreSQL Views',
    description: 'Create and use views',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['CREATE VIEW', 'Materialized views', 'Update views'],
      requirements: ['Create view', 'Create materialized view', 'Refresh materialized view', 'Query from views'],
      constraints: ['Use views'],
      deliverables: ['views.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Views created', isPublic: true }],
    initialFiles: [
      { path: 'views.sql', content: '-- Views\nCREATE VIEW active_users AS\nSELECT * FROM users WHERE status = \'active\';\n\nCREATE MATERIALIZED VIEW user_stats AS\nSELECT city, COUNT(*) FROM users GROUP BY city;\n\nREFRESH MATERIALIZED VIEW user_stats;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'PostgreSQL Transactions',
    description: 'Use transactions and ACID properties',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['BEGIN, COMMIT, ROLLBACK', 'Savepoints', 'Transaction isolation'],
      requirements: ['Start transaction', 'Multiple operations', 'COMMIT or ROLLBACK', 'Use SAVEPOINT'],
      constraints: ['Use transactions'],
      deliverables: ['transactions.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Transaction completed', isPublic: true }],
    initialFiles: [
      { path: 'transactions.sql', content: '-- Transactions\nBEGIN;\n-- Multiple operations\nSAVEPOINT sp1;\n-- More operations\nCOMMIT;\n-- or ROLLBACK TO sp1;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'PostgreSQL JSON Operations',
    description: 'Work with JSON and JSONB data types',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['JSON data type', 'JSONB operations', 'JSON functions'],
      requirements: ['Store JSON data', 'Query JSON fields', 'Use -> and ->> operators', 'JSON functions'],
      constraints: ['Use JSON features'],
      deliverables: ['json.sql']
    },
    testCases: [{ input: '', expectedOutput: 'JSON operations completed', isPublic: true }],
    initialFiles: [
      { path: 'json.sql', content: '-- JSON operations\nCREATE TABLE products (\n  id SERIAL,\n  data JSONB\n);\n\nINSERT INTO products (data) VALUES (\'{"name": "Product", "price": 100}\');\nSELECT data->>\'name\' FROM products;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'PostgreSQL Window Functions',
    description: 'Use window functions for analytics',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['ROW_NUMBER', 'RANK, DENSE_RANK', 'PARTITION BY'],
      requirements: ['Use ROW_NUMBER()', 'Use RANK() and DENSE_RANK()', 'PARTITION BY clause', 'ORDER BY in window'],
      constraints: ['Use window functions'],
      deliverables: ['window.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Window function results', isPublic: true }],
    initialFiles: [
      { path: 'window.sql', content: '-- Window functions\nSELECT name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,\n  RANK() OVER (ORDER BY salary DESC) as rank\nFROM employees;', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'PostgreSQL Full-Text Search',
    description: 'Implement full-text search',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['tsvector and tsquery', 'Text search', 'Search ranking'],
      requirements: ['Create tsvector column', 'Use to_tsvector()', 'Use to_tsquery()', 'Rank search results'],
      constraints: ['Use full-text search'],
      deliverables: ['fulltext.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Search results', isPublic: true }],
    initialFiles: [
      { path: 'fulltext.sql', content: '-- Full-text search\nCREATE TABLE articles (\n  id SERIAL,\n  title TEXT,\n  content TEXT,\n  search_vector tsvector\n);\n\nUPDATE articles SET search_vector = to_tsvector(\'english\', title || \' \' || content);\nSELECT * FROM articles WHERE search_vector @@ to_tsquery(\'postgresql\');', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'PostgreSQL Stored Procedures',
    description: 'Create and use stored procedures',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['CREATE FUNCTION', 'PL/pgSQL', 'Function parameters'],
      requirements: ['Create function', 'Use parameters', 'Return values', 'Call function'],
      constraints: ['Use stored procedures'],
      deliverables: ['procedures.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Function executed', isPublic: true }],
    initialFiles: [
      { path: 'procedures.sql', content: '-- Stored procedures\nCREATE OR REPLACE FUNCTION get_user_count()\nRETURNS INTEGER AS $$\nBEGIN\n  RETURN (SELECT COUNT(*) FROM users);\nEND;\n$$ LANGUAGE plpgsql;\n\nSELECT get_user_count();', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'PostgreSQL Triggers',
    description: 'Create and use triggers',
    difficulty: 'Hard',
    technology: 'PostgreSQL',
    category: 'postgresql',
    srs: {
      objectives: ['CREATE TRIGGER', 'Trigger functions', 'BEFORE/AFTER triggers'],
      requirements: ['Create trigger function', 'Create trigger', 'BEFORE INSERT trigger', 'AFTER UPDATE trigger'],
      constraints: ['Use triggers'],
      deliverables: ['triggers.sql']
    },
    testCases: [{ input: '', expectedOutput: 'Trigger created', isPublic: true }],
    initialFiles: [
      { path: 'triggers.sql', content: '-- Triggers\nCREATE OR REPLACE FUNCTION update_timestamp()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER set_timestamp\nBEFORE UPDATE ON users\nFOR EACH ROW\nEXECUTE FUNCTION update_timestamp();', readOnly: false }
    ],
    requiredSoftware: [{ name: 'PostgreSQL', command: 'psql', versionCommand: 'psql --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'HTML Basic Structure',
    description: 'Create a basic HTML document structure',
    difficulty: 'Easy',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Learn HTML structure', 'Use basic tags', 'Create valid HTML'],
      requirements: ['Create DOCTYPE declaration', 'Add html, head, body tags', 'Add title and meta tags', 'Create heading and paragraph'],
      constraints: ['Use HTML5 syntax'],
      deliverables: ['index.html']
    },
    testCases: [{ input: '', expectedOutput: 'Valid HTML structure', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!-- Create HTML structure -->\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'HTML Text Formatting',
    description: 'Use text formatting tags',
    difficulty: 'Easy',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use text formatting tags', 'Create headings', 'Format text'],
      requirements: ['Use h1-h6 tags', 'Use p, strong, em, mark tags', 'Create line breaks', 'Use blockquote'],
      constraints: ['Use semantic HTML'],
      deliverables: ['text.html']
    },
    testCases: [{ input: '', expectedOutput: 'Formatted text displayed', isPublic: true }],
    initialFiles: [
      { path: 'text.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Text Formatting</title></head>\n<body>\n<!-- Add formatted text -->\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 20,
    points: 75
  },
  {
    title: 'HTML Lists',
    description: 'Create ordered and unordered lists',
    difficulty: 'Easy',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create lists', 'Use list tags', 'Nested lists'],
      requirements: ['Create unordered list', 'Create ordered list', 'Create nested list', 'Use description list'],
      constraints: ['Use proper list structure'],
      deliverables: ['lists.html']
    },
    testCases: [{ input: '', expectedOutput: 'Lists displayed correctly', isPublic: true }],
    initialFiles: [
      { path: 'lists.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Lists</title></head>\n<body>\n<!-- Create lists -->\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'HTML Links and Images',
    description: 'Add hyperlinks and images',
    difficulty: 'Easy',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create hyperlinks', 'Add images', 'Use attributes'],
      requirements: ['Create internal and external links', 'Add images with alt text', 'Link to email', 'Open link in new tab'],
      constraints: ['Use proper attributes'],
      deliverables: ['links.html']
    },
    testCases: [{ input: '', expectedOutput: 'Links and images working', isPublic: true }],
    initialFiles: [
      { path: 'links.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Links and Images</title></head>\n<body>\n<!-- Add links and images -->\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'HTML Tables',
    description: 'Create tables with rows and columns',
    difficulty: 'Easy',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create tables', 'Use table tags', 'Table structure'],
      requirements: ['Create table with headers', 'Add rows and columns', 'Use colspan and rowspan', 'Add table caption'],
      constraints: ['Use semantic table structure'],
      deliverables: ['table.html']
    },
    testCases: [{ input: '', expectedOutput: 'Table displayed correctly', isPublic: true }],
    initialFiles: [
      { path: 'table.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Tables</title></head>\n<body>\n<!-- Create table -->\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'HTML Forms - Input Elements',
    description: 'Create form with various input types',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create forms', 'Use input elements', 'Form validation'],
      requirements: ['Create form with text, email, password inputs', 'Add radio buttons and checkboxes', 'Add select dropdown', 'Use required attribute'],
      constraints: ['Use HTML5 input types'],
      deliverables: ['form.html']
    },
    testCases: [{ input: '', expectedOutput: 'Form with all input types', isPublic: true }],
    initialFiles: [
      { path: 'form.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Form</title></head>\n<body>\n<form>\n<!-- Add form elements -->\n</form>\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'HTML Semantic Elements',
    description: 'Use semantic HTML5 elements',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use semantic tags', 'Structure content', 'Accessibility'],
      requirements: ['Use header, nav, main, section, article', 'Use aside and footer', 'Create semantic page layout'],
      constraints: ['Use HTML5 semantic elements'],
      deliverables: ['semantic.html']
    },
    testCases: [{ input: '', expectedOutput: 'Semantic structure created', isPublic: true }],
    initialFiles: [
      { path: 'semantic.html', content: '<!DOCTYPE html>\n<html>\n<head><title>Semantic HTML</title></head>\n<body>\n<!-- Use semantic elements -->\n</body>\n</html>', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'CSS Selectors and Properties',
    description: 'Apply CSS styles using selectors',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use CSS selectors', 'Apply styles', 'CSS properties'],
      requirements: ['Use element, class, id selectors', 'Apply color, font, background', 'Use descendant selectors', 'Group selectors'],
      constraints: ['Use external CSS'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Styles applied correctly', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<title>CSS Selectors</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>Heading</h1>\n<p class="text">Paragraph</p>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Add CSS styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'CSS Box Model',
    description: 'Understand and apply box model properties',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Understand box model', 'Use margin, padding, border', 'Box sizing'],
      requirements: ['Apply margin and padding', 'Add borders', 'Use box-sizing property', 'Create spacing'],
      constraints: ['Use box model properties'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Box model applied', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="box">Box Model</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Box model styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'CSS Flexbox Layout',
    description: 'Create layouts using Flexbox',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use Flexbox', 'Create flexible layouts', 'Align items'],
      requirements: ['Create flex container', 'Use flex-direction', 'Use justify-content and align-items', 'Create responsive layout'],
      constraints: ['Use Flexbox properties'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Flexbox layout created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="container">\n<div class="item">1</div>\n<div class="item">2</div>\n<div class="item">3</div>\n</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Flexbox styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'CSS Grid Layout',
    description: 'Create layouts using CSS Grid',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use CSS Grid', 'Create grid layouts', 'Grid areas'],
      requirements: ['Create grid container', 'Define grid columns and rows', 'Use grid-template-areas', 'Create responsive grid'],
      constraints: ['Use Grid properties'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Grid layout created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="grid">\n<div class="item">1</div>\n<div class="item">2</div>\n<div class="item">3</div>\n</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Grid styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'CSS Positioning',
    description: 'Use CSS positioning properties',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use position property', 'Static, relative, absolute, fixed', 'Z-index'],
      requirements: ['Use relative positioning', 'Use absolute positioning', 'Create fixed header', 'Use z-index for layering'],
      constraints: ['Use positioning properties'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Positioning applied', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="container">\n<div class="box">Box</div>\n</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Positioning styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'CSS Responsive Design',
    description: 'Create responsive layouts with media queries',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use media queries', 'Create responsive design', 'Mobile-first approach'],
      requirements: ['Add viewport meta tag', 'Use media queries for different screen sizes', 'Create responsive navigation', 'Responsive images'],
      constraints: ['Use responsive techniques'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Responsive design created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<nav>Navigation</nav>\n<main>Content</main>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Responsive styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'CSS Animations',
    description: 'Create CSS animations and transitions',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use transitions', 'Create keyframe animations', 'Animation properties'],
      requirements: ['Add hover transitions', 'Create keyframe animation', 'Use animation properties', 'Multiple animations'],
      constraints: ['Use CSS animations'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Animations working', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="box">Animate Me</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Animation styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'CSS Pseudo-classes and Pseudo-elements',
    description: 'Use pseudo-classes and pseudo-elements',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use pseudo-classes', 'Use pseudo-elements', 'Advanced selectors'],
      requirements: ['Use :hover, :active, :focus', 'Use ::before and ::after', 'Use :nth-child', 'Create styled elements'],
      constraints: ['Use pseudo selectors'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Pseudo selectors applied', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Pseudo styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'CSS Variables (Custom Properties)',
    description: 'Use CSS custom properties',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Define CSS variables', 'Use var() function', 'Theme creation'],
      requirements: ['Define custom properties in :root', 'Use variables for colors and sizes', 'Create theme switcher', 'Fallback values'],
      constraints: ['Use CSS variables'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'CSS variables working', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="card">Card with theme</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: ':root {\n/* Define variables */\n}\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'CSS Typography',
    description: 'Style text with advanced typography',
    difficulty: 'Medium',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Use font properties', 'Text styling', 'Web fonts'],
      requirements: ['Use Google Fonts', 'Apply font-family, size, weight', 'Text alignment and spacing', 'Line height and letter spacing'],
      constraints: ['Use typography properties'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Typography styled', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>Heading</h1>\n<p>Paragraph text</p>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Typography styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'CSS Card Component',
    description: 'Create a reusable card component',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create component', 'Use modern CSS', 'Responsive design'],
      requirements: ['Create card with image, title, description', 'Add hover effects', 'Make responsive', 'Use shadows and borders'],
      constraints: ['Use modern CSS techniques'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Card component created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class="card">\n<!-- Card content -->\n</div>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Card styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'CSS Navigation Bar',
    description: 'Create a responsive navigation bar',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create navigation', 'Responsive menu', 'Styling'],
      requirements: ['Create horizontal navigation', 'Add hover effects', 'Make responsive with hamburger menu', 'Dropdown menu'],
      constraints: ['Use CSS only (no JavaScript)'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Navigation bar created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<nav>\n<ul>\n<li><a href="#">Home</a></li>\n<li><a href="#">About</a></li>\n</ul>\n</nav>\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Navigation styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'Complete Landing Page',
    description: 'Create a complete responsive landing page',
    difficulty: 'Hard',
    technology: 'HTML/CSS',
    category: 'html-css',
    srs: {
      objectives: ['Create full page', 'Responsive design', 'Modern layout'],
      requirements: ['Create header with navigation', 'Hero section with CTA', 'Features section', 'Footer', 'Fully responsive'],
      constraints: ['Use modern CSS techniques'],
      deliverables: ['index.html', 'style.css']
    },
    testCases: [{ input: '', expectedOutput: 'Landing page created', isPublic: true }],
    initialFiles: [
      { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<link rel="stylesheet" href="style.css">\n<title>Landing Page</title>\n</head>\n<body>\n<!-- Create landing page -->\n</body>\n</html>', readOnly: false },
      { path: 'style.css', content: '/* Landing page styles */\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Browser', command: 'open', versionCommand: 'echo "Browser"' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'AI - Introduction to Artificial Intelligence',
    description: 'Understand AI concepts and applications',
    difficulty: 'Easy',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Understand AI basics', 'AI applications', 'Problem solving'],
      requirements: ['Define AI', 'Types of AI', 'AI applications', 'Problem-solving agents'],
      constraints: ['Use Python'],
      deliverables: ['ai_intro.py']
    },
    testCases: [{ input: '', expectedOutput: 'AI concepts demonstrated', isPublic: true }],
    initialFiles: [
      { path: 'ai_intro.py', content: '# AI Introduction\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'AI - Search Algorithms - BFS and DFS',
    description: 'Implement breadth-first and depth-first search',
    difficulty: 'Easy',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Implement BFS', 'Implement DFS', 'Graph traversal'],
      requirements: ['BFS algorithm', 'DFS algorithm', 'Graph representation', 'Path finding'],
      constraints: ['Use Python'],
      deliverables: ['search_algorithms.py']
    },
    testCases: [{ input: '', expectedOutput: 'Path found', isPublic: true }],
    initialFiles: [
      { path: 'search_algorithms.py', content: '# Search algorithms\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'AI - A* Search Algorithm',
    description: 'Implement A* pathfinding algorithm',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Implement A*', 'Heuristic function', 'Optimal path'],
      requirements: ['A* algorithm', 'Heuristic function', 'Priority queue', 'Find optimal path'],
      constraints: ['Use Python'],
      deliverables: ['astar.py']
    },
    testCases: [{ input: '', expectedOutput: 'Optimal path found', isPublic: true }],
    initialFiles: [
      { path: 'astar.py', content: '# A* algorithm\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'AI - Minimax Algorithm',
    description: 'Implement minimax for game playing',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Implement minimax', 'Game tree', 'Optimal move'],
      requirements: ['Minimax algorithm', 'Game tree evaluation', 'Tic-tac-toe implementation', 'Best move selection'],
      constraints: ['Use Python'],
      deliverables: ['minimax.py']
    },
    testCases: [{ input: '', expectedOutput: 'Best move found', isPublic: true }],
    initialFiles: [
      { path: 'minimax.py', content: '# Minimax algorithm\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'AI - Alpha-Beta Pruning',
    description: 'Optimize minimax with alpha-beta pruning',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Implement alpha-beta pruning', 'Optimize search', 'Game playing'],
      requirements: ['Alpha-beta algorithm', 'Pruning optimization', 'Game tree', 'Performance comparison'],
      constraints: ['Use Python'],
      deliverables: ['alpha_beta.py']
    },
    testCases: [{ input: '', expectedOutput: 'Optimized search completed', isPublic: true }],
    initialFiles: [
      { path: 'alpha_beta.py', content: '# Alpha-beta pruning\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'AI - Constraint Satisfaction Problems',
    description: 'Solve CSP using backtracking',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Understand CSP', 'Backtracking', 'Constraint propagation'],
      requirements: ['CSP formulation', 'Backtracking algorithm', 'N-Queens problem', 'Constraint checking'],
      constraints: ['Use Python'],
      deliverables: ['csp.py']
    },
    testCases: [{ input: '', expectedOutput: 'Solution found', isPublic: true }],
    initialFiles: [
      { path: 'csp.py', content: '# Constraint Satisfaction Problems\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 55,
    points: 225
  },
  {
    title: 'AI - Knowledge Representation',
    description: 'Represent knowledge using logic',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Propositional logic', 'First-order logic', 'Inference'],
      requirements: ['Logic representation', 'Inference rules', 'Knowledge base', 'Query answering'],
      constraints: ['Use Python'],
      deliverables: ['knowledge_rep.py']
    },
    testCases: [{ input: '', expectedOutput: 'Query answered', isPublic: true }],
    initialFiles: [
      { path: 'knowledge_rep.py', content: '# Knowledge representation\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 55,
    points: 225
  },
  {
    title: 'AI - Expert Systems',
    description: 'Build a rule-based expert system',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Rule-based systems', 'Inference engine', 'Knowledge base'],
      requirements: ['Define rules', 'Inference engine', 'Forward chaining', 'Backward chaining'],
      constraints: ['Use Python'],
      deliverables: ['expert_system.py']
    },
    testCases: [{ input: '', expectedOutput: 'Diagnosis made', isPublic: true }],
    initialFiles: [
      { path: 'expert_system.py', content: '# Expert system\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'AI - Fuzzy Logic Systems',
    description: 'Implement fuzzy logic controller',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Fuzzy sets', 'Membership functions', 'Fuzzy inference'],
      requirements: ['Define fuzzy sets', 'Membership functions', 'Fuzzy rules', 'Defuzzification'],
      constraints: ['Use Python'],
      deliverables: ['fuzzy_logic.py']
    },
    testCases: [{ input: '', expectedOutput: 'Fuzzy output calculated', isPublic: true }],
    initialFiles: [
      { path: 'fuzzy_logic.py', content: '# Fuzzy logic\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'AI - Genetic Algorithms',
    description: 'Implement genetic algorithm for optimization',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Genetic algorithm', 'Evolution', 'Optimization'],
      requirements: ['Population initialization', 'Fitness function', 'Selection', 'Crossover and mutation'],
      constraints: ['Use Python'],
      deliverables: ['genetic_algorithm.py']
    },
    testCases: [{ input: '', expectedOutput: 'Optimal solution found', isPublic: true }],
    initialFiles: [
      { path: 'genetic_algorithm.py', content: '# Genetic algorithm\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'AI - Natural Language Processing Basics',
    description: 'Text processing and analysis',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Text preprocessing', 'Tokenization', 'NLP basics'],
      requirements: ['Tokenization', 'Stop word removal', 'Stemming', 'Text analysis'],
      constraints: ['Use NLTK'],
      deliverables: ['nlp_basics.py']
    },
    testCases: [{ input: '', expectedOutput: 'Text processed', isPublic: true }],
    initialFiles: [
      { path: 'nlp_basics.py', content: 'import nltk\n# NLP basics\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'AI - Chatbot Development',
    description: 'Build a simple rule-based chatbot',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Chatbot design', 'Pattern matching', 'Response generation'],
      requirements: ['Intent recognition', 'Pattern matching', 'Response templates', 'Conversation flow'],
      constraints: ['Use Python'],
      deliverables: ['chatbot.py']
    },
    testCases: [{ input: '', expectedOutput: 'Chatbot responds', isPublic: true }],
    initialFiles: [
      { path: 'chatbot.py', content: '# Chatbot\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'AI - Computer Vision Basics',
    description: 'Image processing fundamentals',
    difficulty: 'Medium',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Image processing', 'Feature detection', 'Computer vision'],
      requirements: ['Load images', 'Image transformations', 'Edge detection', 'Feature extraction'],
      constraints: ['Use OpenCV'],
      deliverables: ['computer_vision.py']
    },
    testCases: [{ input: '', expectedOutput: 'Image processed', isPublic: true }],
    initialFiles: [
      { path: 'computer_vision.py', content: 'import cv2\n# Computer vision\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'AI - Reinforcement Learning Basics',
    description: 'Implement Q-learning algorithm',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Reinforcement learning', 'Q-learning', 'Agent training'],
      requirements: ['Q-table', 'Reward function', 'Exploration vs exploitation', 'Train agent'],
      constraints: ['Use Python'],
      deliverables: ['q_learning.py']
    },
    testCases: [{ input: '', expectedOutput: 'Agent trained', isPublic: true }],
    initialFiles: [
      { path: 'q_learning.py', content: '# Q-learning\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'AI - Planning and Scheduling',
    description: 'Implement planning algorithms',
    difficulty: 'Hard',
    technology: 'AI',
    category: 'ai',
    srs: {
      objectives: ['Planning algorithms', 'STRIPS', 'Goal-based agents'],
      requirements: ['State representation', 'Action planning', 'Goal achievement', 'Plan execution'],
      constraints: ['Use Python'],
      deliverables: ['planning.py']
    },
    testCases: [{ input: '', expectedOutput: 'Plan generated', isPublic: true }],
    initialFiles: [
      { path: 'planning.py', content: '# Planning algorithms\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'IoT - LED Blink with Arduino',
    description: 'Control LED using Arduino',
    difficulty: 'Easy',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Setup Arduino', 'Digital output', 'LED control'],
      requirements: ['Setup pin mode', 'Turn LED on/off', 'Blink LED', 'Use delay'],
      constraints: ['Use Arduino C++'],
      deliverables: ['led_blink.ino']
    },
    testCases: [{ input: '', expectedOutput: 'LED blinking', isPublic: true }],
    initialFiles: [
      { path: 'led_blink.ino', content: 'void setup() {\n  // Setup code\n}\n\nvoid loop() {\n  // Main code\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'IoT - Temperature Sensor Reading',
    description: 'Read temperature from sensor',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Read analog input', 'Convert to temperature', 'Display reading'],
      requirements: ['Read sensor', 'Convert to Celsius', 'Serial output', 'Continuous reading'],
      constraints: ['Use Arduino'],
      deliverables: ['temp_sensor.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Temperature reading', isPublic: true }],
    initialFiles: [
      { path: 'temp_sensor.ino', content: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Read temperature\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'IoT - MQTT Communication',
    description: 'Implement MQTT protocol for IoT',
    difficulty: 'Hard',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['MQTT protocol', 'Publish/Subscribe', 'IoT communication'],
      requirements: ['Connect to MQTT broker', 'Publish messages', 'Subscribe to topics', 'Handle messages'],
      constraints: ['Use MQTT library'],
      deliverables: ['mqtt_client.py']
    },
    testCases: [{ input: '', expectedOutput: 'MQTT communication working', isPublic: true }],
    initialFiles: [
      { path: 'mqtt_client.py', content: 'import paho.mqtt.client as mqtt\n# MQTT client\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'ML - K-Means Clustering',
    description: 'Implement clustering algorithm',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Unsupervised learning', 'Clustering', 'K-Means algorithm'],
      requirements: ['Load dataset', 'Apply K-Means', 'Visualize clusters', 'Determine optimal K'],
      constraints: ['Use scikit-learn'],
      deliverables: ['clustering.py']
    },
    testCases: [{ input: '', expectedOutput: 'Clustering completed', isPublic: true }],
    initialFiles: [
      { path: 'clustering.py', content: 'from sklearn.cluster import KMeans\n# K-Means clustering\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'ML - Neural Network with TensorFlow',
    description: 'Build neural network model',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Deep learning', 'Neural networks', 'TensorFlow'],
      requirements: ['Create neural network', 'Train model', 'Evaluate accuracy', 'Make predictions'],
      constraints: ['Use TensorFlow/Keras'],
      deliverables: ['neural_network.py']
    },
    testCases: [{ input: '', expectedOutput: 'Neural network trained', isPublic: true }],
    initialFiles: [
      { path: 'neural_network.py', content: 'import tensorflow as tf\nfrom tensorflow import keras\n# Neural network\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'ML - Natural Language Processing',
    description: 'Text processing and sentiment analysis',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['NLP basics', 'Text preprocessing', 'Sentiment analysis'],
      requirements: ['Tokenization', 'Remove stopwords', 'Sentiment classification', 'Accuracy evaluation'],
      constraints: ['Use NLTK or spaCy'],
      deliverables: ['nlp.py']
    },
    testCases: [{ input: '', expectedOutput: 'Sentiment analysis completed', isPublic: true }],
    initialFiles: [
      { path: 'nlp.py', content: 'import nltk\n# NLP and sentiment analysis\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 55,
    points: 225
  },
  {
    title: 'ML - Image Classification with CNN',
    description: 'Build convolutional neural network',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['CNN architecture', 'Image classification', 'Deep learning'],
      requirements: ['Build CNN model', 'Train on image dataset', 'Evaluate accuracy', 'Predict images'],
      constraints: ['Use TensorFlow/Keras'],
      deliverables: ['cnn.py']
    },
    testCases: [{ input: '', expectedOutput: 'CNN model trained', isPublic: true }],
    initialFiles: [
      { path: 'cnn.py', content: 'from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv2D, MaxPooling2D\n# CNN model\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'ML - Random Forest Classifier',
    description: 'Implement ensemble learning',
    difficulty: 'Medium',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Ensemble learning', 'Random Forest', 'Feature importance'],
      requirements: ['Train Random Forest', 'Evaluate model', 'Feature importance', 'Cross-validation'],
      constraints: ['Use scikit-learn'],
      deliverables: ['random_forest.py']
    },
    testCases: [{ input: '', expectedOutput: 'Random Forest trained', isPublic: true }],
    initialFiles: [
      { path: 'random_forest.py', content: 'from sklearn.ensemble import RandomForestClassifier\n# Random Forest\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'ML - Support Vector Machine',
    description: 'Implement SVM classifier',
    difficulty: 'Medium',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['SVM algorithm', 'Kernel functions', 'Classification'],
      requirements: ['Train SVM model', 'Use different kernels', 'Evaluate accuracy', 'Hyperparameter tuning'],
      constraints: ['Use scikit-learn'],
      deliverables: ['svm.py']
    },
    testCases: [{ input: '', expectedOutput: 'SVM model trained', isPublic: true }],
    initialFiles: [
      { path: 'svm.py', content: 'from sklearn.svm import SVC\n# Support Vector Machine\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'ML - Principal Component Analysis',
    description: 'Dimensionality reduction with PCA',
    difficulty: 'Medium',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Dimensionality reduction', 'PCA algorithm', 'Feature extraction'],
      requirements: ['Apply PCA', 'Reduce dimensions', 'Visualize components', 'Explained variance'],
      constraints: ['Use scikit-learn'],
      deliverables: ['pca.py']
    },
    testCases: [{ input: '', expectedOutput: 'PCA applied', isPublic: true }],
    initialFiles: [
      { path: 'pca.py', content: 'from sklearn.decomposition import PCA\n# Principal Component Analysis\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'ML - Time Series Forecasting',
    description: 'Predict future values using time series',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Time series analysis', 'ARIMA model', 'Forecasting'],
      requirements: ['Load time series data', 'Train ARIMA model', 'Make predictions', 'Evaluate forecast'],
      constraints: ['Use statsmodels'],
      deliverables: ['time_series.py']
    },
    testCases: [{ input: '', expectedOutput: 'Forecast completed', isPublic: true }],
    initialFiles: [
      { path: 'time_series.py', content: 'from statsmodels.tsa.arima.model import ARIMA\n# Time series forecasting\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 55,
    points: 225
  },
  {
    title: 'ML - Recommendation System',
    description: 'Build collaborative filtering system',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Recommendation algorithms', 'Collaborative filtering', 'Matrix factorization'],
      requirements: ['Load user-item data', 'Build recommendation model', 'Generate recommendations', 'Evaluate system'],
      constraints: ['Use scikit-learn or surprise'],
      deliverables: ['recommendation.py']
    },
    testCases: [{ input: '', expectedOutput: 'Recommendations generated', isPublic: true }],
    initialFiles: [
      { path: 'recommendation.py', content: '# Recommendation system\nimport numpy as np\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'ML - Model Deployment with Flask',
    description: 'Deploy ML model as REST API',
    difficulty: 'Hard',
    technology: 'ML',
    category: 'ml',
    srs: {
      objectives: ['Model deployment', 'REST API', 'Flask framework'],
      requirements: ['Load trained model', 'Create Flask API', 'Prediction endpoint', 'Test API'],
      constraints: ['Use Flask'],
      deliverables: ['app.py']
    },
    testCases: [{ input: '', expectedOutput: 'API deployed', isPublic: true }],
    initialFiles: [
      { path: 'app.py', content: 'from flask import Flask, request, jsonify\nimport pickle\n# Flask API\n', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Python', command: 'python3', versionCommand: 'python3 --version' }],
    timeLimit: 50,
    points: 200
  },
  {
    title: 'IoT - Ultrasonic Distance Sensor',
    description: 'Measure distance using ultrasonic sensor',
    difficulty: 'Easy',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Ultrasonic sensor', 'Distance measurement', 'Serial output'],
      requirements: ['Setup HC-SR04 sensor', 'Trigger pulse', 'Calculate distance', 'Display on serial'],
      constraints: ['Use Arduino'],
      deliverables: ['ultrasonic.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Distance measured', isPublic: true }],
    initialFiles: [
      { path: 'ultrasonic.ino', content: 'const int trigPin = 9;\nconst int echoPin = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Measure distance\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'IoT - Servo Motor Control',
    description: 'Control servo motor with Arduino',
    difficulty: 'Easy',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Servo control', 'PWM signals', 'Motor positioning'],
      requirements: ['Include Servo library', 'Attach servo', 'Set position', 'Sweep motion'],
      constraints: ['Use Arduino'],
      deliverables: ['servo.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Servo moving', isPublic: true }],
    initialFiles: [
      { path: 'servo.ino', content: '#include <Servo.h>\nServo myservo;\n\nvoid setup() {\n  myservo.attach(9);\n}\n\nvoid loop() {\n  // Control servo\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 30,
    points: 100
  },
  {
    title: 'IoT - LCD Display Interface',
    description: 'Display data on LCD screen',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['LCD interfacing', 'I2C communication', 'Display text'],
      requirements: ['Setup LCD', 'Initialize display', 'Print text', 'Update display'],
      constraints: ['Use Arduino'],
      deliverables: ['lcd.ino']
    },
    testCases: [{ input: '', expectedOutput: 'LCD displaying', isPublic: true }],
    initialFiles: [
      { path: 'lcd.ino', content: '#include <LiquidCrystal.h>\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\nvoid setup() {\n  lcd.begin(16, 2);\n}\n\nvoid loop() {\n  // Display on LCD\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'IoT - DHT11 Humidity Sensor',
    description: 'Read temperature and humidity',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['DHT sensor', 'Read humidity', 'Read temperature'],
      requirements: ['Include DHT library', 'Read sensor data', 'Display values', 'Handle errors'],
      constraints: ['Use Arduino'],
      deliverables: ['dht.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Humidity and temperature read', isPublic: true }],
    initialFiles: [
      { path: 'dht.ino', content: '#include <DHT.h>\n#define DHTPIN 2\n#define DHTTYPE DHT11\nDHT dht(DHTPIN, DHTTYPE);\n\nvoid setup() {\n  Serial.begin(9600);\n  dht.begin();\n}\n\nvoid loop() {\n  // Read DHT sensor\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 35,
    points: 125
  },
  {
    title: 'IoT - PIR Motion Sensor',
    description: 'Detect motion using PIR sensor',
    difficulty: 'Easy',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Motion detection', 'Digital input', 'Sensor interfacing'],
      requirements: ['Setup PIR sensor', 'Read digital input', 'Detect motion', 'Trigger action'],
      constraints: ['Use Arduino'],
      deliverables: ['pir.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Motion detected', isPublic: true }],
    initialFiles: [
      { path: 'pir.ino', content: 'const int pirPin = 2;\nconst int ledPin = 13;\n\nvoid setup() {\n  pinMode(pirPin, INPUT);\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  // Detect motion\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 25,
    points: 100
  },
  {
    title: 'IoT - Bluetooth Communication',
    description: 'Wireless communication with Bluetooth',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Bluetooth module', 'Serial communication', 'Wireless control'],
      requirements: ['Setup HC-05 module', 'Serial communication', 'Send/receive data', 'Control device'],
      constraints: ['Use Arduino'],
      deliverables: ['bluetooth.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Bluetooth communication working', isPublic: true }],
    initialFiles: [
      { path: 'bluetooth.ino', content: '#include <SoftwareSerial.h>\nSoftwareSerial BTSerial(10, 11);\n\nvoid setup() {\n  Serial.begin(9600);\n  BTSerial.begin(9600);\n}\n\nvoid loop() {\n  // Bluetooth communication\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'IoT - WiFi Web Server',
    description: 'Create web server with ESP8266',
    difficulty: 'Hard',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['WiFi connectivity', 'Web server', 'HTTP requests'],
      requirements: ['Connect to WiFi', 'Create web server', 'Handle HTTP requests', 'Control devices'],
      constraints: ['Use ESP8266'],
      deliverables: ['wifi_server.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Web server running', isPublic: true }],
    initialFiles: [
      { path: 'wifi_server.ino', content: '#include <ESP8266WiFi.h>\n#include <ESP8266WebServer.h>\n\nconst char* ssid = "your_ssid";\nconst char* password = "your_password";\n\nvoid setup() {\n  // Setup WiFi server\n}\n\nvoid loop() {\n  // Handle requests\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 55,
    points: 225
  },
  {
    title: 'IoT - Firebase IoT Integration',
    description: 'Connect IoT device to Firebase',
    difficulty: 'Hard',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Cloud integration', 'Firebase', 'Real-time database'],
      requirements: ['Connect to Firebase', 'Send sensor data', 'Receive commands', 'Real-time sync'],
      constraints: ['Use ESP8266/ESP32'],
      deliverables: ['firebase_iot.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Firebase connected', isPublic: true }],
    initialFiles: [
      { path: 'firebase_iot.ino', content: '#include <FirebaseESP8266.h>\n\n// Firebase integration\n\nvoid setup() {\n  // Setup Firebase\n}\n\nvoid loop() {\n  // Send/receive data\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'IoT - Smart Home Automation',
    description: 'Build home automation system',
    difficulty: 'Hard',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Home automation', 'Multiple sensors', 'Device control'],
      requirements: ['Control lights', 'Monitor temperature', 'Motion detection', 'Mobile app control'],
      constraints: ['Use Arduino/ESP8266'],
      deliverables: ['smart_home.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Home automation working', isPublic: true }],
    initialFiles: [
      { path: 'smart_home.ino', content: '// Smart home automation\n\nvoid setup() {\n  // Setup devices\n}\n\nvoid loop() {\n  // Control automation\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 60,
    points: 250
  },
  {
    title: 'IoT - GPS Location Tracking',
    description: 'Track location using GPS module',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['GPS module', 'Location tracking', 'NMEA parsing'],
      requirements: ['Setup GPS module', 'Read GPS data', 'Parse coordinates', 'Display location'],
      constraints: ['Use Arduino'],
      deliverables: ['gps.ino']
    },
    testCases: [{ input: '', expectedOutput: 'GPS location tracked', isPublic: true }],
    initialFiles: [
      { path: 'gps.ino', content: '#include <TinyGPS++.h>\n#include <SoftwareSerial.h>\n\nTinyGPSPlus gps;\nSoftwareSerial ss(4, 3);\n\nvoid setup() {\n  Serial.begin(9600);\n  ss.begin(9600);\n}\n\nvoid loop() {\n  // Read GPS\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 45,
    points: 175
  },
  {
    title: 'IoT - RFID Access Control',
    description: 'Build RFID-based access system',
    difficulty: 'Medium',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['RFID technology', 'Access control', 'Card authentication'],
      requirements: ['Setup RFID reader', 'Read card ID', 'Authenticate user', 'Grant/deny access'],
      constraints: ['Use Arduino'],
      deliverables: ['rfid.ino']
    },
    testCases: [{ input: '', expectedOutput: 'RFID access working', isPublic: true }],
    initialFiles: [
      { path: 'rfid.ino', content: '#include <MFRC522.h>\n#include <SPI.h>\n\n#define SS_PIN 10\n#define RST_PIN 9\nMFRC522 rfid(SS_PIN, RST_PIN);\n\nvoid setup() {\n  Serial.begin(9600);\n  SPI.begin();\n  rfid.PCD_Init();\n}\n\nvoid loop() {\n  // Read RFID\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 40,
    points: 150
  },
  {
    title: 'IoT - Weather Station',
    description: 'Build complete weather monitoring system',
    difficulty: 'Hard',
    technology: 'IoT',
    category: 'iot',
    srs: {
      objectives: ['Multiple sensors', 'Data logging', 'Weather monitoring'],
      requirements: ['Temperature sensor', 'Humidity sensor', 'Pressure sensor', 'Display data', 'Log to cloud'],
      constraints: ['Use Arduino/ESP8266'],
      deliverables: ['weather_station.ino']
    },
    testCases: [{ input: '', expectedOutput: 'Weather data collected', isPublic: true }],
    initialFiles: [
      { path: 'weather_station.ino', content: '// Weather station\n\nvoid setup() {\n  // Setup sensors\n}\n\nvoid loop() {\n  // Read and log data\n}', readOnly: false }
    ],
    requiredSoftware: [{ name: 'Arduino', command: 'arduino-cli', versionCommand: 'arduino-cli version' }],
    timeLimit: 60,
    points: 250
  }
];

async function seedLabs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Lab.deleteMany({});
    console.log('Cleared existing labs');

    await Lab.insertMany(sampleLabs);
    console.log(`Seeded ${sampleLabs.length} labs`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding labs:', error);
    process.exit(1);
  }
}

seedLabs();
