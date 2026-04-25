export interface Sample {
  src: string;
  category: string;
  alt?: string;
}

export const SAMPLES: Sample[] = [
  // 유튜브 썸네일
  { src: "/samples/thumbnail-01.png", category: "thumbnail" },

  // 책 표지
  { src: "/samples/book-cover-01.png", category: "book-cover" },
  { src: "/samples/book-cover-02.png", category: "book-cover" },

  // 카드뉴스
  { src: "/samples/card-news-01.png", category: "card-news" },
  { src: "/samples/card-news-02.png", category: "card-news" },
  { src: "/samples/card-news-03.png", category: "card-news" },
  { src: "/samples/card-news-04.png", category: "card-news" },

  // 포스터
  { src: "/samples/poster-01.png", category: "poster" },
  { src: "/samples/poster-02.png", category: "poster" },
  { src: "/samples/poster-03.png", category: "poster" },
  { src: "/samples/poster-04.png", category: "poster" },
  { src: "/samples/poster-05.png", category: "poster" },
  { src: "/samples/poster-06.png", category: "poster" },

  // 인포그래픽
  { src: "/samples/infographic-01.png", category: "infographic" },
  { src: "/samples/infographic-02.png", category: "infographic" },
  { src: "/samples/infographic-03.png", category: "infographic" },
  { src: "/samples/infographic-04.png", category: "infographic" },
  { src: "/samples/infographic-05.png", category: "infographic" },
  { src: "/samples/infographic-06.png", category: "infographic" },
  { src: "/samples/infographic-07.png", category: "infographic" },
  { src: "/samples/infographic-08.png", category: "infographic" },
  { src: "/samples/infographic-09.png", category: "infographic" },
  { src: "/samples/infographic-10.png", category: "infographic" },
  { src: "/samples/infographic-11.png", category: "infographic" },

  // 목업
  { src: "/samples/mockup-01.png", category: "mockup" },
  { src: "/samples/mockup-02.png", category: "mockup" },
  { src: "/samples/mockup-03.png", category: "mockup" },

  // 동화책 (별도 도구로 빠짐, 갤러리에는 표시)
  { src: "/samples/storybook-01.png", category: "storybook" },
  { src: "/samples/storybook-02.png", category: "storybook" },
  { src: "/samples/storybook-03.png", category: "storybook" },
  { src: "/samples/storybook-04.png", category: "storybook" },
  { src: "/samples/storybook-05.png", category: "storybook" },
  { src: "/samples/storybook-06.png", category: "storybook" },

  // 웹툰 (갤러리 전용)
  { src: "/samples/webtoon-01.png", category: "webtoon" },
  { src: "/samples/webtoon-02.png", category: "webtoon" },
  { src: "/samples/webtoon-03.png", category: "webtoon" },

  // 기타
  { src: "/samples/other-01.png", category: "other" },
];

export interface GallerySection {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  link?: string;
}

export const GALLERY_SECTIONS: GallerySection[] = [
  { id: "thumbnail", label: "유튜브 썸네일", emoji: "🎬", link: "/category/thumbnail" },
  { id: "book-cover", label: "책 표지", emoji: "📕", link: "/category/book-cover" },
  { id: "card-news", label: "카드뉴스", emoji: "🗂️", link: "/category/card-news" },
  { id: "poster", label: "포스터", emoji: "📰", link: "/category/poster" },
  { id: "infographic", label: "인포그래픽", emoji: "📊", link: "/category/infographic" },
  { id: "mockup", label: "목업", emoji: "🖼️", link: "/category/mockup" },
  { id: "storybook", label: "동화책", emoji: "📖", description: "동화책 프롬프트 생성기 도구로 만든 결과", link: "/storybook" },
  { id: "webtoon", label: "웹툰", emoji: "💬" },
  { id: "other", label: "기타", emoji: "✨" },
];

export function getSamplesByCategory(categoryId: string): Sample[] {
  return SAMPLES.filter((s) => s.category === categoryId);
}
