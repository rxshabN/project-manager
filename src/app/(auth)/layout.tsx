"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-black min-h-screen">
      <div className="mx-auto max-w-(--breakpoint-2xl)">
        <div className="flex flex-col items-center justify-center max-h-screen">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
