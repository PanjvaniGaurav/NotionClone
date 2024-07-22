"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName} {`'s Space`}
        </h1>
      )}
      <Breadcrumbs />
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
