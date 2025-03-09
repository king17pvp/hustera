import heroBg from "../assets/hero-image.png";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[700px] flex items-center px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-[1780px] mx-auto flex">
        <div className="px-12 max-w-4xl w-full">
          <h1 className="text-7xl font-bold text-black leading-tight">
            Build Skills With <br /> Online Course
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
          <button className="mt-6 px-6 py-3 text-white text-xl bg-blue-600 rounded-full hover:bg-blue-700 transition cursor-pointer">
            Posts Comment
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
