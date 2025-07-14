// src/app/SignUp/page.tsx (or whatever path you're using)

import SignupLayout from "./SignupLayout";
import SignupForm from "./SignupForm";

const AdminSignupPage = () => {
  return (
    <SignupLayout>
      <SignupForm />
    </SignupLayout>
  );
};

export default AdminSignupPage;
