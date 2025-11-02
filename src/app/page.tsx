import { redirect } from "next/navigation";

const RootPage: React.FC = () => {
  redirect("/home");
};

export default RootPage;

