import { SVGIcon } from "@/components/SVGIcon";
import { Welcome } from "@/components/Welcome";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Welcome />
        <button type="button" onClick={() => signOut("github")}>
          <SVGIcon variant="logout" width="40px" />
        </button>
      </>
    );
  } else {
    return (
      <>
        <Welcome />
        <button type="button" onClick={() => signIn("github")}>
          <SVGIcon variant="login" width="40px" />
        </button>
        <p>login</p>
      </>
    );
  }
}
