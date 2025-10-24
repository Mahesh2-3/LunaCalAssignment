"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfileTabs() {
  const [active, setActive] = useState("About Me");
  const tabs = ["About Me", "Experiences", "Recommended"];
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const scrollRef = useRef(null);

  // store uploaded + sample images
  const [images, setImages] = useState([
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [active]);

  const littleBox = "w-[9.31px] h-[9.31px] bg-[#4a4e54]";

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // 🧠 handle image uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length === 0) return;

    const newImages = validImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="h-[316px] 2xl:w-[720px] xl:w-[600px] lg:w-[540px] w-full lgg:mb-3 rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0_#00000040] bg-[#363c43] px-3 py-4 flex gap-2 max-lgg:h-[47%]">
      {/* Left Section */}
      <div className="h-[55%] pt-4 max-w-6 flex flex-col items-center justify-between">
        <Image alt="info" src="/info.svg" width={24} height={24} />
        <div className="flex flex-wrap gap-px">
          {Array(6)
            .fill()
            .map((_, i) => (
              <div key={i} className={littleBox} />
            ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-[91%] ml-2">
        <div className="flex h-[62px] items-center justify-between">
          <div className="xl:w-[150px] w-[100px] xl:h-[62px] h-10 text-white font-medium xl:text-xl text-base font-pops flex items-center justify-center bg-[#171717] xl:rounded-[20px] rounded-[15px]">
            Gallery
          </div>

          <div className="flex items-center gap-4">
            {/* Upload Button */}
            <button
              onClick={() => inputRef.current?.click()}
              className="xl:w-[132px] w-[100px] text-xs font-extrabold font-jakarta flex items-center justify-center cursor-pointer xl:h-[46px] h-[30px] xl:text-xs  gap-1 glass-component rounded-2xl bg-[#ffffff03]"
            >
              <span className="text-lg relative bottom-0.5">+</span>
              <span>ADD IMAGE</span>
            </button>

            {/* Hidden input for images */}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            <div
              onClick={() => handleScroll("left")}
              className="little-glass ml-4  xl:w-[45px] w-8 xl:h-[45px]  h-8 rounded-full cursor-pointer hover:scale-110 transition"
            >
              <img
                alt="arrow-left"
                src="/arrow.svg"
                className="xl:w-[15px] w-2.5 transform rotate-180 h-3.5 rounded-full"
              />
            </div>
            <div
              onClick={() => handleScroll("right")}
              className="little-glass xl:w-[45px] w-8 xl:h-[45px]  h-8 rounded-full cursor-pointer hover:scale-110 transition"
            >
              <img
                alt="arrow-right"
                src="/arrow.svg"
                className="xl:w-[15px] w-2.5 h-3.5 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div
          ref={scrollRef}
          className="grow px-4 flex h-[85%] items-center gap-4 overflow-x-auto scrollbar-hide"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{
                rotate: -3,
                translateY: -10,
                scale: 1.1,
                filter: "grayscale(0%)",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
              }}
              initial={{ filter: "grayscale(100%)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="shrink-0 rounded-[14px] overflow-hidden"
            >
              <Image
                src={src}
                alt={`img-${i}`}
                width={190}
                height={179}
                className="lgg:w-[190px] w-[140px] h-[130px] cursor-pointer lgg:h-[179px] rounded-3xl object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
