
import { FAQItem } from './types';

export const FAQ_DATA: FAQItem[] = [
  {
    category: "General",
    question: "What is Nous Bot?",
    answer: "I am Nous Bot, your dedicated technical assistant. I'm designed to help you solve bugs, understand complex systems, and build software through conversational logic and precision documentation."
  },
  {
    category: "General",
    question: "How do I get started with modern development?",
    answer: "The best way is to learn the core foundations of Python or JavaScript, then explore robust libraries. Focus on understanding architecture, data structures, and how modern systems process context!"
  },
  {
    category: "JavaScript",
    question: "What is the difference between let, const, and var?",
    answer: "Historically, `var` was function-scoped. Modern JS uses `let` and `const` which are block-scoped. Use `const` for everything unless you specifically need to reassign a value, in which case use `let`."
  },
  {
    category: "JavaScript",
    question: "What are Promises in JavaScript?",
    answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to chain `.then()` and `.catch()` methods for much cleaner code than traditional callbacks."
  },
  {
    category: "React",
    question: "How does the useEffect hook work?",
    answer: "The `useEffect` hook handles side effects. It accepts a function and a dependency array. If the dependencies change, the function re-runs. It's the functional equivalent of lifecycle methods like componentDidMount."
  },
  {
    category: "React",
    question: "What is the Virtual DOM?",
    answer: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to calculate the minimum number of changes needed to update the UI (reconciliation), which makes updates incredibly fast."
  },
  {
    category: "TypeScript",
    question: "What are the benefits of using TypeScript?",
    answer: "TypeScript adds static typing to JS. It catches bugs early through type checking, provides superior IDE autocompletion, and acts as self-documenting code for your team."
  },
  {
    category: "TypeScript",
    question: "What is an Interface vs a Type?",
    answer: "Types are versatile and can define primitives, unions, and tuples. Interfaces are better for defining object shapes and support 'declaration merging'. Generally, use whichever fits your team's style!"
  },
  {
    category: "CSS",
    question: "What is the difference between Flexbox and CSS Grid?",
    answer: "Flexbox is 1-dimensional (row or column), best for content alignment. CSS Grid is 2-dimensional (rows and columns), best for high-level page layouts and complex structural designs."
  },
  {
    category: "Performance",
    question: "What is Memoization?",
    answer: "Memoization is a caching technique where you store the results of expensive function calls based on their inputs. In React, `useMemo` and `useCallback` prevent unnecessary re-renders of child components."
  },
  {
    category: "Performance",
    question: "How can I reduce my bundle size?",
    answer: "Use code splitting (React.lazy), tree-shaking, lazy loading images, and analyze your bundle with tools like Webpack Bundle Analyzer to find heavy dependencies that can be replaced."
  }
];

export const CATEGORIES = ["General", "JavaScript", "React", "TypeScript", "CSS", "Performance"];
