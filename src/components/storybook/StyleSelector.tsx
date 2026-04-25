import { STYLE_PRESETS, CUSTOM_STYLE_ID } from "../../lib/storybook/templates/styles";

interface Props {
  selectedId: string;
  customStyle: string;
  onSelectId: (id: string) => void;
  onCustomChange: (val: string) => void;
}

export default function StyleSelector({ selectedId, customStyle, onSelectId, onCustomChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">2단계</span>
        <h2 className="text-lg font-semibold text-gray-800">동화 스타일 선택</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STYLE_PRESETS.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectId(style.id)}
            className={`text-left p-3 rounded-xl border-2 transition-all hover:shadow-md
              ${selectedId === style.id
                ? "border-purple-500 bg-purple-50 shadow-md"
                : "border-gray-200 bg-white hover:border-purple-300"
              }`}
          >
            <div className="text-2xl mb-1">{style.emoji}</div>
            <div className="text-sm font-semibold text-gray-800">{style.nameKo}</div>
            <div className="text-sm text-gray-500 mt-0.5 leading-snug">{style.description}</div>
          </button>
        ))}

        <button
          onClick={() => onSelectId(CUSTOM_STYLE_ID)}
          className={`text-left p-3 rounded-xl border-2 transition-all hover:shadow-md
            ${selectedId === CUSTOM_STYLE_ID
              ? "border-purple-500 bg-purple-50 shadow-md"
              : "border-gray-200 bg-white hover:border-purple-300"
            }`}
        >
          <div className="text-2xl mb-1">✏️</div>
          <div className="text-sm font-semibold text-gray-800">커스텀 스타일</div>
          <div className="text-sm text-gray-500 mt-0.5 leading-snug">원하는 스타일을 직접 입력</div>
        </button>
      </div>

      {selectedId === CUSTOM_STYLE_ID && (
        <textarea
          value={customStyle}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="예: watercolor illustration with pastel colors, soft brush strokes, dreamy atmosphere"
          rows={3}
          className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
      )}

      {selectedId && selectedId !== CUSTOM_STYLE_ID && (
        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-600">적용될 스타일 프롬프트: </span>
          {STYLE_PRESETS.find((s) => s.id === selectedId)?.prompt}
        </div>
      )}
    </div>
  );
}
