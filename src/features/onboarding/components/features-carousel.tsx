'use client';

import { Fuel, Map, Shield, Truck, Wrench } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const features = [
  {
    title: 'Real-time Fleet Tracking',
    description:
      "Our customers report an average of 35% improvement in fleet efficiency using TrackTr's real-time monitoring system",
    icon: Truck,
    image: '/placeholder.svg?height=600&width=800',
    author: 'Michael Chen',
    role: 'Fleet Manager, LogiTech Solutions',
  },
  {
    title: 'Smart Predictive Maintenance',
    description:
      "TrackTr's predictive maintenance has helped reduce our vehicle downtime by 45% in the first quarter",
    icon: Wrench,
    image: '/placeholder.svg?height=600&width=800',
    author: 'Sarah Johnson',
    role: 'Operations Director, FastFreight Inc',
  },
  {
    title: 'Fuel Optimization',
    description:
      "We've seen a 25% reduction in fuel costs since implementing TrackTr's fuel management system",
    icon: Fuel,
    image: '/placeholder.svg?height=600&width=800',
    author: 'David Martinez',
    role: 'CEO, EcoTransport',
  },
  {
    title: 'Enhanced Driver Safety',
    description:
      "TrackTr's safety scoring system has helped us reduce incident rates by 60% year over year",
    icon: Shield,
    image: '/placeholder.svg?height=600&width=800',
    author: 'Emma Wilson',
    role: 'Safety Director, SecureFleet',
  },
  {
    title: 'Intelligent Route Planning',
    description:
      "Our delivery times improved by 30% with TrackTr's AI-powered route optimization",
    icon: Map,
    image: '/placeholder.svg?height=600&width=800',
    author: 'James Thompson',
    role: 'Logistics Manager, SpeedRoute Delivery',
  },
];

const FeaturesCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  return (
    <div className='h-full'>
      <Carousel
        plugins={[plugin.current]}
        className='w-full h-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className='h-full'>
          {features.map((feature, index) => (
            <CarouselItem key={index} className='h-full'>
              <div className='relative h-full overflow-hidden'>
                {/* Background Image with Overlay */}
                <div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{ backgroundImage: `url(${feature.image})` }}
                >
                  <div className='absolute inset-0 bg-black/60' />
                </div>

                {/* Content */}
                <div className='relative h-full flex flex-col justify-end p-8 md:p-12'>
                  <div className='max-w-xl space-y-4'>
                    {/* Icon */}
                    <div className='mb-6'>
                      <feature.icon className='w-12 h-12 text-primary' />
                    </div>

                    {/* Text Content */}
                    <blockquote className='text-2xl md:text-3xl font-medium text-white mb-6'>
                      {feature.description}
                    </blockquote>

                    {/* Author */}
                    <div className='space-y-1'>
                      <div className='text-lg font-semibold text-white'>
                        {feature.author}
                      </div>
                      <div className='text-sm text-gray-300'>
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
        <div className='absolute bottom-8 right-8 flex gap-2'>
          <CarouselPrevious className='h-8 w-8 rounded-full' />
          <CarouselNext className='h-8 w-8 rounded-full' />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturesCarousel;
