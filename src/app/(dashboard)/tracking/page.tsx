import { getAccount } from "@/features/account/queries";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const TrackingPage = async () => {
  const user = await getCurrent();
  const account = await getAccount();
  if (!user) {
    redirect("/login");
  } else if (!user.emailVerification) {
    redirect("/verify-email");
  } else if (!account) {
    redirect("/account");
  }
  return (
    <div>
      <h1>Tracking</h1>
      <p>Welcome to the tracking page</p>
    </div>
  );
};

export default TrackingPage;
