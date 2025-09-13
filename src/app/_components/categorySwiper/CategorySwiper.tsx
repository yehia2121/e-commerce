"use client";
import { categoriesType } from "@/Types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategorySwiper({ data }: { data: categoriesType[] }) {
  return (
    <>
      <p className="text-xl text-slate-700 font-semibold my-3">
        Shop Popular Categories
      </p>

      <Swiper
        spaceBetween={0}
        modules={[Autoplay]}
        autoplay={{ delay: 2750 }}
        breakpoints={{
          100: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
          1536: { slidesPerView: 8 },
        }}
      >
        {data.map((category) => (
          <SwiperSlide className="relative" key={category._id}>
            <Link href={`/categories/${category._id}`}>
              <Image
                priority={true}
                width={400}
                height={400}
                src={category.image}
                alt={category.slug}
                className="h-[150px] w-full object-cover"
              />
              <p>{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
