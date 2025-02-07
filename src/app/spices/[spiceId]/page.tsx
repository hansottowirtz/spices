import { LabelRenderer } from "@/app/LabelRenderer";
import { ExportLabelButton } from "@/components/export-label-button";
import { Button } from "@/components/ui/button";
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
  const title = spice.names.find((name) => name.lang === "English")?.value ?? spice.id;
  return (
    <div className="p-4 flex flex-row flex-wrap gap-2">
      <div className="p-4 min-w-[600px]">
        <LabelRenderer spice={spice} outline />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {title}
        </h1>
        <div className="my-4">
          Spice id: <code className="p-1 bg-gray-100 dark:bg-gray-800 font-mono rounded-sm">{spice.id}</code>
        </div>
        <div className="my-4">
          <div>
            Name in other languages:
          </div>
          <ul className="list-disc pl-4">
            {spice.names.map((name) => (
              <li key={name.lang}>
                {name.lang}: {name.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-4">
          <ExportLabelButton spice={spice} />
        </div>
      </div>
    </div>
  );
}
