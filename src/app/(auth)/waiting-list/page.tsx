import WaitingListPageInner from "@/components/waiting-list/WaitingListPageInner";
import { Suspense } from "react";

export const revalidate = 0;

export default function page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <WaitingListPageInner />
    </Suspense>
  );
}
