export interface CategoryExamples {
  purpose: string;
  audience: string;
  texts: string;
  style: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  description: string;
  searchRecommended?: boolean;
  subTabs?: { id: string; label: string }[];
  examples: CategoryExamples;
  promptPrefix?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "thumbnail",
    label: "유튜브 썸네일",
    emoji: "🎬",
    description: "한글 텍스트 또렷한 16:9 썸네일",
    promptPrefix: "유튜브 썸네일을 만들어 주세요",
    examples: {
      purpose: "예: ChatGPT 이미지 2.0 활용법 영상용. 신규 시청자 클릭 유도용이에요.",
      audience: "예: AI 도구를 막 시작한 1인 크리에이터와 강사",
      texts: "예: 이거 모르면 손해 / AI 활용법 BEST 5",
      style: "예: 3D 디즈니풍 인물이 중앙에서 놀란 표정을 짓고, 좌우는 Before/After 비교 화면으로 분할되어 있어요. 흰 배경에 노랑·청록 포인트색이 강하게 들어가고, 한글 타이틀이 큼지막하게 박혀 멀리서도 잘 보이는 톤이면 좋겠어요.",
    },
  },
  {
    id: "book-cover",
    label: "책 표지",
    emoji: "📕",
    description: "전자책·종이책 표지, 책 제목·저자명 정확히",
    promptPrefix: "책 표지를 만들어 주세요",
    examples: {
      purpose: "예: 글쓰기 입문 전자책. 교보문고·예스24 업로드용이에요.",
      audience: "예: 글쓰기를 시작하려는 30~40대 직장인",
      texts: "예: 글 못 쓰는 사람은 없다 / 민티 지음",
      style: "예: 베스트셀러 자기계발서 톤으로, 흰 배경에 굵은 한글 타이틀이 시선을 잡고 중앙에는 미니멀한 일러스트가 자리잡아요. 색감은 절제된 한두 가지로 정돈된 느낌이면 좋겠어요.",
    },
  },
  {
    id: "card-news",
    label: "카드뉴스",
    emoji: "🗂️",
    description: "인스타·블로그 카드뉴스 시리즈",
    promptPrefix: "카드뉴스 시리즈를 만들어 주세요",
    examples: {
      purpose: "예: 글쓰기 팁 7장 시리즈. 인스타 피드 게시용이에요.",
      audience: "예: 에세이를 쓰고 싶은 30~40대 직장인",
      texts: "예: 1편 무엇을 쓸까 / 2편 어떻게 쓸까",
      style: "예: 흰 배경에 큰 한글 타이틀과 작은 일러스트 포인트가 있는 정사각형 카드 시리즈예요. 7장 모두 일관된 톤이고, 부드러운 파스텔 액센트로 따뜻한 분위기를 잡아 주세요.",
    },
  },
  {
    id: "poster",
    label: "포스터",
    emoji: "📰",
    description: "강의·행사·세미나 모집 포스터",
    promptPrefix: "포스터를 만들어 주세요",
    examples: {
      purpose: "예: 위너책쓰기 7주 코칭 모집용. 인스타 스토리와 메일로 발송할 거예요.",
      audience: "예: 내 책 한 권을 내고 싶은 직장인과 1인 사업가",
      texts: "예: 위너책쓰기 7주 / 내 책 한 권 / 모집 마감 5/15",
      style: "예: 한국적 따뜻함을 담은 정갈한 톤으로, 크림과 우드 컬러에 부드러운 자연광이 어우러진 분위기예요. 응원하는 느낌이 묻어나면서도 정보가 깔끔한 모던 그리드로 정리되어 있으면 좋겠어요.",
    },
  },
  {
    id: "infographic",
    label: "인포그래픽",
    emoji: "📊",
    description: "PDF 보고서·통계·트렌드를 1장으로",
    searchRecommended: true,
    promptPrefix: "1장 요약 인포그래픽을 만들어 주세요",
    examples: {
      purpose: "예: ChatGPT 이미지 2.0 핵심 기능 요약. 블로그 글에 삽입할 자료예요.",
      audience: "예: AI 도구를 비교해 보러 온 마케터와 기획자",
      texts: "예: ChatGPT 이미지 2.0 / 한글 정확도 100% / 최대 8장 동시 생성",
      style: "예: 에디토리얼 매거진의 과학 그래픽 톤으로, 라벨과 화살표, 콜아웃이 정리되어 있고 정보 위계가 또렷하게 보이는 구성이면 좋겠어요. 색은 너무 화려하지 않게 절제된 두세 가지로 정리되어 있어요.",
    },
  },
  {
    id: "one-pager",
    label: "원페이저",
    emoji: "📄",
    description: "강의 커리큘럼·판매 페이지 1장 요약",
    searchRecommended: true,
    promptPrefix: "원페이저(한 장 요약 페이지)를 만들어 주세요",
    examples: {
      purpose: "예: 위너책쓰기 7주 코칭 커리큘럼. 판매 페이지 상단 히어로 이미지로 쓸 거예요.",
      audience: "예: 코칭 상세를 살펴보러 온 잠재 수강생",
      texts: "예: 1주차 시작 / 7주차 출판 / 30분 무료 상담",
      style: "예: 모던 그리드 레이아웃에 주차별 일정 표와 강사 사진이 깔끔하게 배치되어 있고, 하단에는 CTA 버튼이 또렷하게 보여요. 전체적으로 신뢰감 있는 톤이면 좋겠어요.",
    },
  },
  {
    id: "banner",
    label: "광고 배너",
    emoji: "🪧",
    description: "다중 비율 광고·뉴스레터 헤더·블로그 배너",
    searchRecommended: true,
    promptPrefix: "광고 배너를 만들어 주세요",
    examples: {
      purpose: "예: 신규 강의 출시 광고. 블로그 헤더와 뉴스레터 메일 상단에 쓸 거예요.",
      audience: "예: 글을 쓰는 직장인과 1인 크리에이터",
      texts: "예: AI가 글을 쓴다고? / 30일 무료 체험",
      style: "예: 가로로 긴 배너 비율로, 강한 색 대비와 큰 한글 타이틀이 시선을 끌어요. 트렌디하고 시원한 모던 톤이면 좋겠어요.",
    },
  },
  {
    id: "goods",
    label: "굿즈",
    emoji: "🎁",
    description: "책갈피·엽서·스티커·인쇄 세트",
    subTabs: [
      { id: "bookmark", label: "책갈피" },
      { id: "postcard", label: "엽서" },
      { id: "sticker", label: "스티커" },
      { id: "print-set", label: "인쇄 세트" },
    ],
    promptPrefix: "굿즈 디자인을 만들어 주세요",
    examples: {
      purpose: "예: 전자책 독자 선물용 책갈피. 인쇄해서 손편지와 함께 보낼 거예요.",
      audience: "예: 내 책을 구매해 준 독자",
      texts: "예: 오늘도 한 줄 / 민티 드림",
      style: "예: 아르데코 풍의 황금색과 기하학 패턴이 들어간 길쭉한 책갈피 비율이에요. 우아한 세리프 폰트로 따뜻하면서도 고급스러운 분위기를 잡아 주세요.",
    },
  },
  {
    id: "logo",
    label: "로고·아이콘",
    emoji: "🔷",
    description: "브랜드 로고 그리드, 아이콘 변형",
    promptPrefix: "로고·아이콘 디자인을 만들어 주세요",
    examples: {
      purpose: "예: 채널 로고 변형 그리드. 채널 아트와 워터마크 후보를 비교해 보려고 해요.",
      audience: "예: 후보 시안을 검토할 본인",
      texts: "예: 행글라이터",
      style: "예: 한 가지 메인 피사체를 미니멀 벡터 로고로 16~20개 변주한 그리드예요. 기하학형, 라인 아트, 엠블럼, 모노그램 등 다양한 방식이지만 전체적으로 한 컬렉션 같은 일관된 톤이면 좋겠어요.",
    },
  },
  {
    id: "mockup",
    label: "목업",
    emoji: "🖼️",
    description: "제품·인쇄물 목업, 앱·웹 UI 화면 목업",
    subTabs: [
      { id: "product", label: "제품 목업" },
      { id: "ui", label: "UI 목업" },
    ],
    promptPrefix: "목업 이미지를 만들어 주세요",
    examples: {
      purpose: "예: 내 전자책 표지 목업. 판매 페이지 히어로 이미지로 쓸 거예요.",
      audience: "예: 구매를 검토하고 있는 잠재 독자",
      texts: "예: 글 못 쓰는 사람은 없다",
      style: "예: 사실적인 종이 질감의 책 표지 목업으로, 자연광 그림자가 부드럽게 떨어지고 따뜻한 책상 위 분위기가 느껴져요.",
    },
  },
  {
    id: "free",
    label: "기타 / 자유",
    emoji: "✏️",
    description: "위 카테고리에 안 맞을 때 자유 작성",
    examples: {
      purpose: "만들고 싶은 결과물과 어디에 쓸 건지 자유롭게 적어 주세요.",
      audience: "이 결과물을 누가 보게 될까요?",
      texts: "화면에 정확히 박힐 글자가 있다면 한 줄에 하나씩",
      style: "원하는 느낌·레퍼런스·구도·색감을 자연스럽게 한 단락으로 (한 단어만 적어도 OK)",
    },
  },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
