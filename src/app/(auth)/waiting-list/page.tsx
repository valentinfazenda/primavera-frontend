import WaitingListPageInner from "@/components/waiting-list/WaitingListPageInner";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <WaitingListPageInner />
    </Suspense>
  );
}
