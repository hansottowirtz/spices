import { LabelRenderer } from "@/app/LabelRenderer";
import { spices } from "@/lib/spices";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ spiceId: string }>;
}) {
  const { spiceId: origSpiceId } = await params;
  const spiceId = decodeURIComponent(origSpiceId);
  const spice = spices.find((spice) => spice.id === spiceId);
  if (!spice) {
    notFound();
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {spice.id}
      </h1>
      <div>
        <LabelRenderer spice={spice} />
      </div>
    </div>
  );
}
