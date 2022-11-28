import { Carousel, CarouselItem } from "react-bootstrap";
import Image from "next/image";
import Footer from "./Footer";

export default function Slider() {
  return (
    <div>
      <Carousel controls={false} fade={true} interval={2000}>
        <CarouselItem>
          <Image
            className="d-block w-100 rounded-3"
            src="/Bilder/essen/burger.jpg"
            alt="burger"
            width={3000}
            height={200}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="d-block w-100 rounded-3"
            src="/Bilder/essen/pizza.jpg"
            alt="pizza"
            width={3000}
            height={200}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="d-block w-100 rounded-3"
            src="/Bilder/essen/burrito.jpg"
            alt="burrito"
            width={3000}
            height={200}
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
}
