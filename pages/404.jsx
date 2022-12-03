import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Fehler() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });
  return null;
}
