import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * The logged-in student's first name for the website header, or "" when no
 * student is logged in. Read again on every page change so logging in or out
 * shows straight away.
 */
export default function useStudentName() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      if (!localStorage.getItem("studentToken")) return setName("");
      const info = JSON.parse(localStorage.getItem("studentInfo") || "{}");
      setName(String(info?.name || "").trim().split(/\s+/)[0] || "My Account");
    } catch {
      setName("");
    }
  }, [router.asPath]);

  return name;
}
