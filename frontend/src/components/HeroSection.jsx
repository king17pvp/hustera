import heroBg from "../assets/hero-image.png";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[700px] flex items-center px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-[1780px] mx-auto flex">
        <div className="px-12 max-w-4xl w-full">
          <h1 className="text-7xl font-avant-medium font-bold text-black leading-tight">
            Build Skills With <br /> Online Course
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
