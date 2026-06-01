import React, { useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiNextdotjs, SiMongodb } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactModal from "../ContactModal/ContactModal";

const Banner = ({ onContactClick }) => {
  const [developerText] = useTypewriter({
    words: [
      "Frontend Developer",
      "React Developer",
      "Next.js Specialist",
      "MERN Stack Developer",
      "Tailwind CSS Expert",
      "UI/UX Enthusiast",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div
      id="Home"
      className="relative lg:pb-20 bg-gradient-to-b from-[#0A0118] via-[#0D0220] to-[#0A0118] text-white overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 mt-32 lg:mt-40">
        {/* Left Text Container */}
        <div className="lg:w-2/3 relative" data-aos="fade-right">
          <div className="absolute inset-0 rounded-3xl bg-fuchsia-300/10 blur-2xl opacity-40 -z-10"></div>

          <p className="text-lg mb-2 text-gray-300 tracking-wide relative z-10">
            Crafting modern, efficient, and user-centric web applications.
          </p>

          <h1 className="text-5xl font-extrabold mb-4 leading-tight relative z-10">
            Hi, I’m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">
              Tanvir Hasan
            </span>
          </h1>

          <h2 className="text-3xl font-semibold mb-8 h-10 text-indigo-200 relative z-10">
            {developerText}
            <Cursor cursorStyle="|" cursorColor="#d946ef" />
          </h2>

          <p className="text-gray-300 mb-6 max-w-xl leading-relaxed relative z-10">
            I am a passionate full-stack developer with a strong focus on
            frontend development. I specialize in React, Next.js, and Tailwind
            CSS, creating clean, responsive, and interactive interfaces. My
            full-stack expertise with the MERN stack allows me to deliver
            complete solutions from concept to deployment.
          </p>

          {/* Main Buttons */}
          <div className="flex gap-4 mb-10 relative z-10 flex-wrap">
            {/* Get Resume */}
            <a
              href="https://drive.google.com/file/d/1-x0nXFYdwMK7wJYb6-Bj3_cWAak8o-eV/view?usp=drive_link"
              target="blank"
              className="relative px-7 py-3 rounded-xl font-semibold overflow-hidden text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10">Get Resume</span>
            </a>

            {/* Contact Me */}
            <a
              href="#contact"
              onClick={onContactClick}
              className="relative px-7 py-3 rounded-xl font-semibold border border-purple-400 text-purple-300 bg-purple-500/10 overflow-hidden transition-all duration-500 hover:bg-purple-500/20 hover:scale-105"
            >
              <span className="relative z-10">Contact Me</span>
            </a>
          </div>

          {/* Social & Skills */}
          <div className="flex flex-wrap gap-10 justify-between">
            {/* Find Me Section */}
            <div className="mb-6 relative z-10">
              <h3 className="text-lg font-semibold mb-3">Find Me:</h3>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://wa.me/8801796255213?text=Hi%20Tanvir,%20I%20came%20across%20your%20portfolio%20and%20I%E2%80%99m%20very%20impressed%20with%20your%20work.%20I%20would%20love%20to%20connect%20and%20discuss%20potential%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-green-400 rounded-xl relative overflow-hidden text-green-400 transition-all duration-500 hover:bg-green-400 hover:text-white hover:scale-105"
                >
                  <FaWhatsapp />
                  Whatsapp
                </a>
                <a
                  href="https://github.com/tanvir0Xv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-xl relative overflow-hidden text-gray-300 transition-all duration-500 hover:bg-gray-400 hover:text-white hover:scale-105"
                >
                  <FaGithub />
                  Github
                </a>
                <a
                  href="https://www.linkedin.com/in/tanvir0Xv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-xl relative overflow-hidden text-blue-400 transition-all duration-500 hover:bg-blue-400 hover:text-white hover:scale-105"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Familiar Section */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-3">Familiar With:</h3>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 px-4 py-2 border border-cyan-400 rounded-full text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300">
                  <FaReact />
                </span>
                <span className="flex items-center gap-2 px-4 py-2 border border-black rounded-full text-white hover:bg-gray-800/30 transition-all duration-300">
                  <SiNextdotjs />
                </span>
                <span className="flex items-center gap-2 px-4 py-2 border border-green-400 rounded-full text-green-300 hover:bg-green-400/20 transition-all duration-300">
                  <SiMongodb />
                </span>
                <span className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded-full text-green-300 hover:bg-green-500/20 transition-all duration-300">
                  <FaNodeJs />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Profile Image */}
        <div
          className="lg:w-1/3 flex justify-end mt-10 lg:mt-0 relative"
          data-aos="fade-left"
        >
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 opacity-20 blur-3xl -z-10"></div>
          <div className="w-96 h-96 rounded-full overflow-hidden border-[5px] border-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/70">
            <img
              src="/Banner_Image.JPG"
              alt="Profile"
              className="w-full h-full object-cover transition duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
