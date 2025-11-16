import {
  PageLayout,
  Header,
  Banner,
  ContentSection,
} from "@/components/layout";

export default function Home() {
  return (
    <PageLayout>
      <Header>
        <div className="text-lg font-semibold">PWC Samill AC</div>
        <nav className="flex gap-6">
          <button className="text-text-secondary hover:text-text-primary text-sm">
            일반과제
          </button>
          <button className="text-text-secondary hover:text-text-primary text-sm">
            산업 전문성 과제
          </button>
        </nav>
      </Header>
      <Banner
        subtitle="PwC 산업 Acceleration Center"
        title="관심기업 관리 서비스"
      />
      <ContentSection>
        <p className="text-text-muted">
          관심기업으로 등록한 기업들을 관리합니다.
        </p>
      </ContentSection>
    </PageLayout>
  );
}
