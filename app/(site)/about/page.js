import { PageContent } from "@/components/page-content";
import { profile } from "@/lib/site-config";

export const metadata = {
  title: "Whoami",
  description: "A short note on how I build and write.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <PageContent showContentHeader={false}>
      <section className="content-section">
        <div className="md-card content-card">
          <h2 className="section-title">{profile.name}</h2>
          <p className="section-copy">{profile.bio}</p>
          <div className="about-grid">
            <div>
              <h3 className="section-subtitle">Focus</h3>
              <p className="section-copy">{profile.focus}</p>
            </div>
            <div>
              <h3 className="section-subtitle">Writing</h3>
              <p className="section-copy">{profile.writingPrinciples}</p>
            </div>
          </div>
        </div>
        <div className="md-card content-card">
          <div className="about-section">
            <h3 className="section-subtitle">Background</h3>
            <ul className="about-list">
              {profile.education.map((entry) => (
                <li key={entry} className="about-list-item">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-section">
            <h3 className="section-subtitle">Hall of Fame</h3>
            <ul className="about-list">
              {profile.hallOfFame.map((entry) => (
                <li key={entry} className="about-list-item">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-section">
            <h3 className="section-subtitle">Awards &amp; Career</h3>
            <div className="about-awards">
              {profile.awards.map((group) => (
                <div key={group.year} className="about-award-group">
                  <p className="about-award-year">{group.year}</p>
                  <ul className="about-list">
                    {group.entries.map((entry) => (
                      <li key={entry} className="about-list-item">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContent>
  );
}
