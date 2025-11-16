import CompanyListSection from "@/components/features/company/CompanyListSection";
import {
  PageLayout,
  Header,
  Banner,
  ContentSection,
} from "@/components/layout";
import { HEADER, BANNER } from "@/constants";

export default function Home() {
  return (
    <PageLayout>
      <Header>
        <div className="text-lg font-semibold">{HEADER.TITLE}</div>
        <nav className="flex gap-6">
          <button className="text-text-secondary hover:text-text-primary text-sm">
            {HEADER.TASK_TYPES.GENERAL}
          </button>
          <button className="text-text-secondary hover:text-text-primary text-sm">
            {HEADER.TASK_TYPES.INDUSTRY}
          </button>
        </nav>
      </Header>
      <Banner subtitle={BANNER.SUBTITLE} title={BANNER.TITLE} />
      <ContentSection>
        <CompanyListSection />
      </ContentSection>
    </PageLayout>
  );
}
