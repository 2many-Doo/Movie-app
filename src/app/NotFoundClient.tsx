"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref"); // http://site.mn/404?ref=google гэх мэт

  return (
    <div>
      <h1>404 - Хуудас олдсонгүй</h1>
      {ref && <p>Холбоос: {ref}</p>}
    </div>
  );
}
