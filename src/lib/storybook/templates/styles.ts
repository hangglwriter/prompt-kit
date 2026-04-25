export interface StyleTemplate {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  prompt: string;
  emoji: string;
}

export const STYLE_PRESETS: StyleTemplate[] = [
  {
    id: "pixar",
    name: "Pixar / Disney 3D",
    nameKo: "픽사 / 디즈니 3D",
    description: "밝고 생동감 넘치는 3D 애니메이션 스타일",
    emoji: "🎬",
    prompt:
      "Pixar and Disney 3D animation style, vibrant colors, expressive characters, cinematic lighting, highly detailed 3D render, children's animated movie aesthetic, warm and inviting atmosphere",
  },
  {
    id: "ghibli",
    name: "Studio Ghibli",
    nameKo: "지브리 스타일",
    description: "몽환적이고 따뜻한 일본 애니메이션 수채화 스타일",
    emoji: "🌿",
    prompt:
      "Studio Ghibli inspired illustration style, soft watercolor textures, painterly brushstrokes, warm natural lighting, dreamy and whimsical atmosphere, hand-drawn aesthetic, lush detailed backgrounds",
  },
  {
    id: "watercolor",
    name: "Storybook Watercolor",
    nameKo: "동화책 수채화",
    description: "클래식 동화책의 부드러운 수채화 일러스트 스타일",
    emoji: "🎨",
    prompt:
      "Classic children's storybook watercolor illustration, soft and gentle color palette, delicate brushwork, whimsical and magical atmosphere, traditional illustration style, warm pastel tones",
  },
  {
    id: "classic",
    name: "Classic Pen & Watercolor",
    nameKo: "클래식 펜+수채화",
    description: "세밀한 펜 선과 수채화의 조합, 고전 동화책 느낌",
    emoji: "✒️",
    prompt:
      "Classic fairytale illustration with detailed pen and ink linework combined with watercolor washes, vintage storybook style, intricate details, warm earthy tones, timeless children's book aesthetic",
  },
  {
    id: "flat",
    name: "Modern Flat Design",
    nameKo: "모던 플랫 디자인",
    description: "현대적이고 깔끔한 플랫 일러스트 스타일",
    emoji: "🟦",
    prompt:
      "Modern flat design illustration style, bold geometric shapes, clean lines, vibrant solid colors, minimalist children's book aesthetic, contemporary graphic art style, playful and cheerful",
  },
  {
    id: "crayon",
    name: "Crayon Illustration",
    nameKo: "크레용 일러스트",
    description: "아이들이 그린 듯한 따뜻하고 귀여운 크레용 스타일",
    emoji: "🖍️",
    prompt:
      "Crayon and colored pencil illustration style, childlike textures, rough and charming strokes, bright primary colors, naive art aesthetic, warm and playful children's book illustration",
  },
];

export const CUSTOM_STYLE_ID = "custom";
