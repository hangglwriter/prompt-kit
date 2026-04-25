import { useState } from "react";
import { type GeneratedScenePrompt, type ComicPagePrompt, type PromptLanguage } from "../../lib/storybook/prompt-builder";

function CopyButton({ text, label = "복사" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all shrink-0
        ${copied
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"
        }`}
    >
      {copied ? "✓ 복사됨!" : `📋 ${label}`}
    </button>
  );
}

function PromptBox({ text, lang }: { text: string; lang: "en" | "ko" }) {
  const tagBg = lang === "en" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700";
  const tagLabel = lang === "en" ? "EN 영문" : "KO 한글";
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b border-gray-200">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagBg}`}>{tagLabel}</span>
        <CopyButton text={text} />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed font-mono bg-white p-3 break-all whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}

function PromptPanel({ promptPrimary, promptKo, language }: { promptPrimary: string; promptKo?: string; language: PromptLanguage }) {
  if (language === "both" && promptKo) {
    return (
      <div className="space-y-2">
        <PromptBox text={promptPrimary} lang="en" />
        <PromptBox text={promptKo} lang="ko" />
      </div>
    );
  }
  return <PromptBox text={promptPrimary} lang={language === "ko" ? "ko" : "en"} />;
}

/* ── 동화책 레이아웃 카드 (단일 씬) ── */
function BookCard({ scene, language }: { scene: GeneratedScenePrompt; language: PromptLanguage }) {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-amber-100 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            씬 {scene.sceneNumber}
          </span>
          <span className="text-sm font-bold text-amber-800">{scene.title}</span>
        </div>
      </div>

      <div className="flex min-h-[140px]">
        <div className="w-2/5 bg-white border-r border-amber-200 flex flex-col items-center justify-center p-3 gap-2">
          <div className="text-3xl">🖼️</div>
          <p className="text-sm text-amber-600 text-center leading-snug font-medium">
            이미지 안에<br />텍스트 포함됨
          </p>
        </div>
        <div className="w-3/5 p-4">
          <p className="text-sm text-amber-700 font-semibold mb-1">이미지에 삽입될 텍스트</p>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {scene.textKo}
          </p>
        </div>
      </div>

      <div className="p-3 bg-white border-t border-amber-200">
        <PromptPanel
          promptPrimary={scene.prompt}
          promptKo={scene.promptKo}
          language={language}
        />
      </div>
    </div>
  );
}

/* ── 일반 프롬프트 카드 (단일 씬) ── */
function SceneCard({ scene, language }: { scene: GeneratedScenePrompt; language: PromptLanguage }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-center gap-2">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
          씬 {scene.sceneNumber}
        </span>
        <span className="text-sm font-semibold text-gray-700">{scene.title}</span>
      </div>
      <PromptPanel promptPrimary={scene.prompt} promptKo={scene.promptKo} language={language} />
    </div>
  );
}

/* ── 씬 합치기 카드 ── */
function ComicCard({ page, bookMode, language }: { page: ComicPagePrompt; bookMode: boolean; language: PromptLanguage }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md border-2
      ${bookMode ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}`}>
      <div className={`flex items-center justify-between px-4 py-2 border-b
        ${bookMode ? "bg-amber-100 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            페이지 {page.pageNumber}
          </span>
          {page.sceneLabels.map((label, i) => (
            <span key={i} className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md">
              {label}
            </span>
          ))}
        </div>
      </div>

      {bookMode && (
        <div className="flex min-h-[140px]">
          <div className="w-2/5 bg-white border-r border-amber-200 flex flex-col items-center justify-center p-3 gap-2">
            <div className="text-3xl">🖼️</div>
            <p className="text-sm text-amber-600 text-center leading-snug font-medium">
              {page.sceneLabels.length}씬 합쳐진 이미지<br />텍스트 포함됨
            </p>
          </div>
          <div className="w-3/5 p-4">
            <p className="text-sm text-amber-700 font-semibold mb-1">이미지에 삽입될 텍스트</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{page.textKo}</p>
          </div>
        </div>
      )}

      <div className={`p-3 ${bookMode ? "bg-white border-t border-amber-200" : ""}`}>
        <PromptPanel promptPrimary={page.prompt} promptKo={page.promptKo} language={language} />
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
interface Props {
  scenePrompts: GeneratedScenePrompt[];
  comicPages: ComicPagePrompt[];
  bookMode: boolean;
  comicMode: boolean;
  language: PromptLanguage;
}

export default function PromptOutput({ scenePrompts, comicPages, bookMode, comicMode, language }: Props) {
  const formatItem = (header: string, en: string, ko?: string) => {
    if (language === "en") return `${header}\n${en}`;
    if (language === "ko" && ko) return `${header}\n${ko}`;
    if (language === "both" && ko) return `${header}\n[EN]\n${en}\n\n[KO]\n${ko}`;
    return `${header}\n${en}`;
  };

  const allText = comicMode
    ? comicPages.map((p) => formatItem(`[페이지 ${p.pageNumber}]`, p.prompt, p.promptKo)).join("\n\n---\n\n")
    : scenePrompts.map((s) => formatItem(`[씬 ${s.sceneNumber}: ${s.title}]`, s.prompt, s.promptKo)).join("\n\n---\n\n");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">결과</span>
          <h2 className="text-lg font-semibold text-gray-800">생성된 프롬프트</h2>
          {bookMode && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">📖 텍스트 이미지 삽입</span>}
          {comicMode && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">📰 씬 합치기</span>}
          {language === "both" && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">EN+KO</span>}
        </div>
        <CopyButton text={allText} label="전체 복사" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800 leading-relaxed">
        💡 한글 또는 영문 중 원하는 걸 사용하세요. 내용을 살펴보고 자신에게 맞춰 수정하면 더 좋습니다.
      </div>

      <div className="space-y-4">
        {comicMode
          ? comicPages.map((page) => (
              <ComicCard key={page.pageNumber} page={page} bookMode={bookMode} language={language} />
            ))
          : scenePrompts.map((scene) =>
              bookMode ? (
                <BookCard key={scene.sceneNumber} scene={scene} language={language} />
              ) : (
                <SceneCard key={scene.sceneNumber} scene={scene} language={language} />
              )
            )}
      </div>

      {/* 사용법 강화 카드 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5">
        <p className="text-base font-bold text-purple-900 mb-3 flex items-center gap-2">
          <span>🎯</span><span>이렇게 쓰세요</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
              <span className="text-sm font-semibold text-gray-800">프롬프트 복사</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              위 카드의 📋 버튼으로 원하는 씬을 복사하세요.
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
              <span className="text-sm font-semibold text-gray-800">ChatGPT에 사진 첨부</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              GPT Image를 켜고, 등장인물 사진을 1·2·3 순서대로 첨부합니다.
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
              <span className="text-sm font-semibold text-gray-800">붙여넣고 전송</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              복사한 프롬프트를 메시지에 붙여넣고 전송하면 끝!
            </p>
          </div>
        </div>
        {comicMode && (
          <p className="text-sm text-purple-700 mt-3 bg-white/60 rounded-lg px-3 py-2 leading-relaxed">
            📰 씬 합치기 모드: 한 번에 여러 장면이 그려져 GPT 이미지 사용량을 절약합니다.
          </p>
        )}
        <p className="text-sm text-purple-700 mt-3 leading-relaxed">
          💬 사진 없이 텍스트로만 묘사해도 GPT가 알아서 그려요. 결과를 보고 마음에 들 때까지 수정해서 다시 보내세요.
        </p>
      </div>
    </div>
  );
}
