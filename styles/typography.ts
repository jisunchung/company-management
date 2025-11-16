export const typographyMap = {
  t1: "text-[32px]",
  t2: "text-[28px]",
  t3: "text-[26px]",
  t4: "text-[24px]",
  t5: "text-[18px]",
  t6: "text-[16px]",
  t7: "text-[14px]",
} as const;

export type Typography = keyof typeof typographyMap;
