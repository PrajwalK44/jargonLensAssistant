"use client";
import React, { useEffect, useRef, useState } from "react";
import { FileText, Users, Zap } from "lucide-react";

const ProblemStatement = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: FileText,
      title: "Dense Legal Jargon",
      description:
        "Complex terminology and convoluted language make documents nearly impossible to understand",
      glowColor: "from-orange-500/30 to-red-500/30",
      iconColor: "text-orange-400",
      borderGlow: "hover:shadow-orange-500/25",
      delay: "delay-100",
    },
    {
      icon: Users,
      title: "Power Imbalance",
      description:
        "Document drafters have all the knowledge while signers are left in the dark",
      glowColor: "from-red-500/30 to-pink-500/30",
      iconColor: "text-red-400",
      borderGlow: "hover:shadow-red-500/25",
      delay: "delay-200",
      isCenter: true,
    },
    {
      icon: Zap,
      title: "Costly Consequences",
      description:
        "Hidden fees, restrictive clauses, and waived rights can lead to financial loss and legal disputes",
      glowColor: "from-yellow-500/30 to-orange-500/30",
      iconColor: "text-yellow-400",
      borderGlow: "hover:shadow-yellow-500/25",
      delay: "delay-300",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-800/40 via-gray-900/60 to-gray-900"></div>

      {/* Spotlight Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-radial from-orange-500/8 to-transparent rounded-full blur-3xl transform -translate-y-1/2"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            The Problem We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Solve
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Legal documents shouldn't be a{" "}
            <span className="text-red-400 font-semibold">mystery</span> that
            puts you at{" "}
            <span className="text-orange-400 font-semibold">risk</span>
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${problem.delay} ${
                  problem.isCenter ? "md:scale-105 md:-translate-y-4" : ""
                }`}
              >
                {/* Glassmorphism Card */}
                <div
                  className={`
                  relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 text-center border border-gray-700/50
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:-translate-y-6 hover:bg-gray-800/40
                  hover:border-gray-600/60 hover:shadow-2xl ${
                    problem.borderGlow
                  }
                  ${problem.isCenter ? "bg-gray-800/40 border-gray-600/60" : ""}
                `}
                >
                  {/* Glow Effect Behind Icon */}
                  <div
                    className={`
                    absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 
                    bg-gradient-to-br ${problem.glowColor} rounded-full blur-xl opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500
                  `}
                  ></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <Icon
                      className={`
                      h-14 w-14 mx-auto transition-all duration-500 
                      ${
                        problem.iconColor
                      } group-hover:scale-110 group-hover:drop-shadow-lg
                      ${problem.isCenter ? "scale-110" : ""}
                    `}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`
                    text-xl font-bold text-white mb-4 transition-colors duration-300
                    group-hover:text-gray-100 ${
                      problem.isCenter ? "text-2xl" : ""
                    }
                  `}
                  >
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`
                    text-gray-400 leading-relaxed transition-colors duration-300
                    group-hover:text-gray-300 ${
                      problem.isCenter ? "text-lg" : ""
                    }
                  `}
                  >
                    {problem.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div
                    className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                    bg-gradient-to-r ${problem.glowColor} rounded-full
                    group-hover:w-24 transition-all duration-500
                  `}
                  ></div>
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`
                    absolute top-4 right-4 w-1 h-1 ${problem.iconColor} rounded-full opacity-0
                    group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 delay-100
                  `}
                  ></div>
                  <div
                    className={`
                    absolute bottom-6 left-6 w-1.5 h-1.5 ${problem.iconColor} rounded-full opacity-0
                    group-hover:opacity-40 group-hover:animate-pulse transition-all duration-700 delay-300
                  `}
                  ></div>
                  <div
                    className={`
                    absolute top-1/2 left-4 w-0.5 h-0.5 ${problem.iconColor} rounded-full opacity-0
                    group-hover:opacity-50 group-hover:animate-pulse transition-all duration-700 delay-500
                  `}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gray-300 text-lg mb-4">
            Don't let legal complexity put you at a disadvantage
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default ProblemStatement;
