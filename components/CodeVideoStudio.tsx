"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Download, Film, Palette, Play, Sparkles, Upload } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

const sampleCode = `import { useEffect, useState } from "react";

export function PaymentFlow() {
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const loadCart = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data.items);
    };

    loadCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    setStatus("processing");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    if (!response.ok) {
      setStatus("failed");
      return;
    }

    const result = await response.json();
    setStatus("success");
    console.log("Payment confirmed", result.id);
  };

  return (
    <section className="checkout-box">
      <h2>Cart Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="item-row">
          <span>{item.name}</span>
          <strong>\${item.price}</strong>
        </div>
      ))}

      <div className="summary-row">
        <span>Total</span>
        <strong>\${total}</strong>
      </div>

      <button onClick={handleCheckout} disabled={status === "processing"}>
        {status === "processing" ? "Processing..." : "Checkout"}
      </button>
    </section>
  );
}`;

type Scene = {
  id: number;
  title: string;
  lines: string[];
};

const themeOptions = [
  { value: "midnight", label: "Midnight", accent: "#7dd3fc" },
  { value: "violet", label: "Violet Glow", accent: "#a78bfa" },
  { value: "sunset", label: "Sunset", accent: "#fbbf24" },
  { value: "emerald", label: "Emerald", accent: "#34d399" },
];

const getLanguageFromCode = (code: string) => {
  if (code.includes("def ") || code.includes("print(")) return "python";
  if (code.includes("<html") || code.includes("<div")) return "markup";
  if (code.includes("const ") || code.includes("useState")) return "javascript";
  if (code.includes(": string") || code.includes("interface ")) return "typescript";
  if (code.includes("{\n  \"")) return "json";
  return "javascript";
};

const buildScenes = (code: string, sceneCount: number): Scene[] => {
  const rawLines = code.split(/\n/);
  const safeLines = rawLines.length > 0 ? rawLines : ["console.log('No code provided')"];
  const perScene = Math.max(4, Math.ceil(safeLines.length / Math.max(1, sceneCount)));

  const scenes: Scene[] = [];
  for (let index = 0; index < safeLines.length; index += perScene) {
    const chunk = safeLines.slice(index, index + perScene);
    scenes.push({
      id: scenes.length,
      title: `Scene ${scenes.length + 1}`,
      lines: chunk,
    });
  }

  return scenes.length ? scenes : [{ id: 0, title: "Scene 1", lines: ["console.log('Ready')"] }];
};

const highlightCode = (code: string, language: string) => {
  const grammar = Prism.languages[language] || Prism.languages.javascript;
  return Prism.highlight(code, grammar, language);
};

export default function CodeVideoStudio() {
  const [code, setCode] = useState(sampleCode);
  const [sceneCount, setSceneCount] = useState(5);
  const [title, setTitle] = useState("Feature walkthrough");
  const [theme, setTheme] = useState("midnight");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("Ready to create a short code reel.");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const language = useMemo(() => getLanguageFromCode(code), [code]);

  const scenes = useMemo(() => buildScenes(code, sceneCount), [code, sceneCount]);
  const selectedScene = scenes[Math.min(sceneIndex, scenes.length - 1)] ?? scenes[0];
  const activeTheme = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];

  useEffect(() => {
    setSceneIndex(0);
  }, [code, sceneCount]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setCode(text);
    setStatus(`${file.name} loaded and ready.`);
  };

  const handleGenerateVideo = () => {
    const previewElement = previewRef.current as (HTMLDivElement & {
      captureStream?: (frameRate?: number) => MediaStream;
    }) | null;

    if (!previewElement) {
      setStatus("Preview is not ready yet. Try again.");
      return;
    }

    const stream = previewElement.captureStream?.(30) ?? null;
    if (!stream) {
      setStatus("This browser does not support in-page video recording.");
      return;
    }

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
        ? "video/webm;codecs=vp8"
        : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      const nextUrl = URL.createObjectURL(blob);
      setVideoUrl(nextUrl);
      setIsGenerating(false);
      setStatus(`Video ready. ${scenes.length} scenes captured.`);
      stream.getTracks().forEach((track) => track.stop());
    };

    setIsGenerating(true);
    setStatus("Recording your code reel...");
    setSceneIndex(0);

    const renderDuration = Math.max(4200, scenes.length * 1100);
    const stepDuration = Math.max(700, renderDuration / scenes.length);

    const interval = window.setInterval(() => {
      setSceneIndex((previous) => (previous + 1) % scenes.length);
    }, stepDuration);

    recorder.start();

    window.setTimeout(() => {
      window.clearInterval(interval);
      recorder.stop();
    }, renderDuration);
  };

  const highlightedCode = highlightCode(selectedScene.lines.join("\n"), language);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-300">
            <Film className="h-3.5 w-3.5" />
            Code Video Studio
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Turn code into short cinematic explainers
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 shadow-glow">
          <Sparkles className="h-4 w-4 text-violet-300" />
          Optimized for 10–60 second code reels
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Project title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              placeholder="Feature walkthrough"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Code input</label>
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="h-[360px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-3 font-mono text-xs text-slate-100 outline-none transition focus:border-sky-500"
              spellCheck={false}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Scenes</label>
              <input
                type="range"
                min={2}
                max={8}
                value={sceneCount}
                onChange={(event) => setSceneCount(Number(event.target.value))}
                className="w-full accent-sky-400"
              />
              <div className="mt-2 text-sm text-slate-400">{sceneCount} scenes</div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Theme</label>
              <div className="flex gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={`h-9 w-9 rounded-full border-2 ${theme === option.value ? "border-white" : "border-slate-700"}`}
                    style={{ background: option.accent }}
                    aria-label={option.label}
                    title={option.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 transition hover:border-sky-500">
              <Upload className="h-4 w-4" />
              Upload file
              <input type="file" className="hidden" accept=".js,.jsx,.ts,.tsx,.py,.css,.json,.md,.sql,.java,.go,.rs" onChange={handleFileUpload} />
            </label>

            <button
              type="button"
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-950" /> : <Play className="h-4 w-4" />}
              {isGenerating ? "Rendering..." : "Generate video"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-300">
            {status}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Preview</div>
                <div className="mt-2 text-2xl font-semibold text-white">{title || "Untitled walkthrough"}</div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300">
                <Palette className="h-3.5 w-3.5 text-sky-300" />
                {activeTheme.label}
              </div>
            </div>

            <div
              ref={previewRef}
              className="relative overflow-hidden rounded-[24px] border border-slate-700"
              style={{
                background: `radial-gradient(circle at top left, ${activeTheme.accent}44, transparent 30%), linear-gradient(135deg, #020817 0%, #111827 100%)`,
                boxShadow: `0 0 50px ${activeTheme.accent}22`,
              }}
            >
              <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-950/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 flex-1 rounded-full bg-slate-800/80 px-3 py-1 text-left text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {language}.code
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Scene</div>
                    <div className="text-sm font-medium text-white">{selectedScene.title}</div>
                  </div>
                  <div className="rounded-full border border-slate-700 bg-slate-950/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-300">
                    {sceneIndex + 1}/{scenes.length}
                  </div>
                </div>

                <pre className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-[12px] leading-6 text-slate-100 shadow-inner">
                  <code
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Video output</h2>
              {videoUrl ? (
                <a
                  href={videoUrl}
                  download="code-video.webm"
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              ) : null}
            </div>

            {videoUrl ? (
              <video src={videoUrl} controls className="w-full rounded-2xl border border-slate-700 bg-black" />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-10 text-center text-slate-400">
                Generate a short code reel to preview the exported video here.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
