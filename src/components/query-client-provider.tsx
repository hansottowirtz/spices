"use client";

import {
  QueryClient,
  QueryClientProvider as RQClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());

  return <RQClientProvider client={client}>{children}</RQClientProvider>;
}
