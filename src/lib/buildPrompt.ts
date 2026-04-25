export interface PromptInput {
  prefix?: string;
  purpose: string;
  audience: string;
  texts: string[];
  style: string;
  aspect: string;
  customAspect?: string;
  negatives: string[];
  search?: {
    enabled: boolean;
    query: string;
    fields: string;
  };
}

export const NEGATIVE_EXAMPLES = [
  "영어 문구",
  "실존 인물",
  "브랜드 로고",
  "유명 캐릭터 모방",
  "워터마크",
  "글자가 흐릿하거나 작게 표시",
  "과도한 광택·미래감",
  "AI 생성 느낌",
  "지나친 채도",
];

const ASPECT_LABEL: Record<string, string> = {
  auto: "",
  square: "정사각형 1:1 비율.",
  portrait: "세로 3:4 비율.",
  story: "스토리 9:16 비율.",
  landscape: "가로 4:3 비율.",
  wide: "와이드스크린 16:9 비율.",
};

function endWithPeriod(s: string): string {
  const t = s.trim();
  if (!t) return t;
  if (/[.!?。…]$/.test(t)) return t;
  return `${t}.`;
}

export function buildPrompt(input: PromptInput): string {
  const blocks: string[] = [];

  if (input.search?.enabled && input.search.query.trim()) {
    const fields = input.search.fields.trim();
    blocks.push(
      `먼저 온라인에서 "${input.search.query.trim()}"를 찾아${fields ? ` ${fields}` : ""} 조사해 주세요. 그 결과를 아래 이미지에 정확히 반영해 주세요.`
    );
  }

  const prefix = input.prefix?.trim() ?? "";
  const purpose = input.purpose.trim();
  if (prefix && purpose) {
    blocks.push(endWithPeriod(`${prefix} (${purpose.replace(/^예:\s*/, "")})`));
  } else if (prefix) {
    blocks.push(endWithPeriod(prefix));
  } else if (purpose) {
    blocks.push(endWithPeriod(purpose));
  }

  if (input.audience.trim()) {
    blocks.push(`주로 ${input.audience.trim()}이(가) 보는 자료입니다.`);
  }

  const validTexts = input.texts.filter((t) => t.trim().length > 0);
  if (validTexts.length > 0) {
    const quoted = validTexts.map((t) => `"${t.trim()}"`).join("\n");
    blocks.push(`다음 글자를 정확히, 또렷하게 넣어주세요:\n${quoted}`);
  }

  if (input.style.trim()) {
    blocks.push(`전체 분위기와 스타일은 다음과 같이 해주세요: ${endWithPeriod(input.style)}`);
  }

  if (input.aspect === "custom" && input.customAspect?.trim()) {
    blocks.push(`${input.customAspect.trim()} 비율.`);
  } else if (input.aspect && input.aspect !== "auto") {
    const label = ASPECT_LABEL[input.aspect];
    if (label) blocks.push(label);
  }

  const validNegatives = input.negatives.map((n) => n.trim()).filter((n) => n.length > 0);
  if (validNegatives.length > 0) {
    blocks.push(`원하지 않는 것: ${validNegatives.join(", ")}.`);
  }

  return blocks.join("\n\n");
}

export const ASPECT_OPTIONS = [
  { id: "auto", label: "자동", ratio: "" },
  { id: "square", label: "정사각형", ratio: "1:1" },
  { id: "portrait", label: "세로", ratio: "3:4" },
  { id: "story", label: "스토리", ratio: "9:16" },
  { id: "landscape", label: "가로", ratio: "4:3" },
  { id: "wide", label: "와이드스크린", ratio: "16:9" },
  { id: "custom", label: "직접 입력", ratio: "" },
];
