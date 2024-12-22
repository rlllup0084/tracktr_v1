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

const FeaturesCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

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
    <div
      className='h-full w-full relative rounded-2xl'
      style={{
        backgroundImage: `url(${features[0]?.image})`, // Using the first feature's image as the background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-zinc-950/40 rounded-2xl' />

      <Carousel
        plugins={[plugin.current]}
        className='h-full w-full flex flex-col justify-end relative z-10'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        {/* Carousel Content */}
        <CarouselContent className='h-full w-full'>
          {features.map((feature: Feature, index: number) => (
            <CarouselItem
              key={index}
              className='h-full w-full flex items-center justify-center'
            >
              {/* Content */}
              <div className='relative h-full w-full flex flex-col justify-end p-8 md:p-12 text-white'>
                <div className='max-w-xl space-y-4'>
                  {/* Icon */}
                  {feature.icon && (
                    <feature.icon className='w-12 h-12 text-primary mb-6' />
                  )}

                  {/* Text Content */}
                  <blockquote className='text-2xl md:text-3xl font-medium mb-6'>
                    {feature.description}
                  </blockquote>

                  {/* Author */}
                  <div className='space-y-1'>
                    <div className='text-lg font-semibold'>
                      {feature.author}
                    </div>
                    <div className='text-sm text-gray-300'>{feature.role}</div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 mb-2'>
          <CarouselPrevious
            aria-label='Previous Feature'
            className='h-8 w-8 rounded-full bg-zinc-950/50 hover:bg-zinc-800 border-zinc-700 text-white flex items-center justify-center transition duration-200'
          />
          <CarouselNext
            aria-label='Next Feature'
            className='h-8 w-8 rounded-full bg-zinc-950/50 hover:bg-zinc-800 border-zinc-700 text-white flex items-center justify-center transition duration-200'
          />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturesCarousel;
