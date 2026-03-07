import { SiteShell } from "@/components/site-shell";

export default function SiteLayout({ children }) {
  return <SiteShell showContentHeader={false}>{children}</SiteShell>;
}
