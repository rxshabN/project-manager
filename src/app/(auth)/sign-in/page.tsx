import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrent();
  if (user) {
    redirect("/");
  }
  return (
    <div className="my-[12vh] mx-6">
      <SignInCard />
    </div>
  );
};

export default SignInPage;
