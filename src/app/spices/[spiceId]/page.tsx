import { ExportLabelButton } from "@/components/export-label-button";
import { LabelRendererOnPage } from "@/components/label-renderer-on-page";
import { LabelStyleConfigurator } from "@/components/label-style-configurator";
import { appLangDisplayNames } from "@/lib/app-lang-display-names";
import { appLanguage, spices } from "@/lib/spices";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spiceId: string }>;
}) {
  const spiceId = decodeURIComponent((await params).spiceId);
  const spice = spices.find((spice) => spice.id === spiceId);
  if (!spice) {
    notFound();
  }
  const title =
    spice.names.find((name) => name.lang === appLanguage)?.value ?? spice.id;
  return {
    title: `${title} - Spices`,
  };
}

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
  const title =
    spice.names.find((name) => name.lang === appLanguage)?.value ?? spice.id;

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-2">
      <div className="md:flex-1 sticky top-0 w-screen z-10 pointer-events-none md:p-2 lg:p-8">
        <LabelRendererOnPage spice={spice} />
      </div>
      <div className="flex-1 p-2 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {title}
        </h1>
        <div className="my-4">
          Spice id:{" "}
          <code className="p-1 bg-gray-100 dark:bg-gray-800 font-mono rounded-sm">
            {spice.id}
          </code>
        </div>
        <div className="my-4">
          <div>Name in other languages:</div>
          <ul className="list-disc pl-4">
            {spice.names.map((name) => (
              <li key={name.lang}>
                {appLangDisplayNames.of(name.lang)}: {name.value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>Etymological origin: {spice.etymologicalOrigin || "not relevant"}</div>
        </div>
        <div>
          <div>Cuisines</div>
          <ul className="list-disc pl-4">
            {spice.cuisines?.map((cuisine) => (
              <li key={cuisine}>{cuisine}</li>
            ))}
          </ul>
        </div>
        <div className="my-4">
          <ExportLabelButton spice={spice} />
        </div>
        <div className="my-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-md max-w-[400px]">
            <LabelStyleConfigurator spice={spice} />
          </div>
        </div>
      </div>
    </div>
  );
}
