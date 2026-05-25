require("dotenv").config();
const mongoose = require("mongoose");
const AssessmentQuestion = require("./models/AssessmentQuestion");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const qs = await AssessmentQuestion.find({ title: { $in: ["Median of Two Sorted Arrays", "Minimum Window Substring"] } });

  const medianTestCases = [
    { input: "1 3\n2", output: "2.0", isPublic: true, explanation: "merged array = [1,2,3] and median is 2." },
    { input: "1 2\n3 4", output: "2.5", isPublic: true, explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." },
    { input: "\n1", output: "1.0", isPublic: true, explanation: "merged array = [1] and median is 1." },
    { input: "2\n", output: "2.0", isPublic: false },
    { input: "0 0\n0 0", output: "0.0", isPublic: false },
    { input: "100000\n100001", output: "100000.5", isPublic: false },
    { input: "1 3 8 9 15\n7 11 18 19 21 25", output: "11.0", isPublic: false },
    { input: "23 26 31 35\n3 5 7 9 11 16", output: "13.5", isPublic: false },
    { input: "-5 3 6 12 15\n-12 -10 -6 -3 4 10", output: "3.0", isPublic: false },
    { input: "1 2 3 4 5\n6 7 8 9 10", output: "5.5", isPublic: false }
  ];

  const minWindowTestCases = [
    { input: "ADOBECODEBANC\nABC", output: "BANC", isPublic: true, explanation: "The minimum window substring BANC includes A, B, and C from string t." },
    { input: "a\na", output: "a", isPublic: true, explanation: "The entire string s is the minimum window." },
    { input: "a\naa", output: "", isPublic: true, explanation: "Both a's from t must be included in the window." },
    { input: "ab\nb", output: "b", isPublic: false },
    { input: "bba\nab", output: "ba", isPublic: false },
    { input: "thisisateststring\ntist", output: "tstri", isPublic: false },
    { input: "cabwefgewcwaefgcf\ncae", output: "cwae", isPublic: false },
    { input: "aaaaaaaaaaaabbbbbcdd\nabcdd", output: "abbbbbcdd", isPublic: false },
    { input: "x\ny", output: "", isPublic: false },
    { input: "abcdebdde\nbde", output: "bcde", isPublic: false }
  ];

  for (let q of qs) {
    if (q.title === "Median of Two Sorted Arrays") {
      q.testCases = medianTestCases;
    } else if (q.title === "Minimum Window Substring") {
      q.testCases = minWindowTestCases;
    }
    
    q.markModified("testCases");
    await q.save();
    console.log(`Updated testCases for ${q.title}: ${q.testCases.filter(tc => tc.isPublic).length} public, ${q.testCases.filter(tc => !tc.isPublic).length} hidden.`);
  }
  
  process.exit(0);
});
