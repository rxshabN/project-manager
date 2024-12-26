import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getCurrent();
  if (user) {
    redirect("/");
  }
  return (
    <div className="my-[12vh] mx-6">
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
