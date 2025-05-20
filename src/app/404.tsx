import { Suspense } from "react";
import NotFoundClient from "./NotFoundClient";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Ачааллаж байна...</div>}>
      <NotFoundClient />
    </Suspense>
  );
}
