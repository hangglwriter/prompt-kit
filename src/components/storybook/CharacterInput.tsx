import { useRef, useState } from "react";
import { type CharacterMode } from "../../lib/storybook/prompt-builder";

interface Props {
  mode: CharacterMode;
  photoCount: number;
  characterTexts: string[];
  onModeChange: (mode: CharacterMode) => void;
  onPhotoCountChange: (count: number) => void;
  onCharacterTextsChange: (texts: string[]) => void;
}

export default function CharacterInput({
  mode,
  photoCount,
  characterTexts,
  onModeChange,
  onPhotoCountChange,
  onCharacterTextsChange,
}: Props) {
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFile = (index: number, file: File) => {
    const url = URL.createObjectURL(file);
    const next = [...previews];
    next[index] = url;
    setPreviews(next);
    onPhotoCountChange(next.filter(Boolean).length);
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(index, file);
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(index, file);
  };

  const handleRemove = (index: number) => {
    const next = [...previews];
    next[index] = null;
    setPreviews(next);
    if (inputRefs[index].current) inputRefs[index].current!.value = "";
    onPhotoCountChange(next.filter(Boolean).length);
  };

  const handleTextChange = (index: number, value: string) => {
    const next = [...characterTexts];
    next[index] = value;
    onCharacterTextsChange(next);
  };

  const slots = [
    { label: "주인공", placeholder: "예: 8살 단발머리 한국 여자아이, 노란 원피스" },
    { label: "등장인물 2 (선택)", placeholder: "예: 같은 또래 남자아이, 파란 티셔츠와 청바지" },
    { label: "등장인물 3 (선택)", placeholder: "예: 작은 흰 강아지 친구" },
  ];

  const photoSlots = [
    { label: "사진 1", sublabel: "주인공" },
    { label: "사진 2", sublabel: "등장인물 2 (선택)" },
    { label: "사진 3", sublabel: "등장인물 3 (선택)" },
  ];

  const filledTexts = characterTexts.filter((t) => t?.trim()).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">1단계</span>
        <h2 className="text-lg font-semibold text-gray-800">등장인물 설정</h2>
        <span className="text-xs text-gray-400">선택 사항</span>
      </div>
      <p className="text-base text-gray-600 leading-relaxed">
        사진은 ChatGPT에 직접 첨부해도 돼요. 여기서는 미리 카운트만 잡거나, 텍스트로 묘사하면 프롬프트에 자동 반영됩니다.
      </p>

      <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1 my-3">
        <button
          onClick={() => onModeChange("photo")}
          className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
            mode === "photo" ? "bg-white shadow-sm font-semibold text-purple-700" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📷 사진으로
        </button>
        <button
          onClick={() => onModeChange("text")}
          className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
            mode === "text" ? "bg-white shadow-sm font-semibold text-purple-700" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          ✏️ 텍스트로 묘사
        </button>
      </div>

      {mode === "photo" ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            {photoSlots.map((slot, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div
                  className={`relative border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer transition-all
                    ${previews[i] ? "border-purple-400 bg-purple-50" : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"}`}
                  onDrop={(e) => handleDrop(i, e)}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => !previews[i] && inputRefs[i].current?.click()}
                >
                  {previews[i] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previews[i]!} alt={slot.label} className="w-full h-full object-cover rounded-xl" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(i);
                        }}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 transition-colors"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <div className="text-center px-2">
                      <div className="text-2xl mb-1">📷</div>
                      <div className="text-sm text-gray-500">클릭 또는 드래그</div>
                    </div>
                  )}
                  <input
                    ref={inputRefs[i]}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleInputChange(i, e)}
                  />
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700">{slot.label}</span>
                  <span className="block text-xs text-gray-400">{slot.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            ※ 사진은 미리보기 용도예요. 실제 생성 시에는 ChatGPT 채팅창에 사진을 첨부해 주세요.
          </p>
          {photoCount > 0 && (
            <p className="text-sm text-purple-600 font-medium mt-1">
              ✓ {photoCount}명의 등장인물이 프롬프트에 반영됩니다.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="space-y-2">
            {slots.map((slot, i) => (
              <div key={i}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{slot.label}</label>
                <input
                  type="text"
                  value={characterTexts[i] || ""}
                  onChange={(e) => handleTextChange(i, e.target.value)}
                  placeholder={slot.placeholder}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            ))}
          </div>
          {filledTexts > 0 && (
            <p className="text-sm text-purple-600 font-medium mt-1">
              ✓ {filledTexts}명의 등장인물 묘사가 프롬프트에 반영됩니다.
            </p>
          )}
        </>
      )}
    </div>
  );
}
