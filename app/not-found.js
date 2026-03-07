import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFoundPage() {
  return (
    <SiteShell title="Not Found" description="The page you requested could not be found.">
      <section className="content-section">
        <div className="md-card content-card">
          <h2 className="section-title">Page not found.</h2>
          <p className="section-copy">The path may have changed, or this post has not been created yet.</p>
          <Link href="/" className="md-btn md-btn-tonal inline-button">
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
