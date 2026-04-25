import { type AspectRatio, type PromptLanguage } from "../../lib/storybook/prompt-builder";

export interface OutputSettings {
  aspectRatio: AspectRatio;
  maxScenes: number;
  bookMode: boolean;
  comicMode: boolean;
  comicsPerPage: number;
  language: PromptLanguage;
  extraContext: string;
}

const LANGUAGES: { value: PromptLanguage; label: string; desc: string }[] = [
  { value: "en", label: "영문", desc: "권장 · 정확도 ↑" },
  { value: "ko", label: "한글", desc: "이해 쉬움" },
  { value: "both", label: "둘 다", desc: "비교용" },
];

interface Props {
  settings: OutputSettings;
  onChange: (settings: OutputSettings) => void;
}

const RATIOS: { value: AspectRatio; label: string; icon: string; desc: string }[] = [
  { value: "1:1", label: "1:1", icon: "⬛", desc: "정사각형" },
  { value: "4:3", label: "4:3", icon: "🖼️", desc: "가로형" },
  { value: "3:4", label: "3:4", icon: "📄", desc: "세로형" },
  { value: "16:9", label: "16:9", icon: "🎬", desc: "와이드" },
  { value: "9:16", label: "9:16", icon: "📱", desc: "세로 와이드" },
];

export default function OutputOptions({ settings, onChange }: Props) {
  const update = (partial: Partial<OutputSettings>) =>
    onChange({ ...settings, ...partial });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">4단계</span>
        <h2 className="text-lg font-semibold text-gray-800">출력 옵션</h2>
      </div>

      {/* 프롬프트 언어 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">프롬프트 언어</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.value}
              onClick={() => update({ language: l.value })}
              className={`flex flex-col items-start px-4 py-2 rounded-xl border-2 transition-all text-sm
                ${settings.language === l.value
                  ? "border-purple-500 bg-purple-50 text-purple-700 font-bold"
                  : "border-gray-200 text-gray-600 hover:border-purple-300"
                }`}
            >
              <span className="font-bold">{l.label}</span>
              <span className="text-xs text-gray-500 font-normal">{l.desc}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
          한글 또는 영문 중 원하는 걸 사용하세요. 내용을 살펴보고 자신에게 맞춰 수정하면 더 좋습니다.
        </p>
      </div>

      {/* 추가 컨텍스트 (배경/장소) */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          배경/장소 추가 (선택) <span className="text-xs text-gray-500 font-normal">- 모든 씬에 반영</span>
        </p>
        <input
          type="text"
          value={settings.extraContext}
          onChange={(e) => update({ extraContext: e.target.value })}
          placeholder="예: 우리집 거실 / 제주도 바닷가 / 1980년대 한국 시골 마을"
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* 씬(페이지) 수 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">씬(페이지) 수</p>
        <div className="flex flex-wrap gap-2">
          {[2, 4, 6, 8].map((n) => (
            <button
              key={n}
              onClick={() => update({ maxScenes: n })}
              className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-all text-sm
                ${settings.maxScenes === n
                  ? "border-purple-500 bg-purple-50 text-purple-700 font-bold"
                  : "border-gray-200 text-gray-600 hover:border-purple-300"
                }`}
            >
              <span className="font-bold">{n}씬</span>
              {n === 6 && <span className="text-xs text-purple-400">기본</span>}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
          스토리 데이터가 선택한 씬 수보다 적으면 있는 씬까지 생성됩니다.
        </p>
      </div>

      {/* 이미지 비율 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">이미지 비율</p>
        <div className="flex flex-wrap gap-2">
          {RATIOS.map((r) => (
            <button
              key={r.value}
              onClick={() => update({ aspectRatio: r.value })}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all text-sm
                ${settings.aspectRatio === r.value
                  ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-purple-300"
                }`}
            >
              <span className="text-base">{r.icon}</span>
              <span className="font-bold">{r.label}</span>
              <span className="text-xs text-gray-500">{r.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 동화 텍스트 이미지 삽입 모드 */}
      <div className="flex items-start justify-between bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">📖</span>
          <div>
            <p className="text-base font-semibold text-gray-800">동화 텍스트 이미지 삽입</p>
            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
              프롬프트에 한국어 텍스트를 포함시켜 GPT Image가 이미지 안에 직접 글자를 그려 넣습니다.
            </p>
          </div>
        </div>
        <button
          onClick={() => update({ bookMode: !settings.bookMode })}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none
            ${settings.bookMode ? "bg-purple-600" : "bg-gray-200"}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${settings.bookMode ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>

      {/* 씬 합치기 (웹툰 모드) */}
      <div className="flex items-start justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">📰</span>
          <div>
            <p className="text-base font-semibold text-gray-800">씬 합치기 (토큰 절약)</p>
            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
              여러 씬을 한 이미지에 그려 GPT 이미지 사용량을 절약합니다.
            </p>
          </div>
        </div>
        <button
          onClick={() => update({ comicMode: !settings.comicMode })}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none
            ${settings.comicMode ? "bg-blue-600" : "bg-gray-200"}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${settings.comicMode ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>

      {settings.comicMode && (
        <div className="ml-4 pl-4 border-l-2 border-blue-200">
          <p className="text-sm font-medium text-gray-700 mb-2">페이지당 씬 수</p>
          <div className="flex gap-2">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => update({ comicsPerPage: n })}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all
                  ${settings.comicsPerPage === n
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
              >
                {n}씬
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
            씬이 많을수록 한 이미지에 더 많은 장면이 들어갑니다.
          </p>
        </div>
      )}
    </div>
  );
}
