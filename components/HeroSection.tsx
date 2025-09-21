import React from "react";
import Link from "next/link";
import PixelBlast from "./reactbits/background";

function HeroSection() {
  return (
    <section className="pb-20 px-4 relative overflow-hidden">
      {/* PixelBlast Background */}

      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-yellow-400 text-sm font-medium rounded-full mb-6">
                AI-Powered Legal Analysis
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transform Complex Legal Documents into{" "}
                <span className="text-yellow-400">Plain English</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl lg:max-w-none">
                Stop signing documents you don't understand. Our AI Legal
                Guardian breaks down contracts, agreements, and legal documents
                so you can make informed decisions with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/upload"
                  className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-colors duration-200 shadow-lg"
                >
                  Analyze Your Document
                </Link>
                <Link
                  href="#demo"
                  className="px-8 py-4 border-2 border-gray-700/80 backdrop-blur-sm text-gray-300 font-semibold text-lg rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                >
                  See Demo
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 z-0">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  >
                    <PixelBlast
                      variant="circle"
                      pixelSize={6}
                      color="#EAB308"
                      patternScale={3}
                      patternDensity={1.2}
                      pixelSizeJitter={0.5}
                      enableRipples
                      rippleSpeed={0.4}
                      rippleThickness={0.12}
                      rippleIntensityScale={1.5}
                      liquid
                      liquidStrength={0.12}
                      liquidRadius={1.2}
                      liquidWobbleSpeed={5}
                      speed={0.6}
                      edgeFade={0.25}
                      transparent
                    />
                  </div>
                </div>
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-auto drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Circle */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="rgba(55, 65, 81, 0.2)"
                    stroke="rgba(229, 231, 235, 0.1)"
                    strokeWidth="2"
                  />

                  {/* Document */}
                  <rect
                    x="120"
                    y="140"
                    width="160"
                    height="200"
                    rx="8"
                    fill="rgba(55, 65, 81, 0.9)"
                    stroke="#4B5563"
                    strokeWidth="2"
                  />

                  {/* Document Header */}
                  <rect
                    x="120"
                    y="140"
                    width="160"
                    height="30"
                    rx="8"
                    fill="rgba(75, 85, 99, 0.9)"
                  />

                  {/* Document Title */}
                  <rect
                    x="135"
                    y="150"
                    width="80"
                    height="4"
                    rx="2"
                    fill="#EAB308"
                  />
                  <rect
                    x="135"
                    y="158"
                    width="60"
                    height="3"
                    rx="1.5"
                    fill="#9CA3AF"
                  />

                  {/* Complex Text Lines (Blurred/Illegible) */}
                  <g opacity="0.6">
                    <rect
                      x="135"
                      y="185"
                      width="120"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="192"
                      width="100"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="199"
                      width="130"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="206"
                      width="90"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="213"
                      width="110"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="220"
                      width="125"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="227"
                      width="95"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="234"
                      width="115"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="241"
                      width="105"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="248"
                      width="120"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="255"
                      width="85"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="262"
                      width="130"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="269"
                      width="100"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="276"
                      width="110"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="283"
                      width="95"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="290"
                      width="125"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="297"
                      width="115"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="304"
                      width="90"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="311"
                      width="120"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                    <rect
                      x="135"
                      y="318"
                      width="105"
                      height="2"
                      rx="1"
                      fill="#6B7280"
                    />
                  </g>

                  {/* Magnifying Glass Circle */}
                  <circle
                    cx="280"
                    cy="220"
                    r="60"
                    fill="rgba(17, 24, 39, 0.95)"
                    stroke="#EAB308"
                    strokeWidth="4"
                  />

                  {/* Magnifying Glass Handle */}
                  <line
                    x1="325"
                    y1="265"
                    x2="350"
                    y2="290"
                    stroke="#EAB308"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Clear Text Inside Magnifying Glass */}
                  <g clipPath="url(#magnifyingGlassClip)">
                    <rect
                      x="235"
                      y="195"
                      width="90"
                      height="3"
                      rx="1.5"
                      fill="#EAB308"
                    />
                    <rect
                      x="235"
                      y="203"
                      width="70"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                    <rect
                      x="235"
                      y="211"
                      width="85"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                    <rect
                      x="235"
                      y="219"
                      width="60"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                    <rect
                      x="235"
                      y="227"
                      width="75"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                    <rect
                      x="235"
                      y="235"
                      width="80"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                    <rect
                      x="235"
                      y="243"
                      width="65"
                      height="3"
                      rx="1.5"
                      fill="#D1D5DB"
                    />
                  </g>

                  {/* Clip path for magnifying glass */}
                  <defs>
                    <clipPath id="magnifyingGlassClip">
                      <circle cx="280" cy="220" r="55" />
                    </clipPath>
                  </defs>

                  {/* Sparkle Effects */}
                  <g opacity="0.8">
                    <circle cx="160" cy="120" r="3" fill="#EAB308">
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="320" cy="160" r="2" fill="#EAB308">
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="100" cy="280" r="2.5" fill="#EAB308">
                      <animate
                        attributeName="opacity"
                        values="0.4;1;0.4"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="340" cy="320" r="2" fill="#EAB308">
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Floating Elements */}
                  <g opacity="0.6">
                    <rect
                      x="90"
                      y="180"
                      width="15"
                      height="2"
                      rx="1"
                      fill="#4B5563"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 5,-2; 0,0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect
                      x="320"
                      y="250"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#4B5563"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; -3,2; 0,0"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
