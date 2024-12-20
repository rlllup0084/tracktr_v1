import { Fuel, Map, Shield, Truck, Wrench, LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  author: string;
  role: string;
}

export const features: Feature[] = [
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
