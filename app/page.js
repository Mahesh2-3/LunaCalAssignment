import ProfileTabs from "./components/ProfleTabs";
import GalleryWidget from "./components/GalleryWidget";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center p-4 justify-center">
      <div className="flex max-lgg:flex-col-reverse items-center lgg:justify-start justify-center xl:gap-15 gap-6  text-[#A3ADB2] max-w-[1728px] max-h-[895px] w-full h-full mx-auto main px-7 lgg:py-12">
        {/* Right Side Content */}
        <div className="lgg:h-[689px] h-[30%] max-w-[836px] w-full rounded-[27px] bg-[#616161] border border-[#96bee7]" />

        <div className="relative w-[720px] max-lgg:h-[60%] max-lg:w-full top-4 flex flex-col items-center justify-center gap-3">
          <ProfileTabs />
          <div className="line-styles max-lgg:hidden" />
          <GalleryWidget />
          <div className="line-styles max-lgg:hidden" />
        </div>
      </div>
    </div>
  );
}
