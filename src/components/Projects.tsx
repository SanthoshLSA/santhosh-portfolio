import * as React from "react";
import { FolderGit2, Briefcase, ShoppingCart, Film, MessageSquare, Activity, Gamepad2 } from "lucide-react";
import ProjectCard, { ProjectProps } from "./ProjectCard";
import AnimatedHeading from "./AnimatedHeading";

export default function Projects() {
  const projectsData: (Omit<ProjectProps, "icon"> & { iconName: string })[] = [
    {
      title: "Full-Stack Job Portal Website",
      date: "Nov 2025 – Jan 2026",
      iconName: "job-portal",
      description: [
        "Built a MERN-based job portal with job search, applications, and resume upload.",
        "Implemented role-based authentication and recruiter dashboard for job management.",
        "Integrated Sentry for error tracking, performance monitoring, and deployed on Vercel.",
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Sentry", "Vercel"],
      githubUrl: "https://github.com/SanthoshLSA",
    },
    {
      title: "Full-Stack E-commerce Website",
      date: "Nov 2025 – Dec 2025",
      iconName: "e-commerce",
      description: [
        "Built a MERN-based e-commerce platform with user authentication, product listings, and cart management.",
        "Developed RESTful APIs and MongoDB schemas for product, user, and cart operations.",
        "Implemented an admin panel for real-time inventory management.",
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
      githubUrl: "https://github.com/SanthoshLSA",
    },
    {
      title: "CS Fundamentals Chatbot AI",
      date: "Dec 2025",
      iconName: "chatbot",
      description: [
        "Built an AI-powered chatbot to answer and explain CS fundamentals MCQs (DSA, OS, DBMS, CN).",
        "Integrated quiz mode with topic-wise questions, scoring, and AI-generated explanations.",
        "Designed an interactive Streamlit UI with chat bubbles, sidebar topic selection, and score cards.",
        "Deployed the application on Hugging Face Spaces with secure API key management.",
      ],
      tags: ["Python", "LLM API", "JSON", "Streamlit", "Hugging Face Spaces"],
      githubUrl: "https://github.com/SanthoshLSA",
      demoUrl: "https://santhosh-cs-ai-chatbot.streamlit.app/",
    },
    {
      title: "Movie Recommendation System",
      date: "Sep 2025",
      iconName: "movie-rec",
      description: [
        "Built a content-based movie recommendation system using the TMDb dataset.",
        "Used TF-IDF / CountVectorizer and cosine similarity for top-N movie recommendations.",
        "Developed a Streamlit web app for interactive, real-time recommendations.",
        "Emphasized efficient data preprocessing and vectorization pipelines.",
      ],
      tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
      githubUrl: "https://github.com/SanthoshLSA",
      demoUrl: "https://movie-recommendation-system-pnyhiy9hd2ofuljtf4leqr.streamlit.app/",
    },
    {
      title: "FractureDetect – Bone Fracture Detection",
      date: "Mar 2025 – Apr 2025",
      iconName: "fracture",
      description: [
        "Developed a full pipeline for detecting bone fractures from X-ray images without using OpenCV or ML libraries.",
        "Implemented grayscale conversion, resizing, blurring, histogram features, and custom edge detection.",
        "Designed a similarity-based classification method between 'Fractured' and 'Normal' images.",
      ],
      tags: ["Python", "NumPy", "Matplotlib", "Custom Image Algorithms"],
      githubUrl: "https://github.com/SanthoshLSA",
    },
    {
      title: "Game Library Management System",
      date: "Feb 2025 – Apr 2025",
      iconName: "game",
      description: [
        "Built an Internet Game Management System with secure backend and MySQL integration.",
        "Enabled wishlist functionality and keyword-based game search across multiple platforms.",
      ],
      tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL"],
      githubUrl: "https://github.com/SanthoshLSA",
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "job-portal":
        return <Briefcase className="h-5 w-5" />;
      case "e-commerce":
        return <ShoppingCart className="h-5 w-5" />;
      case "movie-rec":
        return <Film className="h-5 w-5" />;
      case "chatbot":
        return <MessageSquare className="h-5 w-5" />;
      case "fracture":
        return <Activity className="h-5 w-5" />;
      case "game":
        return <Gamepad2 className="h-5 w-5" />;
      default:
        return <FolderGit2 className="h-5 w-5" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow blob */}
      <div className="absolute right-10 bottom-1/4 h-[350px] w-[350px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider font-display mb-4">
            <FolderGit2 className="h-4 w-4" />
            <span>Portfolio</span>
          </div>
          <AnimatedHeading text="Projects" className="mx-auto" />
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              date={project.date}
              description={project.description}
              tags={project.tags}
              icon={getIcon(project.iconName)}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
