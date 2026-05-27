import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/dictionaries";

export default function RootIndex() {
  redirect(`/${DEFAULT_LOCALE}`);
}
