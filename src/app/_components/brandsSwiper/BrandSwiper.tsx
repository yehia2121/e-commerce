"use client";
import { brandsDaum } from "@/Types/brand.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandSwiper({ brands }: { brands: brandsDaum[] }) {
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 1550 }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <Link href={`/brands/${brand._id}`}>
              <div>
                <Image
                  alt={brand.name}
                  src={brand.image}
                  width={400}
                  height={500}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
