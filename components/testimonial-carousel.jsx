"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import testimonials from "@/data/testimonials.json";
import { Card, CardContent } from "./ui/card";

const TestimonialCarousel = () => {
  return (
    <div className="mt-24 p-20">
      <h2 className="text-3xl font-bold text-center text-orange-900 mb-12 font-poppins">
        What Our Writers Say
      </h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselPrevious />
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="px-8">
                  <blockquote className="space-y-4">
                    <p className="text-[17px] text-orange-700 italic font-inter">
                      {" "}
                      &quot;{testimonial.text}&quot;
                    </p>
                    <footer>
                      <div className="text-[16px] font-semibold text-orange-900">
                        {testimonial.author}
                      </div>
                      <div className="text-[15px] text-orange-600">
                        {testimonial.role}
                      </div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;