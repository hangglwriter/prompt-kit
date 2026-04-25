"""Capture mobile screenshots for prompt-kit pages."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import sys

OUT_DIR = Path(r"D:\Sites\prompt-kit\scripts\screenshots")
OUT_DIR.mkdir(parents=True, exist_ok=True)

URLS = [
    ("home", "http://localhost:4322/"),
    ("home_alt", "http://localhost:4321/"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    iphone = p.devices["iPhone 13"]
    context = browser.new_context(**iphone)
    page = context.new_page()

    base_url = None
    for label, url in URLS:
        try:
            page.goto(url, timeout=5000, wait_until="domcontentloaded")
            base_url = url.rstrip("/")
            print(f"[OK] Connected to {url}")
            break
        except Exception as e:
            print(f"[SKIP] {url}: {type(e).__name__}")
    if not base_url:
        print("[FAIL] dev server not reachable on 4321 or 4322")
        sys.exit(1)

    targets = [
        ("01_home_top", base_url + "/", 0),
        ("02_home_full", base_url + "/", None),
        ("03_thumbnail_top", base_url + "/category/thumbnail", 0),
        ("04_thumbnail_full", base_url + "/category/thumbnail", None),
        ("05_infographic_full", base_url + "/category/infographic", None),
    ]

    for name, url, scroll_y in targets:
        page.goto(url, wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(800)  # let lazy images settle a bit
        if scroll_y is not None:
            page.evaluate(f"window.scrollTo(0, {scroll_y})")
            page.wait_for_timeout(200)
        full = scroll_y is None
        path = OUT_DIR / f"{name}.png"
        page.screenshot(path=str(path), full_page=full)
        size = path.stat().st_size // 1024
        # detect horizontal scroll
        has_h_scroll = page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
        print(f"[CAP] {name}.png ({size} KB, full={full}, h-scroll={has_h_scroll})")

    # Slider auto-flow check on home
    page.goto(base_url + "/", wait_until="networkidle")
    pos1 = page.evaluate("document.getElementById('slider-track')?.scrollLeft ?? -1")
    page.wait_for_timeout(2500)
    pos2 = page.evaluate("document.getElementById('slider-track')?.scrollLeft ?? -1")
    print(f"[SLIDER] scrollLeft after 0s: {pos1}, after 2.5s: {pos2} (delta: {pos2 - pos1 if pos1 >= 0 and pos2 >= 0 else 'n/a'})")

    browser.close()
print(f"\nScreenshots saved to: {OUT_DIR}")
