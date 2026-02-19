const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const pythonMaterial = {
  title: "Python Programming",
  description: "Complete Python course covering fundamentals from introduction to operators",
  category: "Programming",
  difficultyLevel: "Beginner",
  estimatedDuration: "8 hours",
  chapters: [
    {
      title: "Introduction to Python",
      order: 1,
      lessons: [
        {
          title: "What is Python?",
          order: 1,
          content: "<h2>What is Python?</h2><p>Python is a high-level, interpreted programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991.</p><h3>Key Features:</h3><ul><li>Easy to learn and read</li><li>Versatile - used in web development, data science, AI, automation</li><li>Large standard library</li><li>Cross-platform compatibility</li></ul>",
          codeExamples: [
            {
              code: 'print("Hello, World!")',
              language: "python",
              explanation: "Your first Python program"
            }
          ],
          tryItYourself: {
            defaultCode: '# Write your first Python program\nprint("Hello, World!")',
            language: "python"
          }
        },
        {
          title: "Python Syntax Basics",
          order: 2,
          content: "<h2>Python Syntax</h2><p>Python uses indentation to define code blocks, making it clean and readable.</p><h3>Key Points:</h3><ul><li>Indentation is mandatory (usually 4 spaces)</li><li>No semicolons needed at end of lines</li><li>Comments start with #</li><li>Case-sensitive language</li></ul>",
          codeExamples: [
            {
              code: '# This is a comment\nprint("Python is easy")  # Inline comment\n\n# Multi-line code\nif True:\n    print("Indentation matters!")',
              language: "python",
              explanation: "Basic syntax and comments"
            }
          ],
          tryItYourself: {
            defaultCode: '# Try writing comments and print statements\nprint("Learning Python")',
            language: "python"
          }
        }
      ]
    },
    {
      title: "Data Types",
      order: 2,
      lessons: [
        {
          title: "Numeric Types",
          order: 1,
          content: "<h2>Numeric Data Types</h2><p>Python supports three numeric types:</p><ul><li><strong>int</strong> - Integer numbers (e.g., 5, -10, 1000)</li><li><strong>float</strong> - Decimal numbers (e.g., 3.14, -0.5)</li><li><strong>complex</strong> - Complex numbers (e.g., 2+3j)</li></ul>",
          codeExamples: [
            {
              code: "# Integer\nx = 10\nprint(type(x))  # <class 'int'>\n\n# Float\ny = 3.14\nprint(type(y))  # <class 'float'>\n\n# Complex\nz = 2 + 3j\nprint(type(z))  # <class 'complex'>",
              language: "python",
              explanation: "Different numeric types in Python"
            }
          ],
          tryItYourself: {
            defaultCode: "# Create different numeric types\nx = 42\ny = 3.14\nprint(x, y)",
            language: "python"
          }
        },
        {
          title: "String Type",
          order: 2,
          content: "<h2>Strings</h2><p>Strings are sequences of characters enclosed in quotes (single or double).</p><h3>String Operations:</h3><ul><li>Concatenation with +</li><li>Repetition with *</li><li>Indexing and slicing</li><li>Many built-in methods</li></ul>",
          codeExamples: [
            {
              code: '# String creation\nname = "Python"\ngreeting = \'Hello\'\n\n# Concatenation\nmessage = greeting + " " + name\nprint(message)  # Hello Python\n\n# Indexing\nprint(name[0])  # P\n\n# Slicing\nprint(name[0:3])  # Pyt',
              language: "python",
              explanation: "Working with strings"
            }
          ],
          tryItYourself: {
            defaultCode: '# Try string operations\ntext = "Python Programming"\nprint(text)',
            language: "python"
          }
        },
        {
          title: "Boolean Type",
          order: 3,
          content: "<h2>Boolean</h2><p>Boolean represents one of two values: <code>True</code> or <code>False</code>.</p><p>Used in conditional statements and logical operations.</p>",
          codeExamples: [
            {
              code: "# Boolean values\nis_active = True\nis_deleted = False\n\nprint(type(is_active))  # <class 'bool'>\n\n# Boolean from comparisons\nresult = 5 > 3\nprint(result)  # True",
              language: "python",
              explanation: "Boolean data type"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try boolean operations\nx = 10\ny = 5\nprint(x > y)",
            language: "python"
          }
        },
        {
          title: "Collection Types",
          order: 4,
          content: '<h2>Collection Data Types</h2><p>Python has four main collection types:</p><ul><li><strong>List</strong> - Ordered, mutable, allows duplicates [1, 2, 3]</li><li><strong>Tuple</strong> - Ordered, immutable, allows duplicates (1, 2, 3)</li><li><strong>Set</strong> - Unordered, mutable, no duplicates {1, 2, 3}</li><li><strong>Dictionary</strong> - Key-value pairs {"name": "John"}</li></ul>',
          codeExamples: [
            {
              code: '# List\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[0])  # apple\n\n# Tuple\ncoordinates = (10, 20)\n\n# Set\nunique_numbers = {1, 2, 3, 2}  # {1, 2, 3}\n\n# Dictionary\nperson = {"name": "John", "age": 30}\nprint(person["name"])  # John',
              language: "python",
              explanation: "Collection types overview"
            }
          ],
          tryItYourself: {
            defaultCode: "# Create a list and access elements\nmy_list = [1, 2, 3, 4, 5]\nprint(my_list[0])",
            language: "python"
          }
        }
      ]
    },
    {
      title: "Variables",
      order: 3,
      lessons: [
        {
          title: "Creating Variables",
          order: 1,
          content: "<h2>Variables in Python</h2><p>Variables are containers for storing data values. Python has no command for declaring a variable - it is created when you assign a value.</p><h3>Rules:</h3><ul><li>Must start with letter or underscore</li><li>Cannot start with a number</li><li>Can only contain alphanumeric characters and underscores</li><li>Case-sensitive (age, Age, AGE are different)</li></ul>",
          codeExamples: [
            {
              code: '# Valid variable names\nname = "John"\nage = 25\n_private = "hidden"\nuser_name = "john_doe"\n\n# Invalid variable names (will cause errors)\n# 2name = "Invalid"\n# my-name = "Invalid"\n# my name = "Invalid"',
              language: "python",
              explanation: "Variable naming rules"
            }
          ],
          tryItYourself: {
            defaultCode: '# Create your own variables\nname = "Alice"\nage = 30\nprint(name, age)',
            language: "python"
          }
        },
        {
          title: "Variable Assignment",
          order: 2,
          content: "<h2>Assigning Values</h2><p>Python allows multiple ways to assign values to variables.</p><h3>Assignment Types:</h3><ul><li>Single assignment</li><li>Multiple assignment</li><li>Multiple variables to same value</li><li>Unpacking</li></ul>",
          codeExamples: [
            {
              code: '# Single assignment\nx = 5\n\n# Multiple assignment\na, b, c = 1, 2, 3\n\n# Same value to multiple variables\nx = y = z = 10\n\n# Unpacking a list\nfruits = ["apple", "banana", "cherry"]\nfirst, second, third = fruits\nprint(first)  # apple',
              language: "python",
              explanation: "Different ways to assign variables"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try multiple assignment\nx, y, z = 10, 20, 30\nprint(x, y, z)",
            language: "python"
          }
        },
        {
          title: "Type Conversion",
          order: 3,
          content: "<h2>Type Conversion</h2><p>Convert between different data types using built-in functions.</p><h3>Common Functions:</h3><ul><li><code>int()</code> - Convert to integer</li><li><code>float()</code> - Convert to float</li><li><code>str()</code> - Convert to string</li><li><code>bool()</code> - Convert to boolean</li></ul>",
          codeExamples: [
            {
              code: '# String to integer\nage_str = "25"\nage_int = int(age_str)\nprint(age_int + 5)  # 30\n\n# Integer to string\nnum = 100\nnum_str = str(num)\nprint("Number: " + num_str)\n\n# Float to integer\nprice = 19.99\nprice_int = int(price)\nprint(price_int)  # 19',
              language: "python",
              explanation: "Converting between types"
            }
          ],
          tryItYourself: {
            defaultCode: '# Try type conversion\nx = "123"\ny = int(x)\nprint(y + 10)',
            language: "python"
          }
        }
      ]
    },
    {
      title: "Operators",
      order: 4,
      lessons: [
        {
          title: "Arithmetic Operators",
          order: 1,
          content: "<h2>Arithmetic Operators</h2><p>Used to perform mathematical operations.</p><table><tr><th>Operator</th><th>Name</th><th>Example</th></tr><tr><td>+</td><td>Addition</td><td>5 + 3 = 8</td></tr><tr><td>-</td><td>Subtraction</td><td>5 - 3 = 2</td></tr><tr><td>*</td><td>Multiplication</td><td>5 * 3 = 15</td></tr><tr><td>/</td><td>Division</td><td>5 / 2 = 2.5</td></tr><tr><td>//</td><td>Floor Division</td><td>5 // 2 = 2</td></tr><tr><td>%</td><td>Modulus</td><td>5 % 2 = 1</td></tr><tr><td>**</td><td>Exponentiation</td><td>5 ** 2 = 25</td></tr></table>",
          codeExamples: [
            {
              code: "a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a - b)   # 7\nprint(a * b)   # 30\nprint(a / b)   # 3.333...\nprint(a // b)  # 3 (floor division)\nprint(a % b)   # 1 (remainder)\nprint(a ** b)  # 1000 (10^3)",
              language: "python",
              explanation: "All arithmetic operators"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try arithmetic operations\nx = 15\ny = 4\nprint(x + y)\nprint(x ** y)",
            language: "python"
          }
        },
        {
          title: "Comparison Operators",
          order: 2,
          content: "<h2>Comparison Operators</h2><p>Used to compare two values, returns True or False.</p><table><tr><th>Operator</th><th>Name</th><th>Example</th></tr><tr><td>==</td><td>Equal</td><td>5 == 3 → False</td></tr><tr><td>!=</td><td>Not equal</td><td>5 != 3 → True</td></tr><tr><td>></td><td>Greater than</td><td>5 > 3 → True</td></tr><tr><td><</td><td>Less than</td><td>5 < 3 → False</td></tr><tr><td>>=</td><td>Greater or equal</td><td>5 >= 5 → True</td></tr><tr><td><=</td><td>Less or equal</td><td>5 <= 3 → False</td></tr></table>",
          codeExamples: [
            {
              code: "x = 10\ny = 5\n\nprint(x == y)  # False\nprint(x != y)  # True\nprint(x > y)   # True\nprint(x < y)   # False\nprint(x >= 10) # True\nprint(y <= 5)  # True",
              language: "python",
              explanation: "Comparison operators in action"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try comparison operators\na = 20\nb = 15\nprint(a > b)\nprint(a == b)",
            language: "python"
          }
        },
        {
          title: "Logical Operators",
          order: 3,
          content: "<h2>Logical Operators</h2><p>Used to combine conditional statements.</p><table><tr><th>Operator</th><th>Description</th><th>Example</th></tr><tr><td>and</td><td>Returns True if both are true</td><td>x > 5 and x < 10</td></tr><tr><td>or</td><td>Returns True if one is true</td><td>x > 5 or x < 3</td></tr><tr><td>not</td><td>Reverses the result</td><td>not(x > 5)</td></tr></table>",
          codeExamples: [
            {
              code: "x = 7\n\n# and operator\nprint(x > 5 and x < 10)  # True\n\n# or operator\nprint(x > 10 or x < 5)   # False\n\n# not operator\nprint(not(x > 5))        # False",
              language: "python",
              explanation: "Logical operators usage"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try logical operators\nage = 25\nprint(age >= 18 and age <= 65)",
            language: "python"
          }
        },
        {
          title: "Assignment Operators",
          order: 4,
          content: "<h2>Assignment Operators</h2><p>Used to assign values to variables with operations.</p><table><tr><th>Operator</th><th>Example</th><th>Same As</th></tr><tr><td>=</td><td>x = 5</td><td>x = 5</td></tr><tr><td>+=</td><td>x += 3</td><td>x = x + 3</td></tr><tr><td>-=</td><td>x -= 3</td><td>x = x - 3</td></tr><tr><td>*=</td><td>x *= 3</td><td>x = x * 3</td></tr><tr><td>/=</td><td>x /= 3</td><td>x = x / 3</td></tr><tr><td>%=</td><td>x %= 3</td><td>x = x % 3</td></tr></table>",
          codeExamples: [
            {
              code: "x = 10\n\nx += 5  # x = x + 5\nprint(x)  # 15\n\nx -= 3  # x = x - 3\nprint(x)  # 12\n\nx *= 2  # x = x * 2\nprint(x)  # 24\n\nx /= 4  # x = x / 4\nprint(x)  # 6.0",
              language: "python",
              explanation: "Assignment operators shortcuts"
            }
          ],
          tryItYourself: {
            defaultCode: "# Try assignment operators\ncount = 10\ncount += 5\nprint(count)",
            language: "python"
          }
        }
      ]
    }
  ]
};

async function seedPythonMaterial() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await StudyMaterial.deleteMany({ title: 'Python Programming' });
    console.log('Cleared existing Python materials');

    const material = await StudyMaterial.create(pythonMaterial);
    console.log('Python study material created successfully!');
    console.log('Material ID:', material._id);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedPythonMaterial();
