import CompanyListSection from "@/components/features/company/CompanyListSection";
import {
  PageLayout,
  Header,
  Banner,
  ContentSection,
} from "@/components/layout";
import { HEADER, BANNER } from "@/constants";
import Text from "@/components/ui/Text";

export default function Home() {
  return (
    <PageLayout>
      <Header>
        <div className="text-lg font-semibold">{HEADER.TITLE}</div>
        <nav className="flex gap-6">
          <Text typography="t7" bold="regular">
            {HEADER.TASK_TYPES.GENERAL}
          </Text>
          <Text typography="t7" bold="regular">
            {HEADER.TASK_TYPES.INDUSTRY}
          </Text>
        </nav>
      </Header>
      <Banner subtitle={BANNER.SUBTITLE} title={BANNER.TITLE} />
      <ContentSection>
        <CompanyListSection />
      </ContentSection>
    </PageLayout>
  );
}
