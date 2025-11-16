"use client";
import CompanyListSection from "@/components/features/company/CompanyListSection";
import {
  PageLayout,
  Header,
  Banner,
  ContentSection,
} from "@/components/layout";
import { HEADER, BANNER } from "@/constants";
import Text from "@/components/ui/Text";
import { useState } from "react";
import Image from "next/image";

import IndustryForm from "@/components/features/industry/IndustryForm";

export default function Home() {
  const [tab, setTab] = useState<"GENERAL" | "INDUSTRY">("GENERAL");
  return (
    <PageLayout>
      <Header>
        <div className="flex items-center gap-2">
          <Image src="/Logo.svg" alt="Logo" width={42} height={16} priority />
          <Text typography="t7" bold="bold">
            {HEADER.TITLE}
          </Text>
        </div>
        <nav className="flex gap-6">
          <div onClick={() => setTab("GENERAL")} style={{ cursor: "pointer" }}>
            <Text typography="t7" bold={tab === "GENERAL" ? "bold" : "regular"}>
              {HEADER.TASK_TYPES.GENERAL}
            </Text>
          </div>
          <div onClick={() => setTab("INDUSTRY")} style={{ cursor: "pointer" }}>
            <Text
              typography="t7"
              bold={tab === "INDUSTRY" ? "bold" : "regular"}
            >
              {HEADER.TASK_TYPES.INDUSTRY}
            </Text>
          </div>
        </nav>
      </Header>
      <Banner
        title={tab === "GENERAL" ? BANNER.GENERAL.TITLE : BANNER.INDUSTRY.TITLE}
        subtitle={BANNER.SUBTITLE}
      />
      {tab === "GENERAL" ? (
        <ContentSection>
          <CompanyListSection />
        </ContentSection>
      ) : (
        <ContentSection>
          <IndustryForm />
        </ContentSection>
      )}
    </PageLayout>
  );
}
