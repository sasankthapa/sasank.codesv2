import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import profileImage from '../../public/static/images/profile.jpg'
import { FaArrowDown, FaArrowUp, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaGithub, FaLinkedin, FaMailBulk, FaMailchimp } from 'react-icons/fa';
import Image from 'next/image';
import { mlModels, mlSections } from './mlModelsData';

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleTop, setVisibleGoToTop] = useState(false);
  const [expandedModel, setExpandedModel] = useState<number | null>(null);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const openLinkOrScroll = (id: string, link: string) => {
    if (id == 'projects' || id == 'about') setVisibleGoToTop(false)
    else if (id != "") setVisibleGoToTop(true)

    if (id != "") scrollToSection(id)
    else if (link != "") window.open(link, '_blank')?.focus()
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
            onClick={() => openLinkOrScroll('about', '')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            About Me
          </button>
          <button
            onClick={() => openLinkOrScroll('ml-models', '')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            ML Models
          </button>
          <button
            onClick={() => openLinkOrScroll('projects', '')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Projects
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaArrowDown onClick={() => openLinkOrScroll('about', '')} className="w-6 h-6 text-gray-400" />
        </div>

        {visibleTop ? <div className="fixed top-8 left-4 transform -translate-x-1/2 animate-bounce">
          <FaArrowUp onClick={() => openLinkOrScroll('about', '')} className="w-6 h-6 text-gray-400" />
        </div> : null}
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-row items-center justify-start">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative group">
                {/* Main circular image */}
                <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={profileImage}
                    alt="Sasank Thapa"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Glowing ring effect */}
                <div className="absolute inset-0 w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10"></div>
              </div>
            </div>
            <h2 className="ml-8 text-4xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                I'm a passionate full-stack developer, with a big passion in AI who transforms ideas into
                elegant digital experiences.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                With a keen eye for design and a love for clean code, I specialize in
                building modern web applications that not only look great but perform
                exceptionally. I believe in the power of technology to solve real-world
                problems and create meaningful connections.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                With a keen eye for design and a love for clean code, I specialize in
                building modern web applications that not only look great but perform
                exceptionally. I believe in the power of technology to solve real-world
                problems and create meaningful connections.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                When I'm not crafting code, you'll find me exploring new frameworks,
                contributing to open source projects, or seeking inspiration in nature
                and design.
              </p>
            </div>

            {/* Right Column - Stats & Skills */}
            <div className="space-y-8">
              {/* Skills Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-center">Core Technologies</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'React', 'TypeScript', 'Node.js', 'Python',
                    'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
                    'GraphQL', 'Next.js', 'Tailwind', 'Firebase'
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-3 text-center text-sm font-medium transition-all duration-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Machine Learning Models Section */}
      <section id="ml-models" className="px-8 lg:px-16 pt-20 pb-36">
        <div className="max-w-6xl mx-auto">
          <a href="#ml-models">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Machine Learning Models
            </h2>
          </a>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Click any card to explore details
          </p>

          {mlSections.map((sec) => {
            const sectionModels = mlModels.filter((m) => m.section === sec.id);
            return (
              <div key={sec.id} className="mb-16">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{sec.label}</h3>
                  <p className="text-gray-400 text-sm">{sec.description}</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  {sectionModels.map((model) => {
                    const index = mlModels.indexOf(model);
              const isExpanded = expandedModel === index;
              return (
                <div
                  key={model.id}
                  onClick={() => setExpandedModel(isExpanded ? null : index)}
                  className={`group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10
                    ${isExpanded ? 'lg:col-span-3 transition-all duration-500' : 'lg:col-span-1'}
                  `}
                >
                  {/* Card Header — always visible */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2 block">
                          {model.category}
                        </span>
                        <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-purple-200">
                          {model.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{model.tagline}</p>
                      </div>
                      <span className={`text-purple-400 text-lg transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </div>

                    {/* Expanded content — grid-rows trick for smooth open/close */}
                    <div className={`grid ${isExpanded ? 'grid-rows-[1fr] mt-6 opacity-100 transition-all duration-500' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden min-h-0">
                      <p className="text-gray-300 leading-relaxed mb-6">{model.description}</p>

                      <div className="grid gap-6 lg:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Use Cases</h4>
                          <ul className="space-y-2">
                            {model.useCases.map((uc, i) => (
                              <li key={i} className="text-gray-300 text-sm flex gap-2">
                                <span className="text-pink-400 shrink-0">▸</span>
                                {uc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Strengths</h4>
                          <ul className="space-y-2">
                            {model.strengths.map((s, i) => (
                              <li key={i} className="text-gray-300 text-sm flex gap-2">
                                <span className="text-green-400 shrink-0">✓</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Limitations</h4>
                          <ul className="space-y-2 mb-4">
                            {model.limitations.map((l, i) => (
                              <li key={i} className="text-gray-300 text-sm flex gap-2">
                                <span className="text-red-400 shrink-0">✗</span>
                                {l}
                              </li>
                            ))}
                          </ul>
                          <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide mb-3">Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {model.exampleTools.map((tool, i) => (
                              <span key={i} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium text-gray-200">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                  );
                })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 text-center">Featured Projects</h2>
          <div className="grid lg:grid-cols-1 gap-8">
            {[
              {
                title: "TrustLens: AI Ethics & Compliance Dashboard Workflow",
                description: "TrustLens",
                link: "",
                tools: "ChatGPT, ",
                objective: "",
                process: "",
                valueandrev: "",
                id: "trustlens_ai_ethics_exercise"
              }, {
                title: "BudgetBuddy AI assistant",
                description: "A ChatGPT budget assistant for all you financial needs!",
                link: " https://chatgpt.com/g/g-6872994953888191a4a589b3e995779c-budgetbuddy",
                tools: "ChatGPT",
                objective: "Creating a AI Chatbot thats fully focused on creating a budget and reaching your financial goals.",
                process: "Prompting and iterating with a ChatGPT LLM to produce",
                valueandrev: "",
                id: ""
              },
              {
                title: "Newsletter: AI taking more jobs?",
                description: "Join my newsletter",
                link: "https://sasank.codes/newsletter",
                tools: "",
                objective: "",
                process: "",
                valueandrev: "",
                id: ""
              }
              , {
                title: "AI Timeline",
                description: "Timeline diagram of AI with focus on AI Winters 🥶",
                link: "",
                tools: "Lucidcharts",
                objective: "Learn about the history of AI and how it grew to what we recognize it today.",
                process: "Created with the help of Claude Sonnet 4 and cross reference with articles.",
                valueandrev: "Simple way to learn about the history of AI.",
                id: "diagram"
              }, {
                title: "Blog: My favorite machine learning models(CNN and Linear Regression)",
                description: "A small rant about CNN's and Linear Regression (and why I like them)",
                link: "",
                tools: "Python, PyTorch",
                objective: "Comparing and contrasting between CNN and linear Regression",
                process: "Investigating the best machine learning models for different cases. Specifically what cases are  better for CNN and linear regression.",
                valueandrev: "",
                id: "CNNVSLINEARREGRESSION"
              }, {
                title: "Blog: Machine Learning Basics",
                description: "Answering some basic machine learning questions",
                link: "",
                tools: "Python, Pytorch",
                objective: "Providing a basis for machine learning concepts",
                process: "",
                valueandrev: "Easy to see, cheatsheet for machine learning concepts",
                id: "MACHINELEARNINGTECHNIQUES"
              }, {
                title: "Blog: Dealing with Dirty Data",
                description: "Methods to deal with dirty data",
                link: "",
                tools: "Python, Pytorch, Imputer",
                objective: "Learning about data cleaning technologies.",
                process: "",
                valueandrev: "",
                id: "DATACLEANINGTECHNIQUES"
              },
            ].map((project, index) => (
              <div key={index} onClick={() => (openLinkOrScroll(project.id, project.link))} className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 w-full">
                <div className="p-6">
                  {project.link != "" ? <h3 className="text-2xl font-bold mb-3"><FaExternalLinkSquareAlt className='w-5 h-5' /></h3> : null}
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  {project.tools !== "" ? <p className="text-gray-300 mb-4"><span className='font-bold'>{"Tools: "}</span>{project.tools}</p> : null}
                  {project.objective !== "" ? <p className="text-gray-300 mb-4"><span className='font-bold'>{"Objectives: "}</span>{project.objective}</p> : null}
                  {project.process !== "" ? <p className="text-gray-300 mb-4"><span className='font-bold'>{"Process: "}</span>{project.process}</p> : null}
                  {project.valueandrev !== "" ? <p className="text-gray-300 mb-4"><span className='font-bold'>{"Value: "}</span>{project.valueandrev}</p> : null}
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
          <div style={{ height: "80vh" }} className='w-full h-full'><iframe className='w-full h-full' src="https://lucid.app/documents/embedded/fdf31a90-ec0c-450e-aac3-164f7736a93b" id="BR5D47f~i0PY"></iframe></div>
        </div>
      </section>


      <section id="blogs" className="min-h-screen px-4 lg:px-8 py-20 text-xl">
        {[{
          id: "trustlens_ai_ethics_exercise",
          title: "TrustLens: AI Ethics & Compliance Dashboard Workflow",
          description: `
<div class=''>

  <span class='block text-3xl font-bold mb-6'>
    TrustLens: AI Ethics & Compliance Dashboard Workflow
  </span>

  <div class='mb-6'>
    <span class='block text-xl font-semibold mb-2'>Objective</span>
    <span class='block'>
      To design, refine, and visually communicate an AI ethics checklist workflow for monitoring responsible AI development and deployment.
    </span>
  </div>

  <div class='mb-6'>
    <span class='block text-xl font-semibold mb-2'>Process</span>
    <span class='block'>
      I began by outlining the concept of TrustLens—an AI ethics and compliance dashboard meant to track ethical concerns, validate against strategy, and monitor AI bias. To build the first version of the checklist, I used ChatGPT to generate an ethical framework that aligned with the product vision. Once I had that draft, I moved into refinement by using PartyRock to rewrite and professionally polish the checklist content into a more structured and visually usable format. After that, I transformed the refined information into a visual piece using Microsoft Copilot to generate an infographic or visual asset that could make the action items easier to interpret. Throughout this process, I was aware that converting text-heavy content into visuals could risk losing important details, so I kept that limitation in mind as part of the workflow.
    </span>
  </div>

  <div class='mb-6'>
    <span class='block text-xl font-semibold mb-2'>Tools</span>
    <ul class='list-disc list-inside space-y-1'>
      <li><span>ChatGPT – for generating the original ethical checklist</span></li>
      <li><span>PartyRock – for rewriting and reformatting the checklist into polished sections</span></li>
      <li><span>Microsoft Copilot – for creating visual infographic/action plan content</span></li>
      <li><span>Video tool (if applicable) – for showcasing or documenting the process</span></li>
    </ul>
  </div>

  <div class='mb-6'>
    <span class='block text-xl font-semibold mb-2'>Value Proposition</span>
    <span class='block'>
      I used this project to demonstrate my ability to conceptualize and prototype ethical AI workflows across multiple platforms. I showed that I can take an abstract product idea and translate it into actionable assets by generating a checklist, refining it, and turning it into a visual format for broader usability. I also showed my awareness of potential trade-offs, such as losing important details when visualizing text-based content. Through this process, I illustrated my ability to iterate quickly using AI tools, recognize ethical risks, and make the information easier to apply across different AI projects.
    </span>
  </div>

  <div class='mb-6'>
    <span class='block text-xl font-semibold mb-2'>References</span>
    <ul class='list-disc list-inside space-y-1'>
      <li><span>ChatGPT session used to create the checklist</span></li>
      <li><span>PartyRock rewritten version</span></li>
      <li><span>TrustLens concept and notes</span></li>
      <li><span>Infographic created with Microsoft Copilot</span></li>
    </ul>
  </div>

</div>
`
        }, {
          id: "CNNVSLINEARREGRESSION",
          title: "My favorite machine learning models(CNN and Linear Regression)",
          description: `< span class= "text-2xl" > Machine learning example: Linear Regression</span><br /><br />
      Linear regression is interesting because when we think about regression, we usually think of a 2-dimentional graph with multiple dots. I remember taking a ruler and drawing the line best fit for this graph, meticulously measuring the distance between the points and the line.<br />
      The big difference in an actual linear regression algorithm is that it can have an “n” number of dimensions. So, we can have a dataset with 100, 300, or even thousands of dimensions, and we can still have a linear regression model.A linear regression model is best for any problem that has a clear linear relationship.<br /><br />
      <span class="text-xl">Real world example: Predicting medical cost based on patient data</span><br />
      Using data of patients like age, sex, income, current medical cost, maybe even location and number of medical checkups per year. We will be able to create a model for cost for the patient. We can use these data to train a linear regression model and create a good cost model for predicting it.<br /><br />
      \n
      <span class="text-2xl">Deep learning example: Convolutional Neural Network (CNN)</span><br />
      A Convolutional Neural Network (CNN) is a type of neural network that works really well for image processing. This is because of the architecture of CNN. The start of this neural network is a matrix of nodes, with this matrix getting smaller and smaller, until the matrix is 1x1, which would help us classify the data. Since we can parse an image into a matrix of data, like a group of pixels by pixels, we can easily pass this image data into a CNN. <br /><br />

      <span class="text-xl">Real world example: Optical Character Recognition (OCR)</span><br />
      Optical character Recognition is a very important issue to solve. If we have a large amount of undigitized text, it is almost impossible to accurately and quickly digitize this information to process it or analyze it. We use scanners to turn it into photos, but the photos still don’t have the exact text information. So, we must change this into text, which is done by using an OCR, which isn’t always accurate.<br />
      `
        },
        {
          id: "MACHINELEARNINGTECHNIQUES",
          title: "Machine Learning Basics",
          description: `<span class="text-lg font-bold ">1. How does a supervised learning model learn from the training data?</span><br />
      <span class=" ml-4">Uses labeled examples (input-output pairs) to learn patterns and make predictions by minimizing prediction errors through optimization algorithms.</span><br /><br />

      <span class="text-lg font-bold ">2. What is the main approach used to train models in unsupervised learning?</span><br />
      <span class=" ml-4">Finds hidden patterns, structures, or relationships in unlabeled data through techniques like clustering, dimensionality reduction, or density estimation.</span><br /><br />

      <span class="text-lg font-bold ">3. In reinforcement learning, how does an agent learn the best actions to take?</span><br />
      <span class=" ml-4">Through trial-and-error interactions with an environment, receiving rewards/penalties for actions and updating its policy to maximize cumulative rewards over time.</span><br /><br />

      <span class="text-lg font-bold ">4. Why are algorithms important in the training of machine learning models?</span><br />
      <span class=" ml-4">Algorithms define how models learn from data, optimize parameters, handle different data types, and determine the learning process efficiency and effectiveness.</span><br /><br />

      <span class="text-lg font-bold ">5. What are the basic steps involved in training a machine learning model?</span><br />
      <span class=" ml-4">Data preparation → Model selection → Training (feeding data + optimization) → Validation → Testing → Deployment.</span><br /><br />

      <span class="text-lg font-bold ">6. How does repetition (iterating over data) help in training a model?</span><br />
      <span class=" ml-4">Multiple passes through data allow gradual parameter refinement, better pattern recognition, improved generalization, and convergence to optimal solutions. Although, we need to take into account that too much repetition may overfit the model.</span><br /><br />

      <span class="text-lg font-bold ">7. What is the role of examples (data) in training a machine learning model?</span><br />
      <span class=" ml-4">Data provides the foundation for learning - quality and quantity of examples directly determine model performance, generalization ability, and real-world applicability.</span>`
        },
        {
          id: "DATACLEANINGTECHNIQUES",
          title: "Dealing with Dirty Data",
          description: ` <div>
        <span class="text-lg font-bold">Missing data values</span><br />
        <span>Common approaches (and the easiest) is to delete the missing data, however this may cause our data to not be enough, instead we could Impute. Imputation techniques replace missing values with statistical measures such as mean, median, or mode for numerical data, or the most frequent category for categorical data. Advanced methods include multiple imputation, which creates several plausible values based on other parameters, and there exist some machine learning-based imputation using algorithms like KNN or regression models.</span><br /><br />
      </div>

      <div>
        <span class="text-lg font-bold">Dirty data with nlp</span><br />
        <span>Natural Language Processing faces unique data quality challenges including inconsistent formatting, spelling errors, and varying text representations. Text preprocessing involves tokenization, lowercasing, and removing special characters or stop words. Normalization techniques include stemming and lemmatization to reduce words to their root forms. Handling inconsistencies requires fuzzy matching algorithms to identify similar entries, regular expressions for pattern-based cleaning, and spell checkers for error correction. Using these tokens to adjust sentiment is key in NLP data processing. </span><br /><br />
      </div>

      <div>
        <span class="text-lg font-bold">Skewed dataset</span><br />
        <span>Class imbalance occurs when one class significantly outnumbers others, leading to biased models that favor the majority class. Undersampling majority classes through random or informed selection. Algorithmic approaches include cost-sensitive learning that assigns higher penalties to minority class misclassifications, and ensemble methods like balanced bagging or boosting. We can also shift measurement statistics to more appropriate metrics like precision, recall, F1-score, and AUC-ROC. Threshold adjustment allows fine-tuning of decision boundaries to better capture minority class instances. We can also use models that better handle these skews like Random Forest.</span><br /><br />
      </div>`
        }
        ].map(data => {
          return <div className="max-w-3xl mx-auto leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-16 mb-16 mx-4 hover:bg-white/10 transition-all duration-300" key={data.id} id={data.id}>
            <h2 className="text-2xl lg:text-6xl font-bold mb-16 mt-4 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"><a href={data.id}>{data.title}</a></h2>
            <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed mx-8 my-12" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        })
        }
      </section >


    </div >
  );
};

export default Portfolio;
