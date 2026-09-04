import { useState } from 'react';
import { Play, Eye, X, Maximize2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { Crosshair, Tag } from '../components/cards';
import { creativeItems } from '../data';
import { useI18n, type LStr } from '../i18n';
import type { CreativeItem } from '../types';

type FilterTab = 'all' | 'graphic' | 'photography' | 'motion';

export default function Creative() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedMedia, setSelectedMedia] = useState<CreativeItem | null>(null);

  const tabs: { id: FilterTab; label: LStr }[] = [
    { id: 'all', label: { id: 'Semua', en: 'All' } },
    { id: 'graphic', label: { id: 'Grafis & Poster', en: 'Graphic & Posters' } },
    { id: 'photography', label: { id: 'Fotografi', en: 'Photography' } },
    { id: 'motion', label: { id: 'Motion & Video', en: 'Motion & Video' } },
  ];

  const filteredItems =
    activeTab === 'all'
      ? creativeItems
      : creativeItems.filter((item) => item.category === activeTab);

  const getAspectClass = (aspect?: string) => {
    switch (aspect) {
      case 'poster':
        return 'aspect-[3/4]';
      case 'video-vertical':
        return 'aspect-[9/16]';
      case 'video-horizontal':
        return 'aspect-[16/9]';
      case 'photo':
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="creative" />

      {/* Filter Tabs */}
      <Reveal>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? 'bg-ink text-white'
                    : 'border border-line bg-card text-ink/70 hover:border-blue hover:text-ink'
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink/45">
            <span>
              {filteredItems.length} {t({ id: 'karya', en: 'works' })}
            </span>
            <Crosshair />
          </div>
        </div>
      </Reveal>

      {/* Media Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Reveal key={item.id}>
            <div className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-blue">
              {/* Thumbnail Container */}
              <div
                className={`relative w-full cursor-pointer overflow-hidden bg-ink/5 ${getAspectClass(
                  item.aspectRatio
                )}`}
                onClick={() => setSelectedMedia(item)}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-ink/70 px-2 py-1 backdrop-blur-sm">
                  {item.mediaType === 'video' ? (
                    <Play size={11} className="fill-white text-white" />
                  ) : (
                    <Eye size={11} className="text-white" />
                  )}
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                    {item.type}
                  </span>
                </div>

                {/* Quick Expand Button */}
                <div className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-md opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* Info Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue">
                      {item.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="heading-display mt-2 text-xl uppercase leading-tight tracking-tight text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-relaxed text-ink/65 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1 border-t border-line/60 pt-3">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Media Inspection Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue">
                  {selectedMedia.type} • {selectedMedia.date}
                </span>
                <h2 className="heading-display text-lg uppercase tracking-tight text-ink sm:text-xl">
                  {selectedMedia.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content / Player */}
            <div className="flex flex-1 items-center justify-center overflow-auto bg-ink/5 p-4">
              {selectedMedia.mediaType === 'video' && selectedMedia.mediaUrl ? (
                <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-black">
                  <video
                    src={selectedMedia.mediaUrl}
                    controls
                    autoPlay
                    className="max-h-[65vh] w-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={selectedMedia.mediaUrl || selectedMedia.thumbnailUrl}
                  alt={selectedMedia.title}
                  className="max-h-[65vh] max-w-full rounded-lg object-contain shadow-md"
                />
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="flex flex-col justify-between gap-3 border-t border-line bg-bg/50 px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-xs leading-relaxed text-ink/70">
                {selectedMedia.description}
              </p>
              <div className="flex shrink-0 flex-wrap gap-1">
                {selectedMedia.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
