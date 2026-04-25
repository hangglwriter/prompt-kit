import { useState } from "react";
import { STORY_PRESETS, CUSTOM_STORY_ID } from "../../lib/storybook/templates/stories";

interface Props {
  selectedId: string;
  customScenes: string;
  onSelectId: (id: string) => void;
  onCustomChange: (val: string) => void;
}

export default function StorySelector({ selectedId, customScenes, onSelectId, onCustomChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const selectedStory = STORY_PRESETS.find((s) => s.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">3단계</span>
        <h2 className="text-lg font-semibold text-gray-800">스토리 선택</h2>
      </div>

      <div className="space-y-2">
        {STORY_PRESETS.map((story) => (
          <div key={story.id} className={`rounded-xl border-2 transition-all
            ${selectedId === story.id ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"}`}>
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between"
              onClick={() => {
                onSelectId(story.id);
                setExpanded(expanded === story.id ? null : story.id);
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{story.emoji}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{story.titleKo}</div>
                  <div className="text-sm text-gray-500 leading-snug">{story.synopsis}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {story.scenes.length}씬
                </span>
                <span className="text-gray-400 text-xs">
                  {expanded === story.id ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {expanded === story.id && (
              <div className="px-4 pb-3 border-t border-gray-100 pt-3">
                <div className="space-y-1.5">
                  {story.scenes.map((scene) => (
                    <div key={scene.sceneNumber} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 font-bold shrink-0">씬 {scene.sceneNumber}</span>
                      <span className="font-medium text-gray-700 shrink-0">{scene.title}:</span>
                      <span className="text-gray-500 truncate">{scene.situation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className={`rounded-xl border-2 transition-all
          ${selectedId === CUSTOM_STORY_ID ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"}`}>
          <button
            className="w-full text-left px-4 py-3 flex items-center gap-3"
            onClick={() => onSelectId(CUSTOM_STORY_ID)}
          >
            <span className="text-xl">✏️</span>
            <div>
              <div className="text-sm font-semibold text-gray-800">커스텀 스토리</div>
              <div className="text-sm text-gray-500">씬을 직접 작성 (한 줄에 하나씩)</div>
            </div>
          </button>

          {selectedId === CUSTOM_STORY_ID && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <textarea
                value={customScenes}
                onChange={(e) => onCustomChange(e.target.value)}
                placeholder={"씬 1: standing in a sunny park, smiling happily\n씬 2: running through flower fields with butterflies around\n씬 3: sitting under a big tree, reading a magical book"}
                rows={5}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">줄 바꿈으로 씬을 구분합니다. 영어로 작성하면 더 정확한 프롬프트가 생성됩니다.</p>
            </div>
          )}
        </div>
      </div>

      {selectedId && selectedId !== CUSTOM_STORY_ID && selectedStory && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-sm text-purple-700">
          <span className="font-semibold">{selectedStory.titleKo}</span> — {selectedStory.scenes.length}개 씬 프롬프트가 생성됩니다.
        </div>
      )}
    </div>
  );
}
