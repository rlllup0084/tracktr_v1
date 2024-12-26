interface OnboardingLayoutProps {
    children: React.ReactNode;
  }
  
  const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative min-h-screen py-8 md:py-12" style={{
          backgroundImage: `url('/background.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          {children}
        </div>
    );
  };
  
  export default OnboardingLayout;