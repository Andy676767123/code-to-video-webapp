"use client";

import { ArrowRight, Camera, Clapperboard, Compass, Flame, Heart, MessageSquare, Play, Sparkles, TrendingUp, UserRound, Video } from "lucide-react";

const videos = [
  {
    id: 1,
    creator: "Mila Chen",
    title: "Neo city product launch",
    duration: "00:18",
    views: "2.4M",
    likes: "184K",
    comments: 4300,
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    glow: "shadow-fuchsia-500/30",
    tags: ["AI","Launch","Product"],
  },
  {
    id: 2,
    creator: "Theo Ramos",
    title: "Future kitchen workflow",
    duration: "00:22",
    views: "1.9M",
    likes: "156K",
    comments: 2700,
    accent: "from-cyan-500 via-blue-500 to-indigo-600",
    glow: "shadow-cyan-500/30",
    tags: ["Design","Workflow","Demo"],
  },
  {
    id: 3,
    creator: "Ava Brooks",
    title: "Travel teaser in 10 sec",
    duration: "00:12",
    views: "3.1M",
    likes: "220K",
    comments: 5200,
    accent: "from-emerald-500 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/30",
    tags: ["Travel","Cinematic","Promo"],
  },
];

const creators = [
  { name: "Lena Park", followers: "680K", badge: "Top Creator" },
  { name: "Jude Moss", followers: "540K", badge: "Growth" },
  { name: "Nia Ortiz", followers: "420K", badge: "Trending" },
];

const trends = ["AI lifestyle", "Creator tools", "Brand story", "Startup clips", "Product videos", "Cinematic ads"];

const stats = [
  { label: "Videos generated", value: "1.2M" },
  { label: "Creators active", value: "184K" },
  { label: "Avg. watch time", value: "32s" },
];

export default function FlowShort() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8">
        <header className="sticky top-0 z-20 mb-8 rounded-full border border-slate-800/80 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 font-black text-white shadow-lg shadow-fuchsia-500/30">
                F
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">FlowShort</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI video studio</div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#discover" className="transition hover:text-white">Discover</a>
              <a href="#studio" className="transition hover:text-white">Studio</a>
              <a href="#creators" className="transition hover:text-white">Creators</a>
            </nav>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-500">
                Sign in
              </button>
              <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                Start creating
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
            <div className="rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl shadow-violet-500/10 md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                Viral AI clips
              </div>

              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Turn ideas into scroll-stopping short videos.
              </h1>

              <p className="mt-4 max-w-lg text-base text-slate-300 md:text-lg">
                Write a prompt, choose a visual style, and create polished short-form videos for product launches, stories, tutorials, and creator content.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400">
                  Create a clip <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500">
                  <Play className="h-4 w-4" />
                  Watch demo
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="studio" className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-500/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Studio</div>
                  <h2 className="mt-2 text-2xl font-bold text-white">Create clip</h2>
                </div>
                <div className="rounded-full border border-slate-700 bg-slate-950 p-2 text-cyan-300">
                  <Video className="h-4 w-4" />
                </div>
              </div>

              <label className="mb-2 block text-sm text-slate-300">Prompt</label>
              <textarea
                defaultValue={"A luxury product reveal in a neon-lit studio, fast cuts, cinematic lighting, smooth transitions, confident voiceover."}
                className="h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Style</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none">
                    <option>Cinematic</option>
                    <option>Minimal</option>
                    <option>Bold</option>
                    <option>Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Length</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none">
                    <option>15 sec</option>
                    <option>20 sec</option>
                    <option>30 sec</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Camera className="h-4 w-4 text-violet-300" />
                    AI preview
                  </div>
                  <div className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                    Ready
                  </div>
                </div>

                <div className="h-36 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 p-4 shadow-2xl shadow-violet-500/30">
                  <div className="flex h-full items-end justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-white/80">Concept</div>
                      <div className="mt-2 text-xl font-black text-white">Launch film</div>
                    </div>
                    <div className="rounded-full border border-white/30 bg-white/10 px-2 py-1 text-xs text-white">
                      15s
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Generate video <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section id="discover" className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">For you</div>
                  <h2 className="mt-2 text-3xl font-black text-white">Trending clips</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300">
                  <TrendingUp className="h-4 w-4 text-emerald-300" />
                  Live trends
                </div>
              </div>

              <div className="space-y-5">
                {videos.map((video) => (
                  <div key={video.id} className={`rounded-[28px] border border-slate-800 bg-slate-900/80 p-4 shadow-xl ${video.glow}`}>
                    <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-600 font-semibold text-white">
                          {video.creator.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{video.creator}</div>
                          <div className="text-xs text-slate-400">@{video.creator.toLowerCase().replace(/\s+/g, "")}</div>
                        </div>
                      </div>

                      <button className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-slate-300">
                        Follow
                      </button>
                    </div>

                    <div className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${video.accent} p-4`}>
                      <div className="flex h-52 items-end justify-between rounded-[18px] border border-white/15 bg-slate-950/10 p-4 backdrop-blur-sm">
                        <div>
                          <div className="text-xs uppercase tracking-[0.25em] text-white/80">{video.duration}</div>
                          <div className="mt-3 text-2xl font-black text-white">{video.title}</div>
                        </div>
                        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/25">
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {video.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-pink-400" /> {video.likes}</div>
                        <div className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4 text-sky-400" /> {video.comments.toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400"><Flame className="h-4 w-4 text-orange-400" /> {video.views} views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside id="creators" className="space-y-6">
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Trending topics</h3>
                  <Compass className="h-4 w-4 text-violet-300" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {trends.map((topic) => (
                    <span key={topic} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Top creators</h3>
                  <UserRound className="h-4 w-4 text-cyan-300" />
                </div>

                <div className="space-y-3">
                  {creators.map((creator) => (
                    <div key={creator.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 font-semibold text-white">
                          {creator.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{creator.name}</div>
                          <div className="text-xs text-slate-400">{creator.followers}</div>
                        </div>
                      </div>

                      <div className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-300">
                        {creator.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/10 p-5">
                <div className="mb-3 flex items-center gap-2 text-violet-200">
                  <Clapperboard className="h-4 w-4" />
                  Creator tools
                </div>
                <h3 className="text-2xl font-black text-white">Go from prompt to publish in minutes.</h3>
                <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-200">
                  Launch studio <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
