import React, { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";

const MySkills = () => {
  const axiosInstance = useAxiosInstance();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosInstance]);

  // Memoized icon mapping
  const iconMap = useMemo(() => {
    const map = {};
    skills.forEach((skill) => {
      const IconComponent = Icons[skill.icon];
      map[skill.icon] = IconComponent ? (
        <IconComponent size={32} />
      ) : (
        <Icons.HelpCircle size={32} />
      );
    });
    return map;
  }, [skills]);

  if (loading)
    return <p className="text-center text-white mt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <section
      id="Skills"
      className="py-20 bg-gradient-to-b from-[#0A0118] via-[#0D0220] to-[#0A0118] text-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 bg-clip-text bg-gradient-to-r text-fuchsia-500"
        >
          My Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 text-fuchsia-300"
        >
          Here are the technologies and tools I work with to build modern web
          applications.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <TiltCard
              key={skill._id || idx}
              skill={skill}
              icon={iconMap[skill.icon]}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TiltCard = ({ skill, icon, delay }) => {
  const [isHover, setIsHover] = useState(false);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
    setGlowX(px);
    setGlowY(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlowX(0);
    setGlowY(0);
    setIsHover(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHover(true)}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-white/20 backdrop-blur-md bg-white/5 cursor-pointer relative overflow-hidden"
    >
      {isHover && (
        <motion.div
          style={{ x: glowX / 4, y: glowY / 4 }}
          className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none animate-glow"
        >
          <div
            className="w-full h-full rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${50 + glowX / 20}% ${50 + glowY / 20}%, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%)`,
              filter: "blur(40px)",
            }}
          ></div>
        </motion.div>
      )}

      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${skill.color}`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{skill.category}</h3>
      </div>

      <div className="space-y-4 relative z-10">
        {skill.items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span className="text-white/80">{item.level}%</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.level}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes rainbow-glow {
          0% { background-color: rgba(255, 0, 150, 0.15); }
          25% { background-color: rgba(0, 200, 255, 0.15); }
          50% { background-color: rgba(0, 255, 150, 0.15); }
          75% { background-color: rgba(255, 255, 0, 0.15); }
          100% { background-color: rgba(255, 0, 150, 0.15); }
        }
        .animate-glow > div {
          animation: rainbow-glow 2.5s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default MySkills;
