'use client';

import React, { useEffect, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Feature, features } from '../featuresData';

const FeaturesCarousel: React.FC = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Pause autoplay on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        plugin.current.stop();
      } else {
        plugin.current.reset();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="h-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {features.map((feature: Feature, index: number) => (
            <CarouselItem key={index} className="w-full sm:w-64 md:w-80 h-full">
              <div className="relative h-full overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                  <div className="max-w-xl space-y-4">
                    {/* Icon */}
                    {feature.icon && (
                      <feature.icon className="w-12 h-12 text-primary mb-6" />
                    )}

                    {/* Text Content */}
                    <blockquote className="text-2xl md:text-3xl font-medium text-white mb-6">
                      {feature.description}
                    </blockquote>

                    {/* Author */}
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-white">
                        {feature.author}
                      </div>
                      <div className="text-sm text-gray-300">
                        {feature.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="absolute bottom-0 right-0 flex gap-2">
          <CarouselPrevious
            aria-label="Previous Feature"
            className="h-8 w-8 rounded-full"
          />
          <CarouselNext
            aria-label="Next Feature"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturesCarousel;
