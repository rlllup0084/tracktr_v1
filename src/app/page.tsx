import { Button } from '@/components/ui/button';
import { getCurrent } from '@/features/auth/queries';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const user = await getCurrent();

  if (user) {
    redirect(user.emailVerification ? '/tracking' : '/verify-email');
  }

  return (
    <div
      className='flex flex-col min-h-screen bg-zinc-950'
      style={{
        backgroundImage: `url('/background.svg')`,
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
            <div className='flex flex-col items-center space-y-6'>
              <Button
                asChild
                className={cn(
                  'h-12 px-6 py-3',
                  'inline-block text-md bg-orange-600 hover:bg-orange-700 border border-orange-600 text-white font-semibold rounded-md transition duration-200'
                )}
              >
                <Link href='/register'>Start a Free Trial</Link>
              </Button>

              {/* Slick Separator */}
              <div className='flex items-center justify-center space-x-4 text-zinc-400 text-sm md:text-base'>
                <span className='h-px w-16 bg-zinc-700'></span>
                <span>if you already have an account</span>
                <span className='h-px w-16 bg-zinc-700'></span>
              </div>

              <Button
                asChild
                className={cn(
                  'h-12 px-6 py-3',
                  'text-md bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-md transition duration-200'
                )}
                variant='outline'
                effect='expandIcon'
                icon={ArrowRightIcon}
                iconPlacement='right'
              >
                <Link href='/login'>Log in</Link>
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
                    className='text-sm text-zinc-400 hover:text-orange-600 transition-colors duration-200'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-sm text-zinc-400 hover:text-orange-600 transition-colors duration-200'
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
};

export default Home;
