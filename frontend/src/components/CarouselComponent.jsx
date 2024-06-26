import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const CarouselComponent = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  React.useEffect(() => {
    if (!api) return;

    // Set the initial count of slides and current slide
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // Listen for slide selection changes
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carouselItems = [
    {
      image:
        "https://abp.championsofchange.gov.in/wp-content/uploads/2023/07/Agri_PB_4.png",
      content:
        "Black Rice: Transforming Chandauli District’s Agriculture and Farmers’ Livelihoods",
      theme: "Poverty Free and Enhanced Livelihoods Village",
    },
    {
      image:
        "https://abp.championsofchange.gov.in/wp-content/uploads/2023/07/GG_Energy_SE_3.png",
      content: "Palli Village – India’s First Carbon-Neutral Panchayat",
      theme: "Poverty Free and Enhanced Livelihoods Village",
    },
    {
      image:
        "https://abp.championsofchange.gov.in/wp-content/uploads/2023/07/Health_UP_5.png",
      content: "Empowering Communities to Combat Child Malnutrition",
      theme: "Poverty Free and Enhanced Livelihoods Village",
    },
  ];
  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        opts={{ autoplay: true, loop: true }}
      >
        <CarouselContent className="relative">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative w-full flex items-center justify-center p-0 rounded">
                  <img
                    src={item.image}
                    alt={item.content}
                    className="w-fit h-full rounded object-center object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white py-4 md:px-10 px-4">
                    <p className="text-xs rounded-lg w-fit text-white bg-primary px-1 md:px-5 py-2 md:py-1 font-medium">
                      {item.theme}
                    </p>
                    <p className="text-xs md:text-lg pt-2 px-3 font-semibold">
                      {item.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default CarouselComponent;
