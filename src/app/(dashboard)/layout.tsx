interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
