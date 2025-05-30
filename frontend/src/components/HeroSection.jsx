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
          <p className="text-[22px] font-avant-medium text-gray-700 mt-4">
            Empower your learning journey at HUSTera. 
            Explore, enroll, and master new skills with courses designed for everyone, everywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
