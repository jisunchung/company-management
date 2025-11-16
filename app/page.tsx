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
        <p className="text-text-muted">
          관심기업으로 등록한 기업들을 관리합니다.
        </p>
      </ContentSection>
    </PageLayout>
  );
}
