"""Copy GPT generated sample images to public/samples/ with clean filenames."""
import shutil
from pathlib import Path

SRC = Path(r"D:\claude-youtube\260425 챗GPT 이미지 2.0\GPT 생성 이미지 - 샘플")
DST = Path(r"D:\Sites\prompt-kit\public\samples")
DST.mkdir(parents=True, exist_ok=True)

MAPPING = {
    "1 유튜브 썸네일.png": "thumbnail-01.png",
    "2 책표지.png": "book-cover-01.png",
    "2 책표지 2.png": "book-cover-02.png",
    "3 포스터.png": "poster-01.png",
    "3 포스터-1.png": "poster-02.png",
    "3 포스터-2.png": "poster-03.png",
    "3 포스터 3.png": "poster-04.png",
    "3 포스터 4.png": "poster-05.png",
    "가로형 포스터.png": "poster-06.png",
    "4 카드뉴스 (1).png": "card-news-01.png",
    "4 카드뉴스 (2).png": "card-news-02.png",
    "4 카드뉴스 (3).png": "card-news-03.png",
    "4 카드뉴스 (4).png": "card-news-04.png",
    "5 인포그래픽 (1).png": "infographic-01.png",
    "5 인포그래픽 (2).png": "infographic-02.png",
    "5 인포그래픽 (3).png": "infographic-03.png",
    "5 인포그래픽 (4).png": "infographic-04.png",
    "5 인포그래픽 (5).png": "infographic-05.png",
    "5 인포그래픽 추가 (1).png": "infographic-06.png",
    "5 인포그래픽 추가 (2).png": "infographic-07.png",
    "5 인포그래픽 추가 (3).png": "infographic-08.png",
    "5 인포그래픽 추가 (4).png": "infographic-09.png",
    "5 인포그래픽 추가 (5).png": "infographic-10.png",
    "5 인포그래픽 추가 (6).png": "infographic-11.png",
    "6 동화 (1).png": "storybook-01.png",
    "6 동화 (2).png": "storybook-02.png",
    "6 동화 (3).png": "storybook-03.png",
    "6 동화 (4).png": "storybook-04.png",
    "6 동화 (5).png": "storybook-05.png",
    "6 동화 (6).png": "storybook-06.png",
    "목업 (1).png": "mockup-01.png",
    "목업 (2).png": "mockup-02.png",
    "목업 (3).png": "mockup-03.png",
    "gpt_image 2 웹툰1.png": "webtoon-01.png",
    "다른웹툰2.png": "webtoon-02.png",
    "다른웹튼3.png": "webtoon-03.png",
    "ChatGPT Image 2026년 4월 25일 오후 07_08_47.png": "other-01.png",
}

copied = 0
missing = []
for src_name, dst_name in MAPPING.items():
    src_path = SRC / src_name
    dst_path = DST / dst_name
    if not src_path.exists():
        missing.append(src_name)
        continue
    shutil.copy2(src_path, dst_path)
    copied += 1

print(f"Copied: {copied}/{len(MAPPING)}")
if missing:
    print(f"Missing: {missing}")
print(f"Output: {DST}")
