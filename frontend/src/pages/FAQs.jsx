import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQItem from "../components/FAQItem";
import faqImage from "../assets/faqs.png"; 

const FAQs = () => {
  const faqData = [
    { question: "What is HUSTera?", answer: "HUSTera is an online learning platform and community forum designed to help students and professionals access high-quality courses and engage in discussions on various topics." },
    { question: "How does HUSTera work?", answer: "HUSTera offers a wide range of courses across different fields. Users can enroll in courses, participate in discussions, ask questions in the forum, and connect with other learners." },
    { question: "Is HUSTera free to use?", answer: "HUSTera provides both free and paid courses. Some content and community features are accessible for free, while premium courses may require a one-time payment or subscription." },
    { question: "Are there any prerequisites for courses?", answer: "Some courses may have prerequisites, which will be mentioned in the course description. However, many beginner-friendly courses are available without any prior knowledge required." },
    { question: "Can I download course materials?", answer: "Yes! Many courses offer downloadable resources, such as PDFs, slides, and assignments, which you can access after enrollment." },
    { question: "Will I receive a certificate upon course completion?", answer: "Yes, upon successfully completing a course, you will receive a certificate of completion, which you can share on your LinkedIn profile or resume." },
    { question: "How long do I have access to the course?", answer: "You have lifetime access to the course content after enrollment." },
    { question: "What is the HUSTera community forum?", answer: "The community forum is a space where learners can ask questions, discuss topics, and share knowledge with peers and instructors." },
    { question: "How do I post a question on the forum?", answer: "To ask a question, navigate to the forum section, select the relevant topic, and create a new post. Other users and experts will help answer your queries." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="FAQs" />
      <Breadcrumb paths={["Homepage", "FAQs"]} />

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center flex-grow mt-18">
        <div className="w-[1680px]">
          <h2 className="text-5xl font-avant-medium font-bold mb-8">FAQs</h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[1680px]">
          <div className="flex flex-col gap-4">
            {faqData.slice(0, Math.ceil(faqData.length / 2)).map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {faqData.slice(Math.ceil(faqData.length / 2)).map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      {/* Image Section at the Bottom */}
      <div className="w-full flex justify-center mt-10 mb-6">
        <img src={faqImage} alt="FAQs Illustration" className="w-[400px] md:w-[500px] lg:w-[600px]" />
      </div>

      {/* Footer at the very bottom */}
      <Footer />
    </div>
  );
};

export default FAQs;
