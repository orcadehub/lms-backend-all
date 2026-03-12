const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const androidKotlinMaterial = {
  title: "Android Development with Kotlin",
  description: "Complete guide to Android app development using Kotlin, covering basics to advanced topics including Jetpack, MVVM, Firebase, and Clean Architecture",
  category: "Mobile Development",
  estimatedDuration: "120 hours",
  isActive: true,
  chapters: [
    {
      title: "Android Basics & Ecosystem",
      description: "Understanding Android platform, architecture, and development fundamentals",
      order: 1,
      lessons: [
        { title: "Introduction to Android Development", content: "", order: 1 },
        { title: "Evolution & Architecture of Android", content: "", order: 2 },
        { title: "Android System Architecture & Boot Process", content: "", order: 3 },
        { title: "How Android Apps Work (Process, Sandbox, ART)", content: "", order: 4 },
        { title: "Roadmap to Become Android Developer", content: "", order: 5 },
        { title: "Java vs Kotlin in Android", content: "", order: 6 }
      ]
    },
    {
      title: "Development Environment Setup",
      description: "Setting up Android Studio and understanding the build system",
      order: 2,
      lessons: [
        { title: "Installing Android Studio & SDK", content: "", order: 1 },
        { title: "Understanding Gradle Build System", content: "", order: 2 },
        { title: "Creating First Kotlin Project", content: "", order: 3 },
        { title: "Running App on Emulator & Real Device", content: "", order: 4 },
        { title: "Resolving Common Setup Errors", content: "", order: 5 }
      ]
    },
    {
      title: "Project Structure & Core Components",
      description: "Understanding Android project structure and core application components",
      order: 3,
      lessons: [
        { title: "Android Project Folder Structure", content: "", order: 1 },
        { title: "AndroidManifest.xml Explained", content: "", order: 2 },
        { title: "Application Components Overview", content: "", order: 3 },
        { title: "Activity Lifecycle (Deep Dive)", content: "", order: 4 },
        { title: "Configuration Changes & State Saving", content: "", order: 5 },
        { title: "Context & Bundle", content: "", order: 6 }
      ]
    },
    {
      title: "UI Layout System",
      description: "Building user interfaces with XML layouts and Jetpack Compose",
      order: 4,
      lessons: [
        { title: "View Hierarchy & Rendering", content: "", order: 1 },
        { title: "Layout Types (ConstraintLayout, LinearLayout)", content: "", order: 2 },
        { title: "Resource System (Strings, Styles, Themes)", content: "", order: 3 },
        { title: "Material Design Basics", content: "", order: 4 },
        { title: "ViewBinding", content: "", order: 5 },
        { title: "Introduction to Jetpack Compose (Basic UI & XML Comparison)", content: "", order: 6 }
      ]
    },
    {
      title: "UI Components & Interaction",
      description: "Working with UI components and handling user interactions",
      order: 5,
      lessons: [
        { title: "TextView & EditText", content: "", order: 1 },
        { title: "Buttons & Click Handling", content: "", order: 2 },
        { title: "RadioButton, CheckBox, ToggleButton", content: "", order: 3 },
        { title: "Toast & Snackbar", content: "", order: 4 },
        { title: "AlertDialog", content: "", order: 5 },
        { title: "Spinner (Basic & Custom)", content: "", order: 6 }
      ]
    },
    {
      title: "Intents & Navigation",
      description: "Navigation between screens and passing data",
      order: 6,
      lessons: [
        { title: "Explicit & Implicit Intents", content: "", order: 1 },
        { title: "Passing Data Between Activities", content: "", order: 2 },
        { title: "Back Stack Mechanism", content: "", order: 3 },
        { title: "Fragments & Fragment Lifecycle", content: "", order: 4 },
        { title: "Navigation Component", content: "", order: 5 }
      ]
    },
    {
      title: "RecyclerView & Dynamic Lists",
      description: "Displaying and managing dynamic lists efficiently",
      order: 7,
      lessons: [
        { title: "RecyclerView Architecture", content: "", order: 1 },
        { title: "Adapter & ViewHolder Pattern", content: "", order: 2 },
        { title: "Multiple View Types", content: "", order: 3 },
        { title: "DiffUtil", content: "", order: 4 },
        { title: "Introduction to Paging 3 (Concept & Large Data Handling)", content: "", order: 5 }
      ]
    },
    {
      title: "Local Data Storage",
      description: "Storing and managing data locally on device",
      order: 8,
      lessons: [
        { title: "Key-Value Storage (SharedPreferences & DataStore)", content: "", order: 1 },
        { title: "Internal & External Storage", content: "", order: 2 },
        { title: "SQLite Overview", content: "", order: 3 },
        { title: "Room Database (Entity, DAO)", content: "", order: 4 },
        { title: "Room Migrations", content: "", order: 5 }
      ]
    },
    {
      title: "Networking & JSON",
      description: "Working with REST APIs and handling network operations",
      order: 9,
      lessons: [
        { title: "REST API Fundamentals", content: "", order: 1 },
        { title: "JSON Parsing", content: "", order: 2 },
        { title: "Retrofit", content: "", order: 3 },
        { title: "Coroutines for Background Tasks", content: "", order: 4 },
        { title: "Error Handling Strategy", content: "", order: 5 },
        { title: "Result Wrapper Pattern (Success / Error / Loading States)", content: "", order: 6 }
      ]
    },
    {
      title: "Firebase Integration",
      description: "Integrating Firebase services for backend functionality",
      order: 10,
      lessons: [
        { title: "Firebase Setup", content: "", order: 1 },
        { title: "Authentication (Email & OTP)", content: "", order: 2 },
        { title: "Firestore Database", content: "", order: 3 },
        { title: "Cloud Messaging", content: "", order: 4 },
        { title: "Firebase with MVVM", content: "", order: 5 }
      ]
    },
    {
      title: "Jetpack & Architecture",
      description: "Modern Android architecture patterns and Jetpack libraries",
      order: 11,
      lessons: [
        { title: "Introduction to Android Jetpack", content: "", order: 1 },
        { title: "MVC vs MVP vs MVVM", content: "", order: 2 },
        { title: "ViewModel", content: "", order: 3 },
        { title: "LiveData vs StateFlow", content: "", order: 4 },
        { title: "Repository Pattern", content: "", order: 5 },
        { title: "Hilt Dependency Injection", content: "", order: 6 },
        { title: "WorkManager", content: "", order: 7 },
        { title: "Clean Architecture (Layered Structure Overview)", content: "", order: 8 },
        { title: "UseCase Layer (Single Responsibility Example)", content: "", order: 9 }
      ]
    },
    {
      title: "Maps, Media & Animations",
      description: "Working with maps, images, and animations",
      order: 12,
      lessons: [
        { title: "Google Maps API Setup", content: "", order: 1 },
        { title: "Markers & Location Tracking", content: "", order: 2 },
        { title: "Image Loading with Glide", content: "", order: 3 },
        { title: "Animations (Property & Lottie)", content: "", order: 4 }
      ]
    },
    {
      title: "Performance & Debugging",
      description: "Optimizing app performance and debugging techniques",
      order: 13,
      lessons: [
        { title: "Memory Leaks", content: "", order: 1 },
        { title: "Profiling Tools", content: "", order: 2 },
        { title: "ANR Analysis", content: "", order: 3 },
        { title: "Secure Coding Practices", content: "", order: 4 }
      ]
    },
    {
      title: "Testing",
      description: "Testing Android applications",
      order: 14,
      lessons: [
        { title: "Unit Testing Basics", content: "", order: 1 },
        { title: "UI & Instrumentation Testing Overview", content: "", order: 2 }
      ]
    },
    {
      title: "App Publishing & Monetization",
      description: "Publishing apps and monetization strategies",
      order: 15,
      lessons: [
        { title: "App Signing & Build Variants", content: "", order: 1 },
        { title: "Play Store Publishing", content: "", order: 2 },
        { title: "AdMob Integration", content: "", order: 3 },
        { title: "App Analytics", content: "", order: 4 }
      ]
    },
    {
      title: "Capstone Projects",
      description: "Real-world projects to apply learned concepts",
      order: 16,
      lessons: [
        { title: "Task Manager App (UI + interaction)", content: "", order: 1 },
        { title: "Notes App (Room + MVVM)", content: "", order: 2 },
        { title: "Weather App (API + Error handling)", content: "", order: 3 },
        { title: "Expense/Grocery App (Firebase + Clean Architecture)", content: "", order: 4 }
      ]
    }
  ]
};

async function seedAndroidKotlinMaterial() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const material = await StudyMaterial.create(androidKotlinMaterial);
    console.log(`Inserted Android Development with Kotlin study material with ${material.chapters.length} chapters and ${material.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)} lessons`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding Android Kotlin material:', error);
    process.exit(1);
  }
}

seedAndroidKotlinMaterial();
