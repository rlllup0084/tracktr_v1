import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-zinc-950 text-zinc-200"
      style={{
        backgroundImage: `url('/background.svg')`, // Use the uploaded SVG
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <main className='flex-grow'>
        <section className='py-20 md:py-32'>
          <div className='container mx-auto px-4 text-center'>
            <Image
              src='/logo.svg'
              alt='TrackTr Logo'
              width={250}
              height={40}
              className='mx-auto mb-10'
            />
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white'>
              Simplified fleet management, amplified performance
            </h1>
            <p className='text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-10'>
              Streamline your fleet operations with smarter tools and actionable
              insights. From real-time to predictive maintenance, our platform
              is designed to save time, reduce costs, and boost your
              fleet&apos;s efficiency.
            </p>
            <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <Button
                className={cn(
                  'h-12 px-6 py-3',
                  'inline-block bg-transparent hover:bg-orange-700 border border-orange-600 text-white'
                )}
              >
                Start a Free Trial
              </Button>
              <Button
                className={cn(
                  'h-12 px-6 py-3',
                  'inline-block bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white'
                )}
                variant='outline'
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className='py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center text-center'>
            <p className='text-sm text-zinc-400'>
              © {new Date().getFullYear()} TrackTr. All rights reserved.
            </p>
            <nav className='mt-4 md:mt-0'>
              <ul className='flex space-x-4'>
                <li>
                  <Link
                    href='/privacy'
                    className='text-sm text-zinc-400 hover:text-primary'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-sm text-zinc-400 hover:text-primary'
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
