import { STYLE_PRESETS, CUSTOM_STYLE_ID } from "./templates/styles";
import { type Scene, STORY_PRESETS, CUSTOM_STORY_ID } from "./templates/stories";

export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";
export type CharacterMode = "photo" | "text";
export type PromptLanguage = "en" | "ko" | "both";

export interface GeneratedScenePrompt {
  sceneNumber: number;
  title: string;
  prompt: string;
  promptKo?: string;
  textKo: string;
}

export interface ComicPagePrompt {
  pageNumber: number;
  sceneLabels: string[];
  prompt: string;
  promptKo?: string;
  textKo: string;
}

export interface PromptBuildInput {
  characterMode: CharacterMode;
  photoCount: number;
  characterTexts?: string[];
  styleId: string;
  customStyle?: string;
  storyId: string;
  customScenes?: string;
  aspectRatio?: AspectRatio;
  bookTextMode?: boolean;
  maxScenes?: number;
  comicMode?: boolean;
  comicsPerPage?: number;
  extraContext?: string;
  language?: PromptLanguage;
}

const ASPECT_RATIO_PROMPTS: Record<AspectRatio, string> = {
  "1:1": "square format composition",
  "4:3": "horizontal landscape composition, 4:3 ratio",
  "3:4": "vertical portrait composition, 3:4 ratio",
  "16:9": "wide cinematic composition, 16:9 ratio",
  "9:16": "tall vertical composition, 9:16 ratio",
};

const ASPECT_RATIO_PROMPTS_KO: Record<AspectRatio, string> = {
  "1:1": "정사각형 구도",
  "4:3": "가로 4:3 풍경 구도",
  "3:4": "세로 3:4 인물 구도",
  "16:9": "와이드 16:9 시네마틱 구도",
  "9:16": "세로 9:16 와이드 구도",
};

const COMMON_SUFFIX = "children's book full-page illustration, high quality, detailed, professional illustration";
const COMMON_SUFFIX_KO = "어린이 동화책 전면 일러스트, 고품질, 섬세한 디테일";

// ── mood 단어 사전 (영문 → 한글) ──
const MOOD_DICT: Record<string, string> = {
  wonder: "경이",
  excitement: "설렘",
  surprise: "놀라움",
  delight: "즐거움",
  joy: "기쁨",
  adventure: "모험심",
  awe: "경외",
  warmth: "따스함",
  happiness: "행복",
  warm: "따뜻함",
  promise: "약속",
  contentment: "만족",
  curiosity: "호기심",
  anticipation: "기대감",
  discovery: "발견",
  amazement: "놀라움",
  gratitude: "감사",
  peace: "평온",
  memories: "추억",
  fond: "따뜻한 추억",
  bravery: "용기",
  freedom: "자유",
  playfulness: "즐거운 장난기",
  nostalgia: "그리움",
  dreamlike: "꿈같은",
  determination: "결단",
  pride: "자랑스러움",
  confidence: "자신감",
  hopeful: "희망찬",
  determined: "단단한 의지",
  friendliness: "다정함",
  togetherness: "함께함",
  love: "사랑",
  longing: "그리움",
  hope: "희망",
  magic: "마법 같음",
  romance: "로맨스",
  urgency: "긴박함",
  suspense: "긴장감",
  relief: "안도",
  cheerful: "명랑함",
  innocent: "순수함",
  unease: "불안",
  carefree: "근심 없음",
  contrast: "대비",
  earnest: "진지함",
  playful: "장난스러움",
  satisfaction: "만족",
  preparedness: "준비됨",
  remorse: "후회",
  cold: "차가움",
  kindness: "친절",
  friendship: "우정",
  arrogance: "자만",
  gentleness: "다정함",
  relaxed: "여유",
  overconfident: "자만",
  perseverance: "인내",
  focus: "집중",
  triumph: "승리",
  respect: "존중",
  loneliness: "외로움",
  confusion: "혼란",
  sadness: "슬픔",
  hardship: "고난",
  storybook: "동화 같은",
  atmosphere: "분위기",
  beginning: "새 출발",
  ever: "영원한 행복",
  after: "",
  happily: "",
  self: "자기",
  belonging: "소속감",
  lesson: "깨달음",
  learned: "",
  new: "새",
};

function translateMood(en: string): string {
  // "X and Y" 또는 "X and Y and Z" 분해 후 단어 단위 사전 매핑
  const phrases = en.split(/\s+and\s+/i);
  const translated = phrases.map((phrase) => {
    const words = phrase.toLowerCase().trim().split(/\s+/);
    const koWords = words.map((w) => MOOD_DICT[w] || w).filter(Boolean);
    return koWords.join(" ");
  });
  return translated.filter(Boolean).join(" · ");
}

// 한글 텍스트가 섞여있는지 감지
function containsKorean(s: string): boolean {
  return /[가-힯]/.test(s);
}

interface CharRef {
  en: string;
  ko: string;
}

function buildCharacterReference(input: PromptBuildInput): CharRef {
  if (input.characterMode === "text") {
    const texts = (input.characterTexts || []).map((t) => t.trim()).filter(Boolean);
    if (texts.length === 0) return { en: "the main character", ko: "주인공" };
    if (texts.length === 1) {
      const t = texts[0];
      // 한글이면 영문 프롬프트에서도 인용부호로 감싸 명확히 캐릭터 묘사임을 표시
      const en = containsKorean(t) ? `the main character described as "${t}"` : t;
      return { en, ko: t };
    }
    // 여러 명: 한글 포함이면 "described as" 패턴, 영문이면 그대로
    const enParts = texts.map((t, i) => {
      const role = i === 0 ? "the main character" : `character ${i + 1}`;
      return containsKorean(t) ? `${role} described as "${t}"` : t;
    });
    return { en: enParts.join(", "), ko: texts.join(", ") };
  }
  // 사진 모드
  const count = input.photoCount;
  if (count === 0) return { en: "the main character", ko: "주인공" };
  if (count === 1) return { en: "the child from photo 1", ko: "사진 1의 인물" };
  const en = Array.from({ length: count }, (_, i) => `the child from photo ${i + 1}`).join(" and ");
  const ko = Array.from({ length: count }, (_, i) => `사진 ${i + 1}의 인물`).join(", ");
  return { en, ko };
}

function buildStylePrompt(styleId: string, customStyle?: string): { en: string; ko: string } {
  if (styleId === CUSTOM_STYLE_ID) {
    const v = customStyle?.trim() || "";
    // 커스텀 스타일에 한글 포함 시 영문 프롬프트도 한글 그대로 (인용부호로 묶음)
    const en = containsKorean(v) ? `style described as "${v}"` : v;
    return { en, ko: v };
  }
  const preset = STYLE_PRESETS.find((s) => s.id === styleId);
  return {
    en: preset?.prompt || "",
    ko: preset ? `${preset.nameKo} (${preset.description})` : "",
  };
}

function buildAspectPrompt(ratio?: AspectRatio): { en: string; ko: string } {
  if (!ratio || ratio === "1:1") return { en: "", ko: "" };
  return { en: ASPECT_RATIO_PROMPTS[ratio], ko: ASPECT_RATIO_PROMPTS_KO[ratio] };
}

function buildExtra(extra: string): { en: string; ko: string } {
  if (!extra) return { en: "", ko: "" };
  const trimmed = extra.trim();
  // 영문 프롬프트는 한글이면 인용부호로 명시
  const en = containsKorean(trimmed) ? `setting: "${trimmed}"` : `setting: ${trimmed}`;
  return { en, ko: trimmed };
}

function buildScenePromptEn(
  charRefEn: string,
  scene: Scene,
  styleEn: string,
  aspectEn: string,
  bookTextMode: boolean,
  extraEn: string
): string {
  const overlay = bookTextMode
    ? `with Korean text overlay at the bottom: "${scene.textKo.replace(/\n/g, " ")}" in a decorative children's book Korean handwritten font`
    : "";
  const parts = [
    `${charRefEn}, ${scene.situation}`,
    extraEn,
    `mood: ${scene.mood}`,
    overlay,
    styleEn,
    aspectEn,
    COMMON_SUFFIX,
  ]
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.join(", ").replace(/\s+/g, " ").trim();
}

function buildScenePromptKo(
  charRefKo: string,
  scene: Scene,
  styleKo: string,
  aspectKo: string,
  bookTextMode: boolean,
  extraKo: string
): string {
  const sceneSummary = scene.textKo.split("\n")[0]?.trim() || scene.title;
  const moodKo = translateMood(scene.mood);
  const lines = [
    `주인공: ${charRefKo}`,
    `장면: ${scene.title} - ${sceneSummary}`,
    extraKo ? `배경/장소: ${extraKo}` : "",
    moodKo ? `분위기: ${moodKo}` : "",
    bookTextMode ? `이미지에 한국어 본문 삽입: "${scene.textKo.replace(/\n/g, " ")}"` : "",
    styleKo ? `스타일: ${styleKo}` : "",
    aspectKo ? `구도: ${aspectKo}` : "",
    `품질: ${COMMON_SUFFIX_KO}`,
  ].filter(Boolean);
  return lines.join("\n");
}

function parseCustomScenes(raw: string): Scene[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => ({
      sceneNumber: idx + 1,
      title: `씬 ${idx + 1}`,
      situation: containsKorean(line) ? `scene described as "${line}"` : line,
      mood: "storybook atmosphere",
      textKo: line,
    }));
}

export function buildPrompts(input: PromptBuildInput): GeneratedScenePrompt[] {
  const charRef = buildCharacterReference(input);
  const style = buildStylePrompt(input.styleId, input.customStyle);
  const aspect = buildAspectPrompt(input.aspectRatio);
  const extra = buildExtra((input.extraContext || "").trim());
  const lang: PromptLanguage = input.language ?? "en";

  const allScenes: Scene[] =
    input.storyId === CUSTOM_STORY_ID
      ? parseCustomScenes(input.customScenes || "")
      : STORY_PRESETS.find((s) => s.id === input.storyId)?.scenes || [];

  const scenes = input.maxScenes ? allScenes.slice(0, input.maxScenes) : allScenes;
  const bookTextMode = input.bookTextMode ?? false;

  return scenes.map((scene) => {
    const en = buildScenePromptEn(charRef.en, scene, style.en, aspect.en, bookTextMode, extra.en);
    const ko = buildScenePromptKo(charRef.ko, scene, style.ko, aspect.ko, bookTextMode, extra.ko);
    return {
      sceneNumber: scene.sceneNumber,
      title: scene.title,
      prompt: lang === "ko" ? ko : en,
      promptKo: lang === "en" ? undefined : ko,
      textKo: scene.textKo,
    };
  });
}

function buildComicLayoutDesc(ratio: AspectRatio | undefined, panelCount: number): { en: string; ko: string } {
  const isLandscape = ratio === "16:9" || ratio === "4:3";
  const isPortrait = ratio === "9:16" || ratio === "3:4";

  if (isLandscape) {
    return {
      en: `${panelCount}-panel horizontal comic strip, panels arranged side by side from left to right, each panel equal width`,
      ko: `${panelCount}컷 가로 만화 스트립, 패널이 왼쪽에서 오른쪽으로 나란히, 동일한 너비`,
    };
  }
  if (isPortrait) {
    return {
      en: `${panelCount}-panel vertical comic strip, panels stacked top to bottom, each panel equal height`,
      ko: `${panelCount}컷 세로 만화 스트립, 패널이 위에서 아래로, 동일한 높이`,
    };
  }
  if (panelCount <= 2) {
    return {
      en: `${panelCount}-panel horizontal comic strip, panels side by side, equal width`,
      ko: `${panelCount}컷 가로 만화 스트립, 동일한 너비`,
    };
  }
  const cols = panelCount <= 4 ? 2 : 3;
  return {
    en: `${panelCount}-panel comic grid layout, ${cols} columns, equal-sized panels`,
    ko: `${panelCount}컷 만화 그리드, ${cols}열, 동일 크기`,
  };
}

export function buildComicPrompts(input: PromptBuildInput, perPage: number): ComicPagePrompt[] {
  const scenePrompts = buildPrompts({ ...input, language: "both" });
  const pages: ComicPagePrompt[] = [];
  const lang: PromptLanguage = input.language ?? "en";
  const charRef = buildCharacterReference(input);
  const style = buildStylePrompt(input.styleId, input.customStyle);
  const aspect = buildAspectPrompt(input.aspectRatio);
  const extra = buildExtra((input.extraContext || "").trim());

  for (let i = 0; i < scenePrompts.length; i += perPage) {
    const chunk = scenePrompts.slice(i, i + perPage);
    const pageNumber = Math.floor(i / perPage) + 1;
    const layout = buildComicLayoutDesc(input.aspectRatio, chunk.length);

    const panelDescEn = chunk
      .map((s, idx) => `panel ${idx + 1}: ${s.title}`)
      .join(", ");
    const panelDescKo = chunk
      .map((s, idx) => `${idx + 1}컷: ${s.title} - ${s.textKo.split("\n")[0]?.trim() ?? ""}`)
      .join(" / ");

    const allTextKo = chunk.map((s) => s.textKo.replace(/\n/g, " ")).join(" / ");
    const overlayEn = input.bookTextMode
      ? `with Korean text overlay: "${allTextKo}" in a decorative children's book Korean handwritten font`
      : "";
    const overlayKo = input.bookTextMode
      ? `이미지에 한국어 본문 삽입: "${allTextKo}"`
      : "";

    const promptEn = [
      `${charRef.en} appearing across all panels`,
      layout.en,
      panelDescEn,
      extra.en,
      overlayEn,
      style.en,
      aspect.en,
      "children's book comic page, each panel clearly separated, high quality illustration",
    ]
      .map((p) => p.trim())
      .filter(Boolean)
      .join(", ")
      .replace(/\s+/g, " ")
      .trim();

    const promptKo = [
      `주인공: ${charRef.ko} (모든 컷에 동일 인물)`,
      `레이아웃: ${layout.ko}`,
      `각 컷: ${panelDescKo}`,
      extra.ko ? `배경/장소: ${extra.ko}` : "",
      overlayKo,
      style.ko ? `스타일: ${style.ko}` : "",
      aspect.ko ? `구도: ${aspect.ko}` : "",
      "품질: 어린이 동화책 만화 페이지, 각 패널 또렷이 구분, 고품질 일러스트",
    ]
      .filter(Boolean)
      .join("\n");

    pages.push({
      pageNumber,
      sceneLabels: chunk.map((s) => `씬 ${s.sceneNumber}: ${s.title}`),
      prompt: lang === "ko" ? promptKo : promptEn,
      promptKo: lang === "en" ? undefined : promptKo,
      textKo: chunk.map((s) => s.textKo).join("\n\n"),
    });
  }

  return pages;
}
