"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useCheckRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      try {
        // 1️⃣ Check HttpOnly cookie via API
     const cookieRes = await fetch("/api/check-cookie", {
  method: "GET",
  credentials: "include", 
  cache: "no-store", 
});
        const { valid } = await cookieRes.json();
     

        if (!valid) {
          alert("401 Unauthorized");
          router.replace("/auth/login");
          return;
        }

      } catch (err) {
        console.error("Error checking role:", err);
        router.replace("/auth/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [router, BASEURL]);

  return loading;
}
