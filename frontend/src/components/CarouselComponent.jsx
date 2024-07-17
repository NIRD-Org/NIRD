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

const CarouselComponent = ({ data }) => {
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
          {data &&
            data.map((item, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="relative w-full flex items-baseline justify-end p-0 rounded">
                    <img
                      src={item.image}
                      alt={item.activityTitle}
                      className="w-full h-full max-h-[65vh] rounded  object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white py-4 md:px-10 px-4">
                      <p className="text-xs rounded-lg w-fit text-white bg-primary px-1 md:px-5 py-2 md:py-1 font-medium">
                        {item.theme_name}
                      </p>
                      <p className="text-xs md:text-lg pt-2 px-3 font-semibold">
                        {item.activityTitle}
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
