import etimg from "../../../assets/et.jpg"
import filer from "../../../assets/filer_image.png"
import reg from "../../../assets/registration.png"
const HomeHeroSection = () => {

  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Invest Smarter with  
            <span className="text-green-400"> Elite Trader</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Your all-in-one investment platform for stocks, crypto, forex and global markets.
            Track. Analyze. Grow your wealth confidently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#get-started"
              className="px-6 py-3 bg-green-400 text-black font-semibold rounded-md hover:bg-green-300 transition"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 border border-gray-500 text-gray-300 font-semibold rounded-md hover:border-green-400 hover:text-green-400 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Graphic / Image */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <img src={etimg} alt="" className="w-72 md:w-96 h-72 md:h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-xl opacity-90 shadow-2xl animate-pulse" />
          {/* <div className="w-72 md:w-96 h-72 md:h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-xl opacity-90 shadow-2xl animate-pulse"></div> */}
        </div>
      </div>

      {/* Additional Company Information Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trust & Legal Verification
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FBR Certificate */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              FBR Tax Filer Certificate
            </h3>
            <p className="text-gray-300 mb-4">
              Elite Trader Company is officially registered as a tax filer with the 
              Federal Board of Revenue (FBR). Our tax status ensures transparency 
              and compliance with national regulations.
            </p>

            {/* If you want to show an image, replace this div with <img src="/certificate.png" /> */}
            <img src={filer} className="w-full h-80 bg-gray-700 rounded-md flex items-center justify-center text-gray-400" alt="" />
            {/* <div >
              Certificate Preview
            </div> */}
          </div>

          {/* Company Registration */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Company Registration
            </h3>
            <p className="text-gray-300 mb-4">
              Our company is legally registered and recognized by national authorities. 
              All operations follow official compliance, licensing, and verification standards.
            </p>
              <img src={reg} alt="" className="w-full h-80 bg-gray-700 rounded-md flex items-center justify-center text-gray-400" />
            {/* <div "> */}
              {/* Registration Document */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
