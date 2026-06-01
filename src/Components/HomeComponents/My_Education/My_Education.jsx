import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  StarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";

export default function EducationCards() {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/education");
        setEducationData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch education data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosInstance]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section
      id="Education"
      className=" bg-gradient-to-b from-[#0A0118] via-[#0D0220] to-[#0A0118] flex flex-col items-center justify-center py-12 px-4"
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-3 text-fuchsia-500 text-center">
        My Education
      </h1>
      <p className="text-center text-pink-200 mb-12 max-w-2xl">
        Here is a summary of my academic journey so far, showcasing both my
        strong foundation in science and practical experience in agriculture.
        Each step represents dedication, curiosity, and continuous learning.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {educationData.map((edu, idx) => (
          <div
            key={edu._id}
            data-aos="fade-up"
            data-aos-delay={idx * 200}
            data-aos-offset="200"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            className="relative bg-white/5 backdrop-blur-2xl border border-white rounded-3xl p-6
                       shadow-lg transform transition-all duration-500 ease-in-out
                       hover:bg-white/10 hover:shadow-2xl hover:shadow-fuchsia-500/50
                       card-float"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pointer-events-none blur-xl opacity-30"></div>

            {/* Glowing underline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-500 rounded-full opacity-0 transition-all duration-500 ease-in-out hover:opacity-100 shadow-[0_0_15px_#FF0080]"></div>

            {/* Degree */}
            <div className="flex items-center mb-2 relative z-10">
              <AcademicCapIcon className="w-5 h-5 text-pink-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">{edu.degree}</h2>
            </div>

            {/* Institution */}
            <div className="flex items-center mb-1 relative z-10">
              <BuildingLibraryIcon className="w-5 h-5 text-pink-300 mr-2" />
              <h3 className="text-md font-medium text-pink-200">
                {edu.institution}
              </h3>
            </div>

            {/* Session & Passing Year */}
            <div className="flex items-center text-sm text-pink-100 mb-2 relative z-10">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>
                Session: {edu.session} | Passing Year: {edu.passingYear}
              </span>
            </div>

            {/* GPA */}
            {edu.gpa && (
              <div className="flex items-center mb-2 relative z-10">
                <StarIcon className="w-4 h-4 mr-1 text-yellow-300" />
                <span className="px-3 py-1 bg-pink-500/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  GPA: {edu.gpa}
                </span>
              </div>
            )}

            {/* Subjects */}
            <div className="flex flex-wrap gap-2 mb-3 relative z-10">
              {edu.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-pink-500/20 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {sub}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="flex items-start text-pink-100 text-sm relative z-10">
              <InformationCircleIcon className="w-4 h-4 mr-2 mt-1" />
              <p>{edu.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hover floating animation */}
      <style>{`
        .card-float:hover {
          animation: floatCard 0.8s ease-in-out forwards;
        }
        @keyframes floatCard {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-5px) rotate(1deg) scale(1.02); }
          50% { transform: translateY(-10px) rotate(-1deg) scale(1.03); }
          75% { transform: translateY(-5px) rotate(1deg) scale(1.02); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
