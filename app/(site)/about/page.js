import { PageContent } from "@/components/page-content";
import { profile } from "@/lib/site-config";

export const metadata = {
  title: "Whoami",
  description: "보안 연구와 기록 방식에 대한 소개.",
  alternates: {
    canonical: "/about"
  }
};

function DisclosureGroup({ title, items }) {
  return (
    <div className="about-award-group">
      <p className="about-award-item">{title}</p>
      <ul className="about-list">
        {items.map((item) => (
          <li key={item} className="about-list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageContent showContentHeader={false}>
      <section className="content-section">
        <div className="md-card content-card">
          <h2 className="section-title">Baek Bu Seung (백부승)</h2>
          <p className="section-copy">{profile.bio}</p>
          <div className="about-grid">
            <div>
              <h3 className="section-subtitle"># Interested in...</h3>
              <p className="section-copy">{profile.focus}</p>
            </div>
            <div>
              <h3 className="section-subtitle"># Writing principles</h3>
              <p className="section-copy">{profile.writingPrinciples}</p>
            </div>
          </div>
        </div>
        <div className="md-card content-card">
          <div className="about-section">
            <h3 className="section-subtitle"># 이력</h3>
            <ul className="about-list">
              {profile.education.map((entry) => (
                <li key={entry} className="about-list-item">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-section">
            <h3 className="section-subtitle"># 명예의 전당</h3>
            <ul className="about-list">
              {profile.hallOfFame.map((entry) => (
                <li key={entry} className="about-list-item">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-section">
            <h3 className="section-subtitle"># CVE / KVE</h3>
            <div className="about-grid">
              <DisclosureGroup title="NAVER" items={profile.disclosures.naver} />
              <DisclosureGroup title="ETC" items={profile.disclosures.etc} />
              <DisclosureGroup title="KAKAO" items={profile.disclosures.kakao} />
              <DisclosureGroup title="KISA" items={profile.disclosures.kisa} />
            </div>
          </div>
          <div className="about-section">
            <h3 className="section-subtitle"># 수상 및 활동</h3>
            <div className="about-awards">
              {profile.awards.map((group) => (
                <div key={group.year} className="about-award-group">
                  <p className="about-award-year">{group.year}년</p>
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
