import * as React from "react";
import { FolderGit2, Briefcase, ShoppingCart, Film, MessageSquare, Activity, TrendingUp } from "lucide-react";
import ProjectCard, { ProjectProps } from "./ProjectCard";
import AnimatedHeading from "./AnimatedHeading";
import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  const projectsData: (Omit<ProjectProps, "icon"> & { iconName: string })[] = [
    {
      title: "Autonomous Investment Research Agent",
      date: "Feb 2026",
      iconName: "investment",
      description: [
        "Architected a multi-agent LangGraph workflow orchestrating market data collection, technical analysis, sentiment scoring, and portfolio optimization.",
        "Built a simulated trading engine with SQLite-backed portfolios, live price valuation, and AI-recommended rebalancing.",
        "Deployed a Streamlit dashboard with candlestick charts, risk heatmaps, backtesting, and human-in-the-loop approval gate.",
      ],
      tags: ["Python", "LangGraph", "LangChain", "Streamlit", "Plotly", "SQLite"],
      githubUrl: "https://github.com/SanthoshLSA",
      demoUrl: "https://autonomous-investment-agent-live.streamlit.app/",
      codeSnippet: "const agent = new LangGraph();\nagent.addNode('fetch', marketData);\nagent.addNode('analyze', techAnalysis);\n\nagent.compile().invoke({\n  ticker: 'AAPL',\n  strategy: 'momentum'\n});",
    },
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
      codeSnippet: "router.post('/apply', auth, async (req, res) => {\n  const { jobId, resumeId } = req.body;\n  \n  const application = new Application({\n    job: jobId,\n    applicant: req.user._id,\n    resume: resumeId\n  });\n\n  await application.save();\n  res.status(201).json({ success: true });\n});",
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
      codeSnippet: "const cartSchema = new Schema({\n  user: { type: ObjectId, ref: 'User' },\n  items: [{\n    product: { type: ObjectId, ref: 'Product' },\n    quantity: { type: Number, default: 1 }\n  }],\n  totalAmount: Number\n});\n\nCart.calculateTotal(userId);",
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
      codeSnippet: "def generate_explanation(question, ans):\n    prompt = f\"Explain {question} with answer {ans}\"\n    response = llm.invoke(prompt)\n    return response.content\n\nst.chat_message('assistant').write(explain())",
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
      codeSnippet: "cv = CountVectorizer(max_features=5000,\n                    stop_words='english')\nvectors = cv.fit_transform(df['tags']).toarray()\n\nsimilarity = cosine_similarity(vectors)\n\ndef recommend(movie):\n    movie_idx = df[df['title'] == movie].index[0]\n    distances = similarity[movie_idx]\n    return sorted(list(enumerate(distances)),\\n                  reverse=True, key=lambda x:x[1])[1:6]",
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
      codeSnippet: "def detect_fracture(image_path):\n    img = read_raw_image(image_path)\n    gray = to_grayscale(img)\n    edges = custom_sobel_edge_detect(gray)\n    \n    hist = compute_histogram(edges)\n    score = compare_histograms(hist, normal_hist)\n    \n    return 'Fractured' if score < threshold else 'Normal'",
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
      case "investment":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <FolderGit2 className="h-5 w-5" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
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
            <ScrollReveal key={idx}>
              <ProjectCard
                title={project.title}
                date={project.date}
                description={project.description}
                tags={project.tags}
                icon={getIcon(project.iconName)}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
