const mongoose = require('mongoose');
require('dotenv').config();

const pysparkQuestionSchema = new mongoose.Schema({
  tenantId: String,
  title: String,
  description: String,
  difficulty: String,
  csvData: String,
  filePath: String,
  expectedOutput: String,
  starterCode: String,
  hints: [String],
  tags: [String],
  isActive: Boolean
}, { timestamps: true });

const PySparkQuestion = mongoose.model('PySparkQuestion', pysparkQuestionSchema);

const insertQuestion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const question = {
      tenantId: 'orcode.in',
      title: 'Filter High-Value Customers',
      description: `You need to process a customer dataset to identify high-value customers. Specifically, you will:

1. Read data from a CSV file with inferSchema option as true
2. Filter customers with a purchase amount more than 100 USD
3. Further filter to include only customers aged 30 or above
4. Use display(df) to show the final DataFrame

Input File Path: /datasets/customers.csv

Schema:
- customer_id: integer
- name: string
- email: string
- age: integer
- purchase_amount: double

Expected Output:
The output should include customers who have a purchase amount of at least 100 USD and are aged 30 or above.`,
      difficulty: 'Easy',
      csvData: `customer_id,name,email,age,purchase_amount
1,Alice Johnson,alice@email.com,25,150.50
2,Bob Smith,bob@email.com,32,200.00
3,Charlie Brown,charlie@email.com,29,75.00
4,Diana Prince,diana@email.com,40,120.00
5,Evan Davis,evan@email.com,35,90.00`,
      filePath: '/datasets/customers.csv',
      expectedOutput: `2,Bob Smith,200.00
4,Diana Prince,120.00`,
      starterCode: `# Read CSV data from stdin
import sys
import csv
from io import StringIO

# Read CSV data
csv_data = sys.stdin.read()
reader = csv.DictReader(StringIO(csv_data))

# Process data
for row in reader:
    customer_id = int(row['customer_id'])
    name = row['name']
    age = int(row['age'])
    purchase_amount = float(row['purchase_amount'])
    
    # Your code here: Filter and display results
    
`,
      hints: [
        'Filter rows where purchase_amount > 100',
        'Then filter where age >= 30',
        'Print customer_id, name, and purchase_amount'
      ],
      tags: ['PySpark', 'DataFrame', 'Filter', 'CSV'],
      isActive: true
    };

    const result = await PySparkQuestion.create(question);
    console.log('Question inserted successfully:', result._id);

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

insertQuestion();
