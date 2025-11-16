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
          <div className="flex h-80 w-full items-center justify-center border border-dashed border-gray-300">
            <Text typography="t3" className="text-gray-400">
              산업 전문성 과제 페이지는 현재 준비 중입니다.
            </Text>
          </div>
        </ContentSection>
      )}
    </PageLayout>
  );
}
