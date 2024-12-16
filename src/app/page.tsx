import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className='relative w-full min-h-screen flex flex-col justify-between overflow-hidden'
      style={{
        background: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#000000' width='1600' height='800'/><g fill-opacity='0.07'><polygon  fill='#220000' points='1600 160 0 460 0 350 1600 50'/><polygon  fill='#440000' points='1600 260 0 560 0 450 1600 150'/><polygon  fill='#660000' points='1600 360 0 660 0 550 1600 250'/><polygon  fill='#880000' points='1600 460 0 760 0 650 1600 350'/><polygon  fill='#A00' points='1600 800 0 800 0 750 1600 450'/></g></svg>`
        )}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Main Content */}
      <main className='relative container mx-auto px-4 py-8 text-center space-y-6'>
        <div className='space-y-4'>
          {/* Logo */}
          <div className='flex justify-center mt-5 mb-7'>
            <Image
              src='logo.svg' // Replace with the actual path to your logo
              alt='TrackTr Logo'
              width={170}
              height={50}
              priority
            />
          </div>

          {/* Heading */}
          <h1 className='text-4xl font-bold max-w-[500px] mx-auto'>
            Simplified fleet management, amplified performance
          </h1>

          {/* Description */}
          <p className='text-sm md:text-base font-light max-w-[400px] sm:max-w-[500px] mx-auto'>
            Streamline your fleet operations with smarter tools and actionable
            insights. From real-time tracking to predictive maintenance, our
            platform is designed to save time, reduce costs, and boost your
            fleet’s efficiency.
          </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-row justify-center items-center space-x-2'>
          <Button>Start a Free Trial</Button>
          <Button>Login</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className='relative text-white py-4'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm'>
          <p>&copy; {new Date().getFullYear()} TrackTr. All rights reserved.</p>
          <Button variant={'link'}>
            <Link href={'#'}>Privacy Policy</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
