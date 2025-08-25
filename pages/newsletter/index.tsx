import type { NextPage } from 'next'
import Head from 'next/head'
import EmailInput from './EmailInput';

const AIJobsNewsletter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-2xl px-8 py-12 my-8 shadow-2xl">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-black">
          AI Taking Even More Jobs?
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          AI is a prevalent topic in taking industry jobs for many people. This is one of the main backlashes against newer AI. 
          With the job market as competitive as ever, do you now have to compete with data crunching, fast, efficient artificial intelligence as well?
        </p>
      </header>

      {/* Industries Focus */}
      <section className="mb-12">
        <p className="text-xl text-gray-800 mb-8 text-center">
          We will be focusing on 3 key industries today:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300">
            <h3 className="text-xl font-bold text-black mb-2">Software</h3>
            <p className="text-gray-700 text-sm">High-paying jobs with incredible benefits, powering companies like NVIDIA, Netflix, and Meta</p>
          </div>
          
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300">
            <h3 className="text-xl font-bold text-black mb-2">Manufacturing</h3>
            <p className="text-gray-700 text-sm">Automotive manufacturing generates ~3% of US GDP and creates millions of jobs</p>
          </div>
          
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300">
            <h3 className="text-xl font-bold text-black mb-2">Supply Chain</h3>
            <p className="text-gray-700 text-sm">Optimizing transport, warehouse management, and logistics operations</p>
          </div>
        </div>
      </section>

      {/* Main Question */}
      <section className="mb-12">
        <h2 className="text-2xl lg:text-4xl font-bold mb-8 text-center text-black">
          So, what is AI doing to these industries?
        </h2>
        
        <div className="space-y-8">
          {/* Software Industry */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Software Industry Impact</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The software industry has been heavily impacted by the rise of AI, which is ironic because it is these same software companies 
                  that work on and create these AI tools. Meta and OpenAI have been leading the charge on the AI front.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Coding generation and "Vibe" coding have been increasingly popular, allowing people who haven't studied programming to create 
                  amazing things through coding.
                </p>
                <a 
                  href="https://2025.stateofai.dev/en-US/usage/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 underline"
                >
                  View State of AI Data Visualization
                </a>
              </div>
            </div>
          </div>

          {/* Manufacturing Industry */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Manufacturing (Automotive)</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The manufacturing industry is going through a transformation with AI and smart manufacturing using AI, robotics and data analytics. 
                  Ford is leading with their 2 new AI-powered quality assurance systems: AiTriz and MAIVS.
                </p>
                <div className="bg-gray-200 border border-gray-300 rounded-lg p-4">
                  <p className="text-black font-medium">AiTriz scans video feed for millimeter-level misalignments - something that we as people could never do.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supply Chain Industry */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Supply Chain Revolution</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Tools like generative AI and AI agents help interpret real-time data to optimize procurement, reducing reliance on surplus stock 
                  and cutting costs - with human oversight still critical for strategic decisions.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Blue Yonder leads as an AI-first platform for supply chain software. Big data companies like SAP, Oracle and Microsoft are key 
                  players for "just in time" inventory strategies.
                </p>
                <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 mb-4">
                  <p className="text-black font-medium">
                    Demand for AI in supply chain solutions is expected to surge from $2.7 billion to $55 billion by 2029.
                  </p>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Amazon Robotics has deployed 1 million robots at facilities worldwide and is on track to outnumber its human workforce.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://www.reuters.com/business/just-time-manufacturers-turn-ai-weather-tariff-storm-2025-08-13" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 underline"
                  >
                    Reuters: JIT Manufacturers & AI
                  </a>
                  <a 
                    href="https://www.freightwaves.com/news/amazon-robots-are-on-course-to-outnumber-its-human-workers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300 underline"
                  >
                    Amazon Robots vs Human Workers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs to Watch Out */}
      <section className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-black">
            Who needs to watch out?
          </h2>
        </div>
        
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Although the unemployment rate has been keeping steady at 3-4% for the last few years, significantly better than the 2020 mass layoffs, 
            this may change very soon as more companies lean on AI.
          </p>
          <p className="text-black font-medium">
            Once AI tools are tuned into the best performing employees, there are likely to be mass layoffs for less skilled workers.
          </p>
        </div>

        {/* Unemployment Chart Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-center">
          <div className="bg-gray-200 rounded-lg p-8 mb-4">
            <p className="text-gray-700">Civilian Unemployment Rate from the US Bureau of Labor Statistics</p>
          </div>
        </div>

        {/* Company Examples */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
            <h4 className="text-lg font-bold text-black mb-3">Amdocs</h4>
            <p className="text-gray-700 text-sm">
              Software and services firm announced hundreds of layoffs globally while establishing a GenAI and Data division team.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
            <h4 className="text-lg font-bold text-black mb-3">Microsoft</h4>
            <p className="text-gray-700 text-sm">
              30% of their code is now written by AI. Announced $500 million in savings with layoffs exceeding 15,300 jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gray-100 border border-gray-300 rounded-xl p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-black">
          So, what does this mean for workers?
        </h2>
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            With the establishment of AI teams in manufacturing industries like Ford and supply chain companies, although work like manning 
            the machinery or supervising the machinery will not go anywhere, people must refine their skills in AI to go higher up the ladder.
          </p>
          <div className="bg-gray-200 border border-gray-300 rounded-lg p-6 text-center">
            <p className="text-lg font-medium text-black">
              No need to fret about your job (just yet). But be sure to check in with the latest AI trends and improvements or you'll be left behind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Home: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>Sasank Thapa</title>
        <meta name="Sasank Thapa Newsletter" content="Links" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <EmailInput />
      <AIJobsNewsletter />
    </div>
  )
}

export default Home
