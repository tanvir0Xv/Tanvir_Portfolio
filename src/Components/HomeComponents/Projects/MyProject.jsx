import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ExternalLink, Github, Server, Laptop } from "lucide-react";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";
import AllProjectModal from "./allProjectModal";

const MyProject = ({ onAllProjectsClick }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const axiosInstance = useAxiosInstance();

  // Desktop screen original dimension
  const DESKTOP_WIDTH = 1440;
  const DESKTOP_HEIGHT = 720;
  const SCALE = 0.25;

  // Calculated scaled height (no cut)
  const VISIBLE_HEIGHT = DESKTOP_HEIGHT * SCALE; // = 180px
  const SCROLL_AMOUNT = (DESKTOP_HEIGHT - VISIBLE_HEIGHT) * SCALE; // = 135px

  useEffect(() => {
    axiosInstance.get("/projects").then((res) => setProjects(res.data));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <div
      id="Projects"
      className="py-16 bg-gradient-to-b from-[#0A0118] via-[#120224] to-[#0A0118] text-white"
    >
      <h1 className="text-4xl font-bold text-center mb-4 text-fuchsia-500">
        My Projects
      </h1>
      <p className="text-center mb-12 text-pink-200">
        Here are some of my best projects with smooth preview animations.
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {projects.map((project, idx) => (
          <div
            key={project._id}
            data-aos="zoom-in-up"
            data-aos-delay={idx * 200}
            className="relative bg-white/5 backdrop-blur-2xl border border-white rounded-3xl p-5
                       shadow-lg transition-all duration-500 hover:shadow-pink-500/40 overflow-hidden group"
          >
            {/* -------- Desktop Preview (Fixed) -------- */}
            <div
              className="w-full rounded-2xl mb-4 border border-white/20 bg-black overflow-hidden relative"
              style={{ height: `${VISIBLE_HEIGHT}px` }}
            >
              <div
                className="absolute top-0 left-0 transition-transform duration-[6000ms] ease-linear 
                          group-hover:-translate-y-[135px]"
                style={{
                  width: `${DESKTOP_WIDTH}px`,
                  height: `${DESKTOP_HEIGHT}px`,
                  transform: `scale(${SCALE})`,
                  transformOrigin: "top left",
                }}
              >
                <iframe
                  src={project.liveSite}
                  className="w-full h-full rounded-xl pointer-events-none"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Project Name */}
            <h2 className="text-xl font-bold mb-1">{project.name}</h2>

            {/* Title (NEW) */}
            <p className="text-pink-300 text-sm mb-2">{project.title}</p>

            {/* Description */}
            <p className="text-pink-200 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack?.frontend?.slice(0, 4).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <a
                href={project.liveSite}
                target="_blank"
                className="px-4 py-2 bg-pink-600/30 border border-pink-400 rounded-xl text-sm
                           hover:bg-pink-500 transition flex items-center gap-1"
              >
                <ExternalLink size={16} /> Live Site
              </a>
              <button
                onClick={() => setSelectedProject(project)}
                className="px-4 py-2 bg-purple-600/30 border border-purple-400 rounded-xl text-sm
                           hover:bg-purple-500 transition flex items-center gap-1"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <a
        onClick={onAllProjectsClick}
        className=" px-7 py-3 cursor-pointer flex mx-auto w-fit mt-14 rounded-xl font-semibold overflow-hidden text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 transition-all duration-500 hover:scale-105"
      >
        <span className="z-10">See All-Poject</span>
      </a>
      {/* -------- MODAL -------- */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-[999]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 border border-white/20 backdrop-blur-2xl p-8 rounded-3xl max-w-3xl text-white w-[90%] overflow-y-auto max-h-[90vh]"
          >
            {/* Modal Image (Fixed) */}
            {selectedProject.banner && (
              <img
                src={selectedProject.banner}
                className="w-full h-64 object-cover rounded-2xl mb-4 border border-white/20"
                alt={selectedProject.name}
                loading="lazy"
              />
            )}

            <h2 className="text-3xl font-bold mb-1">{selectedProject.name}</h2>
            <p className="text-pink-300 mb-4">{selectedProject.title}</p>

            <p className="text-pink-200 mb-4">{selectedProject.description}</p>

            {/* Tech Stack */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.techStack.frontend.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full"
                >
                  {t}
                </span>
              ))}
              {selectedProject.techStack.backend.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Features */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Features:</h3>
            <ul className="list-disc ml-5 mb-4 text-pink-200">
              {selectedProject.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* Extra Info */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Extra Info:</h3>
            <p>Role: {selectedProject.extra.role}</p>
            <p>Duration: {selectedProject.extra.duration}</p>
            <p>Purpose: {selectedProject.extra.purpose}</p>
            <p>Difficulty: {selectedProject.extra.difficultyLevel}</p>
            <p className="mt-1">
              Tags:{" "}
              {selectedProject.extra.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full mr-1"
                >
                  {t}
                </span>
              ))}
            </p>

            {/* Links */}
            <div className="mt-6 flex flex-wrap lg:flex-nowrap gap-3">
              <a
                href={selectedProject.liveSite}
                target="_blank"
                className="flex items-center gap-2 bg-pink-600/30 border border-pink-400 
                           px-4 py-2 rounded-xl hover:bg-pink-500 transition w-full lg:w-auto"
              >
                <Laptop size={18} /> Live Site
              </a>

              <a
                href={selectedProject.clientRepo}
                target="_blank"
                className="flex items-center gap-2 bg-purple-600/30 border border-purple-400 
                           px-4 py-2 rounded-xl hover:bg-purple-500 transition w-full lg:w-auto"
              >
                <Github size={18} /> Client Repo
              </a>

              <a
                href={selectedProject.serverRepo}
                target="_blank"
                className="flex items-center gap-2 bg-blue-600/30 border border-blue-400 
                           px-4 py-2 rounded-xl hover:bg-blue-500 transition w-full lg:w-auto"
              >
                <Server size={18} /> Server Repo
              </a>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="px-5 py-2 bg-red-500/40 border border-red-300 rounded-xl hover:bg-red-500 mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProject;
