"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Phone, ArrowRight } from "lucide-react";
import "./components.css";

export default function Home() {
  const [isStacked, setIsStacked] = useState(false);

  // Detect when hero should stack
  useEffect(() => {
    const checkStacked = () => {
      setIsStacked(window.innerWidth <= 1279);
    };

    checkStacked();
    window.addEventListener("resize", checkStacked);
    return () => window.removeEventListener("resize", checkStacked);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Two Column Layout */}
      <div className="relative overflow-hidden -mt-0 z-10">
        <div
          className="grid grid-cols-1 xl:grid-cols-2"
          style={{ minHeight: "calc(100vh + 20px)" }}
        >
          {/* Left Column - Content with Neutral Background */}
          <div
            className="flex items-center justify-center p-4 lg:p-6 xl:p-16 hero-left-column"
            style={{ backgroundColor: "var(--neutral)" }}
          >
            {/* Content Container - All elements with increased gaps */}
            <div className="space-y-10 max-w-2xl hero-left-content">
              {/* Badge */}
              <Link
                href="/how-it-works"
                className="inline-flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:opacity-80 xl:mx-0 mx-auto"
                style={{
                  backgroundColor: "var(--neutral-dark)",
                  color: "var(--text-medium)",
                }}
              >
                See how it works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Title */}
              <h1
                className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-normal leading-none tracking-tight text-left xl:text-left max-w-xl hero-title-responsive"
                style={{ color: "var(--text-dark)" }}
              >
                The best way to run your service business
              </h1>

              {/* Description */}
              <p
                className="text-lg md:text-lg leading-relaxed text-left xl:text-left font-normal max-w-xl"
                style={{ color: "var(--text-medium)" }}
              >
                Operate your entire business from one simple platform. From your
                website and scheduling to marketing, payments, and more —
                everything runs on ToolPage.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 pt-2 hero-buttons-container">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[var(--primary)] hover:bg-[#FF7A33] text-white font-semibold rounded-lg text-lg transition-colors lotto-button"
                >
                  <span className="lotto-button-text">Start for free</span>
                  <ArrowRight className="lotto-button-arrow ml-2 h-5 w-4 transform -rotate-45" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center text-[#191C27] font-semibold text-lg transition-colors schedule-call-button"
                >
                  <Phone className="mr-2 h-5 w-4" />
                  <span className="schedule-call-text">Schedule a call</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Neutral Dark Background with Image Container */}
          <div
            className="relative h-full"
            style={{ backgroundColor: "var(--neutral-dark)" }}
          >
            {/* Texture Background Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/texture.png"
                alt="Texture overlay"
                className="w-full h-full object-cover opacity-20"
                style={{ filter: "brightness(0.8)" }}
              />
            </div>

            {/* Center Container with Two Rows */}
            <div className="right-column-container">
              {/* Top Row - Image Box on Left */}
              <div className="top-row hero-top-row">
                <div className="top-row-image-container animate-entrance-1">
                  <div className="top-row-card">
                    <div className="top-row-image-wrapper">
                      <img
                        src="/images/construction-worker.jpg"
                        alt="Construction worker"
                        className="top-row-image"
                      />
                      <img
                        src="/images/squares-neutral.png"
                        alt="Geometric squares pattern"
                        className="top-row-squares"
                      />
                    </div>
                    <div className="top-row-footer">
                      <h3 className="top-row-title text-link-underline">
                        Property Inspectors
                      </h3>
                      <ArrowRight className="top-row-arrow" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Landscape Card - Top Row */}
                <div className="top-row-overlap-card animate-entrance-2">
                  <div className="top-row-overlap-inner-card">
                    <div className="top-row-overlap-badge">Industries</div>
                    <div className="text-left">
                      <div className="top-row-overlap-number">50+</div>
                      <p className="top-row-overlap-text">
                        Toolpage works with professionals in over 50 different
                        industries
                      </p>
                    </div>
                  </div>
                  <Link href="/industries" className="top-row-overlap-link">
                    <span className="text-link-underline">
                      View all industries
                    </span>
                    <ArrowRight className="top-row-overlap-arrow" />
                  </Link>
                </div>
              </div>

              {/* Bottom Row - Image Box on Right */}
              <div className="bottom-row hero-bottom-row">
                <div className="bottom-row-image-container animate-entrance-3">
                  <div className="bottom-row-card">
                    <div className="bottom-row-image-wrapper">
                      <img
                        src="/images/dogwalker.jpg"
                        alt="Dog walker"
                        className="bottom-row-image"
                      />
                      <img
                        src="/images/squares-neutral.png"
                        alt="Geometric squares pattern"
                        className="bottom-row-squares"
                      />
                    </div>
                    <div className="bottom-row-footer">
                      <h3 className="bottom-row-title text-link-underline">
                        Dogwalkers
                      </h3>
                      <ArrowRight className="top-row-arrow" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Landscape Card - Bottom Row */}
                <div className="bottom-row-overlap-card animate-entrance-4">
                  <div className="bottom-row-overlap-inner-card">
                    <div className="top-row-overlap-badge">Efficiency</div>
                    <div className="text-left">
                      <img
                        src="/icons/duration.png"
                        alt="Duration icon"
                        className="bottom-row-overlap-icon"
                      />
                      <p className="top-row-overlap-text">
                        Toolpage businesses save an average of 14 hours per week
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/how-it-works"
                    className="bottom-row-overlap-link"
                  >
                    <span className="text-link-underline">
                      Learn how it works
                    </span>
                    <ArrowRight className="top-row-overlap-arrow" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Squares Image - Bottom Left Corner (Preserved) */}
            <div
              className={`absolute ${
                isStacked ? "top-0 left-0" : "bottom-0 left-0"
              }`}
            >
              <img
                src="/images/squares-neutral.png"
                alt="Geometric squares pattern"
                className="w-60 h-60 squares-hover"
              />
            </div>

            {/* Squares Image - Top Right Corner */}
            <div
              className={`absolute ${
                isStacked ? "bottom-0 right-0" : "top-40 right-0"
              }`}
            >
              <img
                src="/images/squares-primary.png"
                alt="Geometric squares pattern"
                className="w-40 h-40 transform rotate-180 squares-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
