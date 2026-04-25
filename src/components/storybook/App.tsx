import { useState } from "react";
import CharacterInput from "./CharacterInput";
import StyleSelector from "./StyleSelector";
import StorySelector from "./StorySelector";
import OutputOptions, { type OutputSettings } from "./OutputOptions";
import PromptOutput from "./PromptOutput";
import {
  buildPrompts,
  buildComicPrompts,
  type GeneratedScenePrompt,
  type ComicPagePrompt,
  type CharacterMode,
  type PromptBuildInput,
} from "../../lib/storybook/prompt-builder";
import { STYLE_PRESETS } from "../../lib/storybook/templates/styles";
import { STORY_PRESETS } from "../../lib/storybook/templates/stories";

export default function StorybookApp() {
  const [characterMode, setCharacterMode] = useState<CharacterMode>("photo");
  const [photoCount, setPhotoCount] = useState(0);
  const [characterTexts, setCharacterTexts] = useState<string[]>(["", "", ""]);
  const [styleId, setStyleId] = useState(STYLE_PRESETS[0].id);
  const [customStyle, setCustomStyle] = useState("");
  const [storyId, setStoryId] = useState(STORY_PRESETS[0].id);
  const [customScenes, setCustomScenes] = useState("");

  const [outputSettings, setOutputSettings] = useState<OutputSettings>({
    aspectRatio: "1:1",
    maxScenes: 6,
    bookMode: false,
    comicMode: false,
    comicsPerPage: 2,
    language: "en",
    extraContext: "",
  });

  const [scenePrompts, setScenePrompts] = useState<GeneratedScenePrompt[]>([]);
  const [comicPages, setComicPages] = useState<ComicPagePrompt[]>([]);
  const [generated, setGenerated] = useState(false);

  const canGenerate = !!styleId && !!storyId;

  const handleGenerate = () => {
    const input: PromptBuildInput = {
      characterMode,
      photoCount,
      characterTexts,
      styleId,
      customStyle,
      storyId,
      customScenes,
      aspectRatio: outputSettings.aspectRatio,
      bookTextMode: outputSettings.bookMode,
      maxScenes: outputSettings.maxScenes,
      extraContext: outputSettings.extraContext,
      language: outputSettings.language,
    };

    const scenes = buildPrompts(input);
    setScenePrompts(scenes);

    if (outputSettings.comicMode) {
      setComicPages(buildComicPrompts(input, outputSettings.comicsPerPage));
    } else {
      setComicPages([]);
    }

    setGenerated(true);
    setTimeout(() => {
      document.getElementById("output")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📖</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">동화책 프롬프트 생성기</h1>
            <p className="text-base text-gray-600">GPT Image 전용 · 아이 사진 또는 텍스트 묘사로 나만의 동화책을</p>
          </div>
        </div>

        <div className="bg-white/70 border border-purple-200 rounded-xl p-4 mb-6 text-base text-gray-700 leading-relaxed">
          <p className="font-semibold text-purple-800 mb-1.5">💡 이 도구의 활용법</p>
          <p>
            <span className="font-semibold text-purple-700">"어떤 스타일로 할지, 어떤 주제로 시작할지" 막막할 때</span> 활용해보세요.
            좀 더 나만의 맞춤형 동화를 만들고 싶다면, 영상에서 말씀드린 대로, 이 도구에서 스타일과 주제를 참조해서 ChatGPT와 직접
            기획해보세요.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1단계 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <CharacterInput
              mode={characterMode}
              photoCount={photoCount}
              characterTexts={characterTexts}
              onModeChange={setCharacterMode}
              onPhotoCountChange={setPhotoCount}
              onCharacterTextsChange={setCharacterTexts}
            />
          </section>

          {/* 2단계 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <StyleSelector
              selectedId={styleId}
              customStyle={customStyle}
              onSelectId={setStyleId}
              onCustomChange={setCustomStyle}
            />
          </section>

          {/* 3단계 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <StorySelector
              selectedId={storyId}
              customScenes={customScenes}
              onSelectId={setStoryId}
              onCustomChange={setCustomScenes}
            />
          </section>

          {/* 4단계 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <OutputOptions settings={outputSettings} onChange={setOutputSettings} />
          </section>

          {/* 생성 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all
                ${canGenerate
                  ? "bg-purple-600 hover:bg-purple-700 hover:shadow-xl active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              ✨ 프롬프트 생성하기
            </button>
          </div>

          {/* 결과 출력 */}
          {generated && scenePrompts.length > 0 && (
            <section id="output" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <PromptOutput
                scenePrompts={scenePrompts}
                comicPages={comicPages}
                bookMode={outputSettings.bookMode}
                comicMode={outputSettings.comicMode}
                language={outputSettings.language}
              />
            </section>
          )}

          {generated && scenePrompts.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-8">
              생성된 프롬프트가 없습니다. 커스텀 스토리 내용을 입력해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
