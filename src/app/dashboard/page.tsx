"use client";

import { Suspense } from "react";
import DashBoard from "@/components/DashBoard";

export default function DashBoardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashBoard />
    </Suspense>
  );
}
