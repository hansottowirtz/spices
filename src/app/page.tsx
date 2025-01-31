import { spices } from "@/lib/spices";
import { LabelsView } from "./LabelsView";

export default function Home() {
  return (
    <div>
      <LabelsView spices={spices} />
    </div>
  );
}
