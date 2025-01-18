'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

const PortraitsOfKerala = () => {
  const [portraits] = useState([
    {
      photo: "/projects/portraits-of-kerala/Vivek.JPG",
      name: "Vivek PV",
      details:"15, Student",
      story: `"I feel pride in our tradition of Theyyam. This vibrant culture, deeply rooted in our village, especially in Kannur's kavus, brings me joy and makes me proud of our heritage."`,
    },
  
    {
      photo: "/projects/portraits-of-kerala/Rabindran.JPG",
      name: "Rabindran",
      details:"70, Electrician and Plumber",
      story: `"Theyyam, is integral to our daily lives. It is unique and is simply part of who we are."`,
    },
    {
      photo: "/projects/portraits-of-kerala/Saji.JPG",
      name: "Saji, 40",
      details:"Tourism Professional and English Teacher",
      story: `"Theyyam is an essential part of our lives, especially for Hindus. It represents the cultural and spiritual essence of our community."`,
    },
    {
      photo: "/projects/portraits-of-kerala/Thusara.JPG",
      name: "Thushara",
      details: "40, Educator",
      story: `"This is me experiencing Theyyam for the first time and it's awesome. There is so much energy and beauty—it feels like something you I can experience again and again."`,
    },
    {
      photo: "/projects/portraits-of-kerala/Rajesh.JPG",
      name: "Rajesh",
      details:"47, Finance Manager",
      story: `"Theyyam, to us, is not just an art form—it is a deity, a divine experience that embodies the natural beauty and spiritual essence of Kerala."`,
    },
    {
        photo: "/projects/portraits-of-kerala/Ishan.JPG",
        name: "Ishan",
        details: "12, Student",
        story: `"I really like Kerala. Kerala is a special to live with so many gods and goddesses, each representing something unique."`,
      },
      
      {
        photo: "/projects/portraits-of-kerala/AradhyaDevpriyaDeva.JPG",
        name: "Aradhya, Devpriya, Deva",
        details: "14,18,16, Students",
        story: `"(names from left to right)"`,
      },
      
      {
        photo: "/projects/portraits-of-kerala/Naresh.JPG",
        name: "Naresh Roy",
        details: "39, Cane Craft Artisan",
        story: `"Kerala is a beautiful place, but I feel sometimes people let greed overshadow their humility. There’s a sense of superiority that creeps in, and it’s something we must address."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Suresh.JPG",
        name: "Suresh",
        details: "57, Wood Carver",
        story: `"I have dedicated 46 years of my life to wood carving, including intricate pieces like the elephant carving at the front. My craft is my pride and my contribution to Kerala’s artistic heritage."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Sani.JPG",
        name: "Sani", 
        details: "38, Painter",
        story: `"I do not know much. I work here."`,
      },
      
      {
        photo: "/projects/portraits-of-kerala/Ajaya.JPG",
        name: "Ajaya Kumar",
        details: "62, Tourism Guide",
        story: `"Kerala is a treasure trove of experiences—visit the waterfalls, explore the forests, enjoy the street food. There’s so much to discover and love."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Narayanan.JPG",
        name: "Narayanan",
        details: "70, Security Guard",
        story: `"What can I say about Kerala? It is wonderful, it is beautiful, and it is my home. I couldn’t imagine being anywhere else."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Sejith.JPG",
        name: "Shejith",
        details: "50, Tax Consultant",
        story: `"When you are in Kerala, visit the beaches, mosques, temples. The more you explore, the more amazing Kerala gets."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Salim.JPG",
        name: "Salim",
        details: "45, Chow Constructor",
        story: `"I am from Gujrat. I am here in Kerala to work, and I like the place"`,
      },
      {
        photo: "/projects/portraits-of-kerala/Sathvin.JPG",
        name: "Sathvin",
        details: "58, Company Owner",
        story: `"Kerala truly is 'God’s Own Country'—a land of unparalleled beauty, clean air, and a charm that is uniquely its own."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Jisha.JPG",
        name: "Dr. Jisha CK",
        details: "43, Assistant Professor",
        story: `"Kerala is my home, and it always will be. No matter where I go, I find myself missing its comfort and familiarity."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Mohamud.JPG",
        name: "Mohamud Koya",
        details: "80, Retired Government Worker",
        story: `"Uttichira is my home and it's the best. There are a lot of Muslims here"`,
      },
      
      {
        photo: "/projects/portraits-of-kerala/Badayakandy.JPG",
        name: "Badayakandy Basheer",
        details: "69, Businessman",
        story: `"I’ve traveled to 38 countries, but nowhere compares to Kerala — a land of educated people, abundant natural resources, and vibrant business opportunities. It’s truly one of a kind."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Yasir.JPG",
        name: "Yasir Kurikkal",
        details: "41, Practioner/Teacher of Kalari",
        story: `"Kalari is more than just a martial art—it’s a legacy of Kerala, passed down through generations, connecting us to our ancestors and preserving our rich traditions. I learned it from my father and now I teach it to my son."`,
      },
      {
        photo: "/projects/portraits-of-kerala/Dhanesh.JPG",
        name: "Dhanesh",
        details:"50, Chef",
        story: ``,
      },
      {
        photo: "/projects/portraits-of-kerala/Atish.JPG",
        name: "Atish",
        details: "7, Student",
        story: ``,
      },
      {
        photo: "/projects/portraits-of-kerala/Lalitha.JPG",
        name: "Lalitha",
        details: "55, Screw Pine Craft",
        story: ``,
      },
      {
        photo: "/projects/portraits-of-kerala/Sayed.JPG",
        name: "Sayed Salih Jiffri",
        details: "49, Jiffri Residence",
        story: ``,
      },

      {
        photo: "/projects/portraits-of-kerala/Wajid.JPG",
        name: "Wajid",
        details: "unknown",
        story: ``,
      },
      

  ]);

// export default PortraitsOfKerala;
const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of background images
  const images = [
    '/projects/portraits-of-kerala/unknown.JPG',
    '/projects/portraits-of-kerala/unknown2.JPG',
    '/projects/portraits-of-kerala/MuraliPanicker.JPG',
    '/projects/portraits-of-kerala/TheyyamPerformer.JPG',
    
  ];

  // Update background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <section
  className="relative h-screen bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: `url(${images[currentImageIndex]})`, // Rotating background image
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-70"></div> {/* Increased opacity */}
  <div className="relative text-center text-white px-6">
    <h1 className="text-[100px] font-bold mb-4" style={{ fontFamily: 'Impact' }}>Portraits of Kerala</h1>

    <p className="w-4/5 mx-auto text-xl font-light text-white mb-8">
  This is a collection of personal stories from the diverse people of Kerala, offering a glimpse into the state&apos;s rich traditions and evolving culture. Through their responses to the questions, 
  <span className="font-semibold">&quot;How do you feel about Theyyam?&quot;</span> and 
  <span className="font-semibold">&quot;If you were to say things about Kerala to people, what would you say?&quot;</span>, 
  each individual shares their perspective on what makes Kerala so special.
</p>
<p className="w-4/5 mx-auto text-xl font-light text-white mb-8">
  This project invites you to explore Kerala through the stories of its people. Each portrait reveals the living culture of Kerala—the traditions, the beauty, and the spirit that makes it unique.
</p>
<p className="w-4/5 mx-auto text-xl font-light text-white">
  It’s a celebration of what makes Kerala, Kerala—its past, present, and future, as seen through the eyes of those who call it home.
</p>

    <a
      href="#portraits-section"
      className="mt-8 inline-block text-white border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 transition-all"
    >
      Explore Stories
    </a>
  </div>
</section>

      {/* Portraits Section */}
      <section id="portraits-section" className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portraits.map((portrait, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={portrait.photo}
                alt={portrait.name}
                width={500}
                height={500}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {portrait.name}
                </h2> 
                <p className="text-gray-500  mb-2">{portrait.details}</p>
                <p className="text-gray-700 italic">{portrait.story}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-black-700 hover:text-white transition duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default PortraitsOfKerala;