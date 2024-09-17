import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section class="relative bg-cover bg-center h-[75vh] md:h-screen">
        {/* <div class="absolute inset-0 z-10 h-[100vh]  bg-gray-900 opacity-50"></div> */}
        <div class="relative w-full pt-20 mx-auto px-4 sm:px-6 lg:px-8 flex md:items-center justify-center h-full">
          <div className="flex flex-1 ">
            <div className="w-full md:w-[80%] lg:w-[60%] z-20 ">
              <h1 class="text-primary text-4xl  md:text-6xl lg:text-5xl font-bold">
                Project for Creating <br /> 250 Model GP Clusters
              </h1>
              <p class="mt-4 lg:pr-40 text-primary text-sm md:text-xl">
                Join us in enhancing lives through sustainable development and
                empowering communities across India. Together, we can make a
                lasting impact..
              </p>
              <Link
                to={"/project"}
                class="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-900"
              >
                Learn More
              </Link>
            </div>
            <div className="flex-1"></div>
            <img
              className="absolute w-full top-0 right-0 left-0 z-0  object-cover lg:object-fill opacity-30 md:opacity-50 lg:opacity-100 md:h-screen h-[75vh]"
              src="/nird-home.jpg"
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
    <div className="hover:cursor-pointer relative min-w-64 h-[10rem]  rounded-lg">
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
    <div className="flex gap-5 items-center overflow-auto lg:flex-wrap ">
      {images.map((d) => (
        <ThemeCard imgUrl={d.imgUrl} theme={d.theme} />
      ))}
    </div>
  );
};
export default Home;
