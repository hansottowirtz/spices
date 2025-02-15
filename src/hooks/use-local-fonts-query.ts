import { useQuery } from "@tanstack/react-query";

export function useLocalFontsQuery({ enabled }: { enabled: boolean }) {
  const browserSupport =
    typeof window !== "undefined" && "queryLocalFonts" in window;

  const hasPermissionQuery = useQuery({
    queryKey: ["hasLocalFontsPermission"],
    queryFn: async () => {
      const result = await navigator.permissions.query({
        name: ("local-fonts" as PermissionName)
      });
      return result.state === "granted";
    },
    enabled: browserSupport,
  });

  const runQuery = browserSupport && (hasPermissionQuery.data || enabled);

  const query = useQuery({
    queryKey: ["localFonts"],
    queryFn: async () => {
      const result = await window.queryLocalFonts();
      console.log(result)
      return result;
    },
    enabled: runQuery,
  });

  return {
    query,
    browserSupport,
    hasPermissionQuery,
    isPermissionRejected: hasPermissionQuery.error?.name.includes("SecurityError"),
  };
}

export type FontData = {
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
  /** `blob()` returns a Blob containing valid and complete SFNT-wrapped font data. */
  blob(): Promise<Blob>;
}
declare global {
  function queryLocalFonts(options?: {
    postscriptNames?: string[];
  }): Promise<FontData[]>;
}
