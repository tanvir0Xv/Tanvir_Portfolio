import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import copy from "copy-to-clipboard";

// Helper function to convert arrays into single line
const formatJSON = (obj) => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (Array.isArray(newObj[key])) {
      newObj[key] = `[${newObj[key].join(", ")}]`;
    } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
      newObj[key] = formatJSON(newObj[key]);
    }
  }
  return newObj;
};

// Sample profile data
const profileData = {
  name: "Tanvir Hasan",
  title:
    "React Developer || Full-Stack Developer || MERN Expert  | Cloud & Performance Optimization Specialist",
  technologies: {
    frontEnd: [
      "Next.js (App Router)",
      "React.js (Hooks, Context/Redux)",
      "Tailwind CSS",
      "CSS",
      "HTML",
    ],
    backEnd: [
      "Node.js (Express & NestJS)",
      "RESTful APIs",
      "Authentication (JWT, OAuth)",
    ],
    databases: ["MongoDB (Mongoose ORM)", "Firebase (Firestore & Realtime DB)"],
    tools_platform: [
      "Git & GitHub",
      "Visual Studio Code",
      "Code",
      "npm",
      "pnpm",
      "Figma",
      "Postman",
      "AWS",
    ],
    devOps_Cloud: ["CI/CD (GitHub Actions)", "Vercel", "Netlify", "Surge"],
    testing: ["React DevTools", "Chrome DevTools"],
  },
  projectsCompleted: 15,
  successfulDeployments: "100+",
  codeQualityScore: "A+",
  avgPageSpeed: "90+ (Lighthouse)",
  hardworker: true,
  quickLearner: true,
  problemSolver: true,
  communicationSkill: "Excellent",
  teamPlayer: true,
  yearsOfExperience: 1.5,
};

// Process data
const processedData = {
  ...formatJSON(profileData),
};

// JSON string
const jsonString = JSON.stringify(processedData, null, 2); // 2 spaces for compact view

const CodeBlock = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(jsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="px-5 md:px-0">
      <div className="relative w-full max-w-xl mx-auto  rounded-xl shadow-2xl shadow-fuchsia-500/30 overflow-hidden my-6 bg-gray-800">
        {/* Header */}
        <div className="flex items-center p-2 bg-gray-900 border-b border-gray-700">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="flex-grow text-center text-xs text-gray-400 font-mono">
            tanvir.json
          </div>
        </div>

        {/* Code Block */}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="json"
            style={dracula}
            wrapLongLines={true}
            showLineNumbers={false}
            customStyle={{
              padding: "10px",
              margin: 0,
              borderRadius: "0 0 12px 12px",
              fontSize: "12px",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              backgroundColor: "#282a36",
            }}
          >
            {jsonString}
          </SyntaxHighlighter>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-1 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded transition"
        >
          {isCopied ? "Copied! ✅" : "Copy 📄"}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
