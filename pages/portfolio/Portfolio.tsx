import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaGithub, FaLinkedin, FaMailBulk, FaMailchimp } from 'react-icons/fa';

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Left Side - Name */}
        <div className="flex-1 z-10" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Sashank Thapa
          </h1>
          <p className="text-xl lg:text-2xl mt-6 text-gray-300 font-light">
            Software Developer
          </p>
          <p className="text-lg mt-4 text-gray-400 max-w-lg">
            Crafting digital experiences with modern technologies and clean design.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-6 mt-8">
            <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="mailto:sasank.thapa2000@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FaMailBulk className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Side - Navigation */}
        <div className="hidden lg:flex flex-col items-end space-y-6 z-10">
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Projects
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>


 {/* Lucidchart Section */}
      <section id="diagram" className="min-h-screen px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-center">AI Timeline</h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Interactive diagram showcasing the development of AI throughout history with a focus on AI Winters and the recent cloud computing boom.
          </p>
          
          <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://lucid.app/lucidspark/fdf31a90-ec0c-450e-aac3-164f7736a93b/edit?viewport_loc=-669%2C-482%2C3329%2C1811%2CWo7XGUmFX9uF&invitationId=inv_4fcb3f2d-b76b-450c-a634-18f647095b3b"
                width="100%"
                height="600"
                allowFullScreen
                className="w-full"
                title="Lucidchart Diagram"
              ></iframe>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://lucid.app/documents/view/your-lucidchart-id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors duration-300"
            >
              <FaExternalLinkAlt className="w-5 h-5" />
              View Full Diagram
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 text-center">Featured Projects</h2>
          
          <div className="grid lg:grid-cols-1 gap-8">
            {[{
              title:"BudgetBuddy AI assistant",
              description:"A ChatGPT budget assistant for all you financial needs!",
              link:" https://chatgpt.com/g/g-6872994953888191a4a589b3e995779c-budgetbuddy"

            }].map((project, index) => (
              <a href={project.link}>
              <div key={index} className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 w-full">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3"><FaExternalLinkSquareAlt className='w-5 h-5'/></h3>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <p className="text-gray-300 mb-4"></p>
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
