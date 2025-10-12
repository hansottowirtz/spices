import { ExportLabelButton } from "@/components/export-label-button";
import { LabelRendererOnPage } from "@/components/label-renderer-on-page";
import { LabelStyleConfigurator } from "@/components/label-style-configurator";
import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { appLangDisplayNames } from "@/lib/app-lang-display-names";
import { appLanguage, spices } from "@/lib/spices";
import { notFound } from "next/navigation";
import { AddToCollectionButton } from "@/components/add-to-collection-button";

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

  const labelFooter = (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex flex-row gap-2">
      <ExportLabelButton spice={spice} />
      <AddToCollectionButton spice={spice} />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-2 max-w-[1500px] mx-auto">
      <div className="md:flex-1 sticky top-[10px] w-screen z-10 md:p-2 lg:p-8 flex flex-col gap-4">
        <div className="pointer-events-none">
          <LabelRendererOnPage spice={spice} />
        </div>
        <div className="px-2 hidden md:block">{labelFooter}</div>
      </div>
      <div className="flex-1 p-2 lg:p-8">
        <div className="block md:hidden mb-6">{labelFooter}</div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {title}
        </h1>
        <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 my-4">
          Basic information
        </h2>
        <div className="my-4">
          Spice id:{" "}
          <code className="p-1 bg-gray-100 dark:bg-gray-800 font-mono rounded-sm">
            {spice.id}
          </code>
        </div>
        <div className="my-4">
          <div>Name in other languages:</div>
          <Table className="max-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spice.names.map((name) => (
                <TableRow key={name.lang}>
                  <TableCell>{appLangDisplayNames.of(name.lang)}</TableCell>
                  <TableCell>{name.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {spice.etymologicalOrigin && (
          <div>
            <div>
              Etymological origin:{" "}
              {appLangDisplayNames.of(spice.etymologicalOrigin)}
            </div>
          </div>
        )}
        {spice.cuisines && (
          <div>
            <div>Cuisines</div>
            <ul className="list-disc pl-4">
              {spice.cuisines?.map((cuisine) => (
                <li key={cuisine}>{cuisine}</li>
              ))}
            </ul>
          </div>
        )}
        <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 my-4">
          Style editor
        </h2>
        <div className="my-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-md max-w-[400px]">
            <LabelStyleConfigurator spice={spice} />
          </div>
        </div>
      </div>
    </div>
  );
}
