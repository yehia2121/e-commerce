"use client";
import React from "react";
import img1 from "../../../../public/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/slider-image-3.jpeg";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function Mainslider() {
  return (
    <div>
      <div className="flex">
        <div className="w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image
                priority={true}
                src={img1}
                alt="alt"
                className="w-full h-[40vh] lg:h-[55vh]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority={true}
                src={img2}
                alt="alt"
                className="w-full h-[40vh] lg:h-[55vh]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority={true}
                src={img3}
                alt="alt"
                className="w-full h-[40vh] lg:h-[55vh]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
