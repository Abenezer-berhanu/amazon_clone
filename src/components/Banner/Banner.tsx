import Image from "next/image";
import sliderImg_1 from "@/Images/slider/sliderImg_1.jpg";
import sliderImg_2 from "@/Images/slider/sliderImg_2.jpg";
import sliderImg_3 from "@/Images/slider/sliderImg_3.jpg";
import sliderImg_4 from "@/Images/slider/sliderImg_4.jpg";
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority src={sliderImg_1} alt="carouser image" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <Image src={sliderImg_2} alt="carouser image" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <Image src={sliderImg_3} alt="carouser image" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
        <div>
          <Image src={sliderImg_4} alt="carouser image" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
      <div className="w-full h-10 md:h-20 lg:h-32 xl:h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
}

export default Banner;
