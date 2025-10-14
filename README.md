# AI-Study-Buddy
AI Study Buddy is an AI-powered study assistant (web/mobile app) that works like a personal tutor.
•	Explain Mode: Breaks down tough concepts into beginner-friendly steps.
•	Summarization Mode: Condenses textbooks, PDFs, or handwritten notes into concise points.
•	Quiz/Flashcard Generator: Creates practice questions and flashcards to reinforce learning.

# Technical Architecture (Stack & Components)
**Frontend:**
•	React.js 
•	Tailwind CSS 
•	Quiz/ Flashcard UI
**Backend:**
•	Node.js + Express
•	Fast API 
•	API for LLM integration (OpenAI GPT-4o-mini / GPT-3.5)
**AI / LLM Layer:**
•	OpenAI API via prompts: Explain, Summarize, Quiz, Flashcards

# High-Level Goals & Success Criteria
# Goals:
1.	Enable students to grasp concepts quickly via AI explanations.
2.	Reduce the time spent summarizing notes manually.
3.	Provide instant, personalized quizzes/flashcards for revision.
4.	Ensure an intuitive and accessible user experience for all students.

# Success Criteria:
•	Users can enter a topic or upload notes and receive a clear explanation within 5 seconds.
•	Summaries are concise, accurate, and formatted for easy study.
•	Quiz/flashcard generation is functional, relevant, and provides at least 5 questions per input.

# Architecture Flow:
<img width="294" height="323" alt="Screenshot 2025-10-14 141658" src="https://github.com/user-attachments/assets/025a52ac-2a2a-4b68-9d5e-d8c94b54d5e5" />

# Future Scope:
•	Adaptive Learning : Adjust difficulty based on student performance.
•	Multi-modal Input : Accepts text, PDFs, and handwritten notes (via OCR).
