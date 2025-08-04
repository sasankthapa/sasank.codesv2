import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaGithub, FaLinkedin, FaMailBulk, FaMailchimp } from 'react-icons/fa';

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleTop, setVisibleGoToTop] = useState(false)

  useEffect(() => {
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const openLinkOrScroll = (id:string, link:string) => {
    if(id == 'projects') setVisibleGoToTop(false)
    else if(id != "") setVisibleGoToTop(true)

    if(id != "") scrollToSection(id)
    else if(link != "") window.open(link,'_blank')?.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Left Side - Name */}
        <div className="flex-1 z-10" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
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
            <Link href="https://linkedin.com/in/sasank-t-b815b1104/" target="_blank" rel="noreferrer"><FaLinkedin className="m-1 text-xl lg:text-2xl" /></Link>
            <Link href="https://github.com/sasankthapa" target='_blank' rel='noreferrer'><FaGithub className="m-1 text-xl lg:text-2xl" /></Link>
            <a href="mailto:sasank.thapa2000@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FaMailBulk className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Side - Navigation */}
        <div className="hidden lg:flex flex-col items-end space-y-6 z-10">
          <button 
            onClick={() => openLinkOrScroll('projects','')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Projects
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaArrowDown onClick={()=>openLinkOrScroll('projects','')} className="w-6 h-6 text-gray-400" />
        </div>

        {visibleTop ? <div className="fixed top-8 left-4 transform -translate-x-1/2 animate-bounce">
          <FaArrowUp onClick={()=>openLinkOrScroll('projects','')} className="w-6 h-6 text-gray-400" />
        </div>: null}
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 text-center">Featured Projects</h2>
          <div className="grid lg:grid-cols-1 gap-8">
            {[{
              title:"BudgetBuddy AI assistant",
              description:"A ChatGPT budget assistant for all you financial needs!",
              link:" https://chatgpt.com/g/g-6872994953888191a4a589b3e995779c-budgetbuddy",
              id:""
            },{
              title:"AI Timeline",
              description:"Timeline of AI",
              link:"",
              id:"diagram"
            },{
              title:"Blog: My favorite machine learning models(CNN and Linear Regression)",
              description:"",
              link:"",
              id:"CNNVSLINEARREGRESSION"
            },{
              title:"Blog: Machine Learning techniques",
              description:"",
              link:"",
              id:"MACHINELEARNINGTECHNIQUES"
            },{
              title:"Blog: Data Cleaning techniques",
              description:"",
              link:"",
              id:"DATACLEANINGTECHNIQUES"
            }
            ].map((project, index) => (
              <div key={index} onClick={()=>(openLinkOrScroll(project.id, project.link))} className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 w-full">
                <div className="p-6">
                  {project.link!=""?<h3 className="text-2xl font-bold mb-3"><FaExternalLinkSquareAlt className='w-5 h-5'/></h3>:null}
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <p className="text-gray-300 mb-4"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 {/* Lucidchart Section */}
      <section id="diagram" className="min-h-screen px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-center">AI Timeline</h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Interactive diagram showcasing the development of AI throughout history with a focus on AI Winters and the recent cloud computing boom.
          </p>
          <div style={{height:"80vh"}} className='w-full h-full'><iframe className='w-full h-full' src="https://lucid.app/documents/embedded/fdf31a90-ec0c-450e-aac3-164f7736a93b" id="BR5D47f~i0PY"></iframe></div>
        </div>
      </section>


      <section id="blogs" className="min-h-screen px-4 lg:px-8 py-20 text-xl">
        {[{
              id:"CNNVSLINEARREGRESSION",
              title:"My favorite machine learning models(CNN and Linear Regression)",
              description:`<span class="text-2xl">Machine learning example: Linear Regression</span><br/><br/>
Linear regression is interesting because when we think about regression, we usually think of a 2-dimentional graph with multiple dots. I remember taking a ruler and drawing the line best fit for this graph, meticulously measuring the distance between the points and the line.<br/>
The big difference in an actual linear regression algorithm is that it can have an “n” number of dimensions. So, we can have a dataset with 100, 300, or even thousands of dimensions, and we can still have a linear regression model.A linear regression model is best for any problem that has a clear linear relationship.<br/><br/>
<span class="text-xl">Real world example: Predicting medical cost based on patient data</span><br/><br/>
Using data of patients like age, sex, income, current medical cost, maybe even location and number of medical checkups per year. We will be able to create a model for cost for the patient. We can use these data to train a linear regression model and create a good cost model for predicting it.<br/><br/>
\n
<span class="text-2xl">Deep learning example: Convolutional Neural Network (CNN)</span><br/><br/>
A Convolutional Neural Network (CNN) is a type of neural network that works really well for image processing. This is because of the architecture of CNN. The start of this neural network is a matrix of nodes, with this matrix getting smaller and smaller, until the matrix is 1x1, which would help us classify the data. Since we can parse an image into a matrix of data, like a group of pixels by pixels, we can easily pass this image data into a CNN. <br/><br/>

<span class="text-xl">Real world example: Optical Character Recognition (OCR)</span><br/><br/>

Optical character Recognition is a very important issue to solve. If we have a large amount of undigitized text, it is almost impossible to accurately and quickly digitize this information to process it or analyze it. We use scanners to turn it into photos, but the photos still don’t have the exact text information. So, we must change this into text, which is done by using an OCR, which isn’t always accurate.<br/>
`
          }
         ].map(data => {
          return <div className="w-full bg-white/5 rounded-2xl px-4 py-2" key={data.id} id={data.id}>
              <h2 className="text-2xl lg:text-6xl font-bold mb-8">{data.title}</h2>
<div dangerouslySetInnerHTML={{__html:data.description}} />
            </div>
          })
        }
      </section>


    </div>
  );
};

export default Portfolio;
