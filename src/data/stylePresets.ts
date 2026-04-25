export interface StylePreset {
  id: string;
  label: string;
  description: string;
  fragment: string;
  category: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  // ===== 인포그래픽 =====
  {
    id: "infographic-magazine-science",
    category: "infographic",
    label: "매거진 과학 그래픽",
    description: "잡지 과학 페이지 톤, 도식·콜아웃·화살표가 잘 정리된 느낌",
    fragment: "에디토리얼 매거진 과학 그래픽 스타일, 아이소메트릭 단면도와 라벨·화살표·콜아웃이 정리되어 있고, 색상 대비로 정보 구분이 명확함",
  },
  {
    id: "infographic-vintage-botanical",
    category: "infographic",
    label: "빈티지 식물 세밀화",
    description: "19세기 과학 도감 풍, 잉크 선묘와 크로스해칭",
    fragment: "19세기 과학 도감처럼 재해석한 빈티지 세밀화, 가는 잉크 선묘, 섬세한 크로스해칭, 사실적이면서도 이상화된 일러스트",
  },
  {
    id: "infographic-cute-edu",
    category: "infographic",
    label: "친근한 교육 일러스트",
    description: "초등 교과서·동화 같은 따뜻한 톤, 아이콘·도형 혼합",
    fragment: "친근한 애니메이션 스타일 교육 포스터, 깔끔한 일러스트와 아이콘·컬러 블로킹, 라벨이 또렷하게 읽힘",
  },
  {
    id: "infographic-isometric",
    category: "infographic",
    label: "아이소메트릭 단면도",
    description: "건물·도시·기계 단면을 입체로 나눠 보여주는 스타일",
    fragment: "반사실적 아이소메트릭 단면도, 라벨 오버레이, 화살표, 수치 콜아웃, 정확한 공간 관계",
  },
  {
    id: "infographic-handdrawn",
    category: "infographic",
    label: "손그림 노트",
    description: "마치 워크숍 노트처럼 손글씨·손그림으로 정리한 인포그래픽",
    fragment: "손그림 느낌 인포그래픽, 거친 질감의 일러스트와 손글씨 라벨, 워크숍 노트 톤",
  },
  {
    id: "infographic-flat-icon",
    category: "infographic",
    label: "플랫 아이콘 다이어그램",
    description: "단순한 아이콘과 굵은 색 블록으로 핵심만 보여주는 톤",
    fragment: "플랫 디자인 아이콘 다이어그램, 굵은 색 블록과 단순한 형태, 라벨이 또렷하게 읽히는 미니멀 톤",
  },

  // ===== 유튜브 썸네일 =====
  {
    id: "thumbnail-3d-character",
    category: "thumbnail",
    label: "3D 캐릭터 + 큰 글자",
    description: "디즈니풍 3D 인물 표정 + 좌우 분할 + 또렷한 한글",
    fragment: "3D 디즈니풍 인물이 놀라거나 웃는 표정으로 중앙에 위치, 좌우는 비교 화면 분할, 흰 배경 + 채도 높은 포인트색, 큰 글자가 또렷하게 박힘",
  },
  {
    id: "thumbnail-before-after",
    category: "thumbnail",
    label: "Before / After 비교",
    description: "좌측 Before·우측 After 화살표, 변화 강조",
    fragment: "왼쪽에 Before 화면(예전·문제 상황), 오른쪽에 After 화면(개선된 결과), 가운데 굵은 화살표, 비교가 한눈에 들어오는 구도",
  },
  {
    id: "thumbnail-react-shock",
    category: "thumbnail",
    label: "리액션 충격형",
    description: "인물 놀란 표정 + 배경 글자 폭발",
    fragment: "인물이 손을 들고 놀란 표정, 뒤로 큰 글자가 폭발하듯 배치, 강한 색 대비, 시청자 호기심을 끄는 클릭베이트 구도",
  },
  {
    id: "thumbnail-tutorial",
    category: "thumbnail",
    label: "튜토리얼·가이드 톤",
    description: "단계 화살표 + 결과 미리보기 + 깨끗한 배경",
    fragment: "튜토리얼 영상 썸네일, 단계 화살표와 결과 미리보기, 깨끗한 배경, 정보가 또렷하게 정리된 느낌, 신뢰감 있는 톤",
  },
  {
    id: "thumbnail-news-style",
    category: "thumbnail",
    label: "뉴스·속보 톤",
    description: "굵은 헤드라인 + 빨강 액센트 + 긴급감",
    fragment: "뉴스 속보 화면 같은 구성, 굵은 헤드라인 텍스트, 빨강 액센트와 검정 띠, 긴급감과 중요도가 느껴지는 톤",
  },
  {
    id: "thumbnail-vlog-soft",
    category: "thumbnail",
    label: "브이로그 감성형",
    description: "따뜻한 톤 + 자연광 + 부드러운 인물 사진",
    fragment: "따뜻한 자연광 아래 인물이 자연스럽게 미소 짓는 사진 톤, 파스텔 색감, 손글씨 같은 부드러운 폰트, 브이로그·일상 감성",
  },

  // ===== 책 표지 =====
  {
    id: "book-cover-editorial-poster",
    category: "book-cover",
    label: "에디토리얼 영화 포스터",
    description: "큰 타이틀·서브 카피·중앙 일러스트 위주의 깔끔한 구성",
    fragment: "영화 포스터 같은 에디토리얼 책 표지, 상단 큰 타이틀, 중앙 일러스트 또는 사진, 하단 서브 카피, 깔끔하고 절제된 톤",
  },
  {
    id: "book-cover-bookstore-bestseller",
    category: "book-cover",
    label: "서점 베스트셀러 톤",
    description: "잘 팔리는 자기계발·실용서 표지의 정석",
    fragment: "서점 베스트셀러 표지 톤, 굵은 산세리프 한글 타이틀, 강한 색 한 가지 + 흰 배경, 시선을 끄는 중앙 일러스트",
  },
  {
    id: "book-cover-vintage-novel",
    category: "book-cover",
    label: "빈티지 소설 표지",
    description: "낡은 종이 질감·세리프 폰트·고전적 일러스트",
    fragment: "빈티지 소설 표지, 낡은 종이 질감 배경, 우아한 세리프 폰트 타이틀, 고전 회화 같은 중앙 일러스트, 절제된 색감",
  },
  {
    id: "book-cover-minimal-typography",
    category: "book-cover",
    label: "미니멀 타이포 표지",
    description: "이미지 없이 텍스트만으로 강한 인상",
    fragment: "미니멀 타이포그래피 책 표지, 이미지 없이 단정한 타이틀과 그리드 레이아웃, 절제된 색 한두 가지, 디자인 서적 톤",
  },
  {
    id: "book-cover-watercolor",
    category: "book-cover",
    label: "수채화 따뜻한 톤",
    description: "에세이·자기치유 도서에 어울리는 부드러운 톤",
    fragment: "수채화 일러스트 책 표지, 부드러운 색 번짐과 따뜻한 톤, 손글씨 느낌 타이틀, 에세이·치유 도서 분위기",
  },
  {
    id: "book-cover-photographic",
    category: "book-cover",
    label: "사진 기반 표지",
    description: "강한 사진 한 장 + 절제된 타이포",
    fragment: "사진 기반 책 표지, 임팩트 있는 한 장의 사진 위에 절제된 타이포그래피, 영화 포스터 같은 깊이감",
  },

  // ===== 카드뉴스 =====
  {
    id: "card-news-instagram-clean",
    category: "card-news",
    label: "인스타 클린 카드",
    description: "흰 배경 + 큰 글자 + 간결한 일러스트, 정사각형",
    fragment: "인스타그램 카드뉴스 시리즈, 흰 배경에 큰 한글 타이틀과 간결한 일러스트, 정사각형 비율로 일관성 있는 톤",
  },
  {
    id: "card-news-comic-strip",
    category: "card-news",
    label: "4컷 만화 스타일",
    description: "친근한 만화 컷으로 스토리텔링",
    fragment: "4페이지 미국식 레트로 코믹 스타일, 친근한 캐릭터와 말풍선, 컷이 자연스럽게 이어지는 스토리텔링 구성",
  },
  {
    id: "card-news-magazine-edu",
    category: "card-news",
    label: "교육 매거진 톤",
    description: "지식 전달 카드뉴스, 도식·도표 함께",
    fragment: "지식 전달 카드뉴스, 매거진 에디토리얼 톤, 도식과 작은 도표가 함께 있고, 라벨·콜아웃이 또렷하게 읽힘",
  },
  {
    id: "card-news-pastel-typography",
    category: "card-news",
    label: "파스텔 타이포 카드",
    description: "감성 글귀·인용구 카드, 부드러운 색감",
    fragment: "파스텔 타이포그래피 카드, 부드러운 색감 배경에 또렷한 한글 인용구, 작은 일러스트 포인트, 감성적 톤",
  },
  {
    id: "card-news-bold-color-block",
    category: "card-news",
    label: "굵은 색 블록형",
    description: "단순한 색 블록 + 굵은 글자, 시선 잡기 좋음",
    fragment: "굵은 색 블록과 강한 대비, 핵심 한 줄을 굵게 박은 카드, SNS 피드에서 시선이 멈추는 구성",
  },
  {
    id: "card-news-photo-overlay",
    category: "card-news",
    label: "사진 + 텍스트 오버레이",
    description: "사진 위에 또렷한 텍스트, 트렌디한 룩",
    fragment: "사진 위에 텍스트가 오버레이된 카드, 사진은 어두운 그라디언트로 가독성 확보, 트렌디한 SNS 룩",
  },

  // ===== 포스터 =====
  {
    id: "poster-event-modern",
    category: "poster",
    label: "행사 모집 모던",
    description: "강의·세미나·웨비나 모집용 깔끔한 모던 톤",
    fragment: "강의·행사 모집 포스터, 깔끔한 모던 그리드 레이아웃, 큰 타이틀·날짜·장소·참가 방법이 명확하게 정리됨",
  },
  {
    id: "poster-wheatpaste-trend",
    category: "poster",
    label: "Wheatpaste 트렌드",
    description: "도시 거리 포스터 톤, 여러 패널 그리드",
    fragment: "Wheatpaste 거리 포스터 스타일, 같은 크기의 여러 패널 그리드, 굵은 산세리프 타이포, 트렌디한 거친 질감",
  },
  {
    id: "poster-art-deco",
    category: "poster",
    label: "아르데코 클래식",
    description: "황금색·기하학 패턴의 고급스러운 포스터",
    fragment: "아르데코 스타일 포스터, 황금색과 기하학 패턴, 우아한 세리프 폰트, 클래식하면서도 고급스러운 톤",
  },
  {
    id: "poster-korean-hanok",
    category: "poster",
    label: "한옥·한국 감성",
    description: "한국적 따뜻함, 크림·우드톤, 정갈한 여백",
    fragment: "한국 한옥 감성 광고 포스터, 크림과 우드톤, 부드러운 자연광, 정갈한 여백, 한글 타이틀이 절제되어 자리잡음",
  },
  {
    id: "poster-bauhaus",
    category: "poster",
    label: "바우하우스 기하학",
    description: "원·사각·삼각의 기하학 + 원색",
    fragment: "바우하우스 스타일 포스터, 원·사각·삼각 기하학 도형과 원색의 조합, 모던하고 절제된 타이포그래피",
  },
  {
    id: "poster-cinematic-hero",
    category: "poster",
    label: "시네마틱 히어로",
    description: "영화 한 장면처럼, 강한 인물·드라마틱 조명",
    fragment: "시네마틱 영화 포스터, 강한 인물 사진과 드라마틱 조명, 깊이감 있는 색감, 하단에 절제된 타이포그래피",
  },

  // ===== 원페이저 =====
  {
    id: "one-pager-curriculum",
    category: "one-pager",
    label: "강의 커리큘럼 원페이저",
    description: "주차별 커리큘럼 + 강사 소개 + CTA",
    fragment: "강의 커리큘럼 원페이저, 주차별 일정 표와 강사 소개, 하단 CTA 버튼, 정보가 명확하게 정리된 모던 톤",
  },
  {
    id: "one-pager-product-spec",
    category: "one-pager",
    label: "제품 스펙 원페이저",
    description: "제품 사진·스펙·가격을 한 장에",
    fragment: "제품 스펙 원페이저, 제품 사진과 핵심 스펙·가격 정보가 한 장에 명확하게 정리됨, 깔끔한 모던 레이아웃",
  },
  {
    id: "one-pager-business-slide",
    category: "one-pager",
    label: "비즈니스 시장 기회 슬라이드",
    description: "투자자·파트너용 한 장 시장 분석",
    fragment: "비즈니스 시장 기회 슬라이드 한 장, 시장 규모·성장률·기회 영역이 차트와 함께 정리됨, 프로페셔널한 톤",
  },
  {
    id: "one-pager-academic",
    category: "one-pager",
    label: "학술 포스터",
    description: "연구 결과·다이어그램·인용을 정렬",
    fragment: "학술 포스터 톤, 연구 결과·다이어그램·인용이 그리드로 정렬, 절제된 색감과 세리프 폰트",
  },
  {
    id: "one-pager-resume",
    category: "one-pager",
    label: "이력 한 장 요약",
    description: "경력·작품·연락처를 한 장에",
    fragment: "이력 한 장 요약 페이지, 경력·작품·연락처가 모던 그리드로 정리됨, 절제된 컬러 한두 가지",
  },
  {
    id: "one-pager-event-summary",
    category: "one-pager",
    label: "행사 요약 페이지",
    description: "주요 일정·연사·장소를 한 장에",
    fragment: "행사 요약 한 장 페이지, 일정·연사·장소·등록 방법이 시각적으로 정리됨, 깔끔한 모던 톤",
  },

  // ===== 광고 배너 =====
  {
    id: "banner-multi-aspect",
    category: "banner",
    label: "다중 비율 광고 세트",
    description: "트위터·인스타 피드·스토리·블로그까지 한 번에",
    fragment: "여러 비율로 사용 가능한 광고 세트, 트위터·인스타 피드·스토리·블로그 헤더용 변형이 일관된 톤으로 묶여 있음",
  },
  {
    id: "banner-streetwear-minimal",
    category: "banner",
    label: "스트리트웨어 미니멀",
    description: "도시 감성, 미니멀 사진과 타이포",
    fragment: "스트리트웨어 미니멀 광고, 도시 감성 사진과 절제된 타이포그래피, 트렌디한 일본·뉴욕 톤",
  },
  {
    id: "banner-ecommerce-pop",
    category: "banner",
    label: "이커머스 팝",
    description: "할인·프로모션 강조, 강한 색과 큰 가격",
    fragment: "이커머스 프로모션 배너, 강한 색 대비와 큰 가격·할인율 표기, 시선을 끄는 강한 톤",
  },
  {
    id: "banner-newsletter-header",
    category: "banner",
    label: "뉴스레터 헤더",
    description: "스티비·메일침프 등 메일 상단용",
    fragment: "뉴스레터 메일 헤더 이미지, 가로로 긴 비율, 브랜드 톤에 맞는 일러스트와 타이틀이 절제되어 자리잡음",
  },
  {
    id: "banner-blog-hero",
    category: "banner",
    label: "블로그 히어로 배너",
    description: "블로그 글 상단의 인상적인 한 장",
    fragment: "블로그 글 히어로 배너, 인상적인 한 장의 일러스트 또는 사진과 큰 한글 타이틀, 깔끔한 그라디언트 오버레이",
  },
  {
    id: "banner-travel-pano",
    category: "banner",
    label: "여행·라이프스타일 파노라마",
    description: "여러 장면이 가로로 이어지는 여행 광고",
    fragment: "여행·라이프스타일 파노라마 광고, 3~4개 장면이 한 화면으로 자연스럽게 이어지는 구성, 따뜻한 자연광과 여유로운 분위기",
  },

  // ===== 굿즈 =====
  {
    id: "goods-bookmark-art-deco",
    category: "goods",
    label: "아르데코 책갈피",
    description: "황금색·기하학 패턴의 고급스러운 책갈피",
    fragment: "아르데코 스타일 책갈피, 황금색과 기하학 패턴, 우아한 세리프 폰트, 책에 끼우기 좋은 길쭉한 비율",
  },
  {
    id: "goods-postcard-illustration",
    category: "goods",
    label: "일러스트 엽서",
    description: "한 장 풍경 일러스트 엽서, 손그림 톤",
    fragment: "일러스트 엽서, 한 장의 따뜻한 풍경 일러스트와 작은 손글씨 카피, 우편엽서 비율과 가장자리 여백",
  },
  {
    id: "goods-japanese-sticker",
    category: "goods",
    label: "일본식 단순화 스티커",
    description: "검은 윤곽선·단순 색면의 캐릭터 스티커",
    fragment: "일본식 단순화 스티커 스타일, 길고 가는 윤곽선, 무표정·미니멀 색면, 흰 배경의 캐릭터 시리즈",
  },
  {
    id: "goods-line-art-sticker",
    category: "goods",
    label: "라인 아트 스티커",
    description: "단순한 선과 한 가지 액센트 색",
    fragment: "라인 아트 스티커, 단순한 선 드로잉과 한 가지 포인트 색, 미니멀하지만 사랑스러운 톤",
  },
  {
    id: "goods-print-set",
    category: "goods",
    label: "스튜디오 인쇄 세트",
    description: "리뷰 시트·메모·홍보물이 묶인 인쇄 세트",
    fragment: "전문 크리에이티브 스튜디오 인쇄 세트, 리뷰 시트·프루프 페이지·메모·홍보물이 평면 배치로 정렬, 사실적 종이 질감",
  },
  {
    id: "goods-vintage-stamp",
    category: "goods",
    label: "빈티지 우표·라벨",
    description: "낡은 종이 질감과 빈티지 일러스트",
    fragment: "빈티지 우표·라벨 디자인, 낡은 종이 질감과 빈티지 일러스트, 가는 테두리와 절제된 색감",
  },

  // ===== 로고·아이콘 =====
  {
    id: "logo-grid-variations",
    category: "logo",
    label: "로고 변형 그리드 16종",
    description: "한 피사체를 16~20가지로 변주한 로고 컬렉션",
    fragment: "한 메인 피사체를 핵심 아이콘으로 활용한 미니멀 로고 그리드 16~20개, 기하학형·라인 아트·네거티브 스페이스·엠블럼·배지·모노그램으로 변주된 일관된 컬렉션",
  },
  {
    id: "logo-flat-vector",
    category: "logo",
    label: "플랫 벡터 로고",
    description: "단순한 형태와 강한 실루엣, 그라디언트 없음",
    fragment: "플랫 벡터 로고, 단순한 형태와 강한 실루엣, 균형 있는 네거티브 스페이스, 그라디언트나 음영 없이 한 색면",
  },
  {
    id: "logo-monogram",
    category: "logo",
    label: "모노그램 이니셜",
    description: "이니셜을 우아한 모노그램으로 결합",
    fragment: "모노그램 로고, 이니셜이 우아하게 결합된 형태, 절제된 세리프 라인, 클래식하고 고급스러운 톤",
  },
  {
    id: "logo-emblem-badge",
    category: "logo",
    label: "엠블럼 배지",
    description: "원형 또는 방패형 외곽 + 중앙 심볼",
    fragment: "엠블럼 배지 로고, 원형 또는 방패형 외곽 안에 중앙 심볼과 텍스트, 클래식 라인 아트 디테일",
  },
  {
    id: "logo-icon-system",
    category: "logo",
    label: "아이콘 시스템",
    description: "한 스타일로 통일된 아이콘 세트 16개",
    fragment: "한 스타일로 통일된 아이콘 시스템 16개, 같은 스트로크 두께·같은 곡률, 일관된 그리드에 정렬",
  },
  {
    id: "logo-handlettered",
    category: "logo",
    label: "손글씨 워드마크",
    description: "손글씨 느낌의 따뜻한 워드마크 로고",
    fragment: "손글씨 워드마크 로고, 따뜻한 손글씨 느낌과 작은 그래픽 액센트, 친근하고 따뜻한 브랜드 톤",
  },

  // ===== 목업 =====
  {
    id: "mockup-product-book",
    category: "mockup",
    label: "잡지·책 표지 목업",
    description: "사실적 종이 질감의 책·잡지 목업",
    fragment: "사실적 잡지 또는 책 표지 목업, 진짜 종이 질감과 그림자, 제목 텍스트가 또렷하게 인쇄된 느낌",
  },
  {
    id: "mockup-product-package",
    category: "mockup",
    label: "제품 박스·패키지 목업",
    description: "제품 패키지·매뉴얼·스티커 인쇄물 사실감",
    fragment: "제품 박스 평면 배치 목업, 박스·매뉴얼·스티커·보증서가 그림자와 함께 사실적으로 정렬, 인쇄물 디테일 사실감",
  },
  {
    id: "mockup-ui-ecommerce",
    category: "mockup",
    label: "UI 이커머스 화면",
    description: "랩탑·모바일 이커머스 상품 페이지",
    fragment: "이커머스 상품 페이지 UI 목업, 상품 사진·옵션·리뷰 요약·구매 버튼이 정밀하게 배치된 모던 인터페이스, 사실적인 브라우저 렌더링",
  },
  {
    id: "mockup-ui-app-dashboard",
    category: "mockup",
    label: "앱 대시보드 화면",
    description: "태블릿·모바일 대시보드 UI 목업",
    fragment: "앱 대시보드 UI 목업, 모던 카드 레이아웃과 차트·라벨이 또렷하게 읽히는 화면, 사실적인 기기 반사와 그림자",
  },
  {
    id: "mockup-ui-kiosk",
    category: "mockup",
    label: "키오스크·공공 디스플레이",
    description: "공항·매장 키오스크 화면 목업",
    fragment: "공항·매장 키오스크 UI 목업, 큰 화면에 정보가 명확하게 정리, 유리 반사와 주변 흐림 효과로 현장감",
  },
  {
    id: "mockup-print-poster",
    category: "mockup",
    label: "거리 포스터 목업",
    description: "도시 벽·게시판에 붙은 포스터 사진",
    fragment: "도시 거리 벽이나 게시판에 붙어 있는 포스터 사진 목업, 사실적인 종이 질감과 그림자, 자연스러운 거리 분위기",
  },
];

export function getPresetsByCategory(categoryId: string): StylePreset[] {
  return STYLE_PRESETS.filter((p) => p.category === categoryId);
}
