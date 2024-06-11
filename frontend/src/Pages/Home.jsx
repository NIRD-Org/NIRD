import React from "react";

function Home() {
  return (
    <div>
      <section class="relative bg-cover bg-center h-screen">
        <div class="absolute inset-0 h-[100vh] bg-gray-900 opacity-50"></div>
        <div class="relative w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-full">
          <div className="flex flex-1">
            <div className="flex-1">
              <h1 class="text-white text-4xl md:text-6xl font-bold">
                Empowering Communities. Transforming Lives.
              </h1>
              <p class="mt-4 text-white text-lg md:text-xl">
                Join us in enhancing lives through sustainable development and
                empowering communities across India. Together, we can make a
                lasting impact.
              </p>
              <a
                href="#learn-more"
                class="mt-6 inline-block bg-[#004B86] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-900"
              >
                Learn More
              </a>
            </div>
            <div className="flex-1"></div>
            <img
              className="absolute w-full top-0 right-0 left-0 z-[-10] bg-opacity-30 h-[100%] object-cover"
              src="https://res.cloudinary.com/dtbbuevez/image/upload/v1717957901/themes/hfaiqrqfcbu0lo8pmkvz.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
      {/* <section>
        <div className="flex gap-10 items-center bg-transparent">
          <img className="w-40 mix-blend-multiply" src="/logo/LSDG Logo.png" alt="" />
          <div>
            <Themes />
          </div>
        </div>
      </section> */}
    </div>
  );
}

const ThemeCard = ({ imgUrl, theme }) => {
  return (
    <div className="hover:cursor-pointer relative min-w-64 h-[10rem]  rounded-lg overflow-hidden">
      <img src={imgUrl} alt="" className="h-full w-full object-cover " />
      <div className="absolute text-sm z-10 inset-0 w-full h-full flex items-center justify-center text-center bg-black/50 text-white font-semibold">
        {theme}
      </div>
    </div>
  );
};

const Themes = () => {
  const images = [
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957878/themes/sqoylgq7pcbst3otk2h8.jpg",
      theme: "Key performance indicators",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957878/themes/sqoylgq7pcbst3otk2h8.jpg",
      theme: "Training and Capacity building",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957913/themes/m3vmfa6zy7fxazunf6rt.png",
      theme: "Low cost voluntary activities",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717959547/4_1_tnvg14.jpg",
      theme: "Good practices and achievements",
    },
  ];

  return (
    <div className="flex gap-5 items-center overflow-auto lg:flex-wrap  lg:overflow-hidden">
      {images.map((d) => (
        <ThemeCard imgUrl={d.imgUrl} theme={d.theme} />
      ))}
    </div>
  );
};
export default Home;