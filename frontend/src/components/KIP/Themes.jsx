import React from "react";

const ThemeCard = ({ imgUrl, theme }) => {
  return (
    <div className="hover:cursor-pointer relative min-w-48 h-[5.5rem]   rounded-lg overflow-hidden">
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
      theme: "Poverty Free and Enhanced Livelihoods Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957878/themes/sqoylgq7pcbst3otk2h8.jpg",
      theme: "Healthy Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957913/themes/m3vmfa6zy7fxazunf6rt.png",
      theme: "Child Friendly Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957901/themes/hfaiqrqfcbu0lo8pmkvz.jpg",
      theme: "Water Sufficient Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717959547/4_1_tnvg14.jpg",
      theme: "Clean and Green Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957905/themes/vfslczxbapybu08ttpok.jpg",
      theme: "Self-Sufficient Infrastructure in Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957911/themes/odken8cp40mxcvtxvoau.png",
      theme: "Socially Just & Socially Secured Village",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957912/themes/kxz127iusueqfl1y2is2.png",
      theme: "Village with Good Governance",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dtbbuevez/image/upload/v1717957904/themes/emyvzvsfause0lr5astz.jpg",
      theme: "Women Friendly Village",
    },
  ];

  return (
    <div className="w-[90vw] flex gap-5 items-center overflow-auto lg:flex-wrap lg:overflow-hidden">
      {images.map((d) => (
        <ThemeCard imgUrl={d.imgUrl} theme={d.theme} />
      ))}
    </div>
  );
};

export default Themes;
