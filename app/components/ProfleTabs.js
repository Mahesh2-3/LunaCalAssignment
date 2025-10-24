"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfileTabs() {
  const [active, setActive] = useState("AboutMe");
  const [HoveredTab, setHoveredTab] = useState("AboutMe");
  const tabs = ["AboutMe", "Experiences", "Recommended"];
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const el = tabRefs.current[active];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    };

    // Update on mount and whenever active changes
    updateIndicator();

    // Update on resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  const littleBox = "w-[9.31px] h-[9.31px] bg-[#4a4e54] ";

  return (
    <div className="2xl:w-[720px] xl:w-[600px] lg:w-[540px] w-full h-[316px] rounded-[18.89px] lgg:mb-3 tabs-shadow bg-[#363c43] px-3 py-4 flex gap-2 max-lgg:h-[47%]">
      {/* Left Section */}
      <div className="h-[55%] pt-2 w-6 flex flex-col items-center justify-between">
        <Image
          alt="info"
          src="/info.svg"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <div className="flex flex-wrap gap-px">
          {Array(6)
            .fill()
            .map((_, i) => (
              <div key={i} className={littleBox} />
            ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-[91%] w-full h-full">
        <div
          className="relative flex items-center justify-between gap-4 lgg
        :h-[62px] h-[50px] p-2 lgg:mb-8 mb-4 rounded-[23px] bg-[#171717]"
        >
          {/* Sliding Background */}
          <motion.div
            className="absolute top-2 z-10 bottom-2 rounded-2xl bg-[#28292f] shadow-[12px_12px_32px_14px_#141516e3]"
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{
              type: "ease",
              stiffness: 400,
              damping: 30,
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[tab] = el)}
              onMouseEnter={() => setHoveredTab(tab)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActive(tab)}
              className={`relative px-5 z-10 cursor-pointer text-center grow py-2.5 xl:text-lg text-base rounded-2xl font-pops font-medium transition-all ${
                active === tab
                  ? "text-white"
                  : "bg-transparent hover:text-white text-gray-300"
              }`}
            >
              <span
                className={`h-full transition-all duration-200 ease-in-out absolute top-0 left-0 z-10 opacity-40 bg-linear-to-r rounded-[23px]
                ${HoveredTab === tab && !(active === tab) ? "w-full" : "w-0"}
                 from-[#9e9eff30] to-[#babafd30] `}
              />
              <span className="z-50">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-gray-300 max-xl:text-sm tracking-wide font-jakarta grow leading-relaxed overflow-y-auto max-lgg:h-[70%] text-ellipsis pr-2">
          {active === "AboutMe" && (
            <>
              <p className="text-ellipsis">
                Hello! I’m Dave, your sales rep here from Salesforce. I’ve been
                working at this awesome company for 3 years now.
              </p>
              <br />
              <p className="text-ellipsis">
                I was born and raised in Albany, NY & have been living in Santa
                Carla for the past 10 years with my wife Tiffany and my
                4-year-old twin daughters – Emma and Ella. They’re just starting
                school, so my calendar is usually blocked between 9–10 AM.
              </p>
            </>
          )}
          {active === "Experiences" && (
            <p>
              I have over 10 years of experience in sales, marketing, and client
              relationship management, specializing in SaaS and CRM solutions.
            </p>
          )}
          {active === "Recommended" && (
            <p>
              Dave has been consistently rated as one of the top performers by
              his clients for his outstanding support and communication.
            </p>
          )}
        </div>
      </div>

      {/* Right Side Gradient */}
      <div className="h-full flex items-center">
        <div className="bg-linear-to-b w-2 h-15 rounded-lg from-[#888989] to-[#4a4e54]" />
      </div>
    </div>
  );
}
