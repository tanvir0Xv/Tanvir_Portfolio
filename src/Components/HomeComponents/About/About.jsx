import React from "react";
import CodeBlock from "./CodeBlock/CodeBloks";
import Lottie from "lottie-react";
import animationData from "/public/AnimationData.json";

const About = () => {
  return (
    <div
      id="About"
      className="bg-linear-to-b from-[#0A0118] via-[#0D0220] to-[#0A0118] pt-16 lg:pt-0"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-fuchsia-500">
        About Me
      </h1>
      <p className="text-fuchsia-300 text-center max-w-2xl mx-auto pb-5">
        React Developer | Full-Stack (MERN) Expert | Cloud & Performance
        Optimization Specialist
      </p>
      <div className="flex flex-col-reverse lg:flex-row  max-w-7xl mx-auto">
        <div>
          <CodeBlock />
        </div>
        <div>
          <Lottie loop={true} autoplay={true} animationData={animationData} />
        </div>
      </div>
    </div>
  );
};

export default About;
