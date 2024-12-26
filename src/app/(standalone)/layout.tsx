import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/features/auth/components/user-button";

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="bg-neutral-300 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image src="/icon.svg" alt="image of logo" height={85} width={85} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
