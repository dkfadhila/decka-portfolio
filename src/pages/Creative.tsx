import { useState } from 'react';
import { X, Play } from 'lucide-react';
import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { CardArrow, Tag, MetaNum } from '../components/cards';
import { creativeItems } from '../data';
import { useI18n, type LStr } from '../i18n';
import type { CreativeItem } from '../types';

const spans = [
  'col-span-12 lg:col-span-7',
  'col-span-12 lg:col-span-5',
  'col-span-12 lg:col-span-5',
  'col-span-12 lg:col-span-7',
];

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

  const ui = {
    piece: { id: 'Karya 0', en: 'Piece 0' },
    year: { id: 'Tahun', en: 'Year' },
    format: { id: 'Format', en: 'Format' },
    type: { id: 'Tipe', en: 'Type' },
  };

  const filteredItems =
    activeTab === 'all'
      ? creativeItems
      : creativeItems.filter((item) => item.category === activeTab);

  return (
    <section className="container-shell py-16 md:py-20">
      <PageHeader page="creative" />

      {/* Filter Tabs — matching subtle editorial style */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? 'bg-ink text-white'
                    : 'border border-line bg-card text-ink/70 hover:border-blue hover:text-ink'
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
            {filteredItems.length} {t({ id: 'entri', en: 'entries' })}
          </span>
        </div>
      </Reveal>

      {/* 12-column Bento Grid matching Work & Projects */}
      <div className="grid grid-cols-12 gap-4">
        {filteredItems.map((item, i) => (
          <Reveal key={item.id} className={spans[i % spans.length]}>
            <div
              onClick={() => setSelectedMedia(item)}
              className="card group flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:border-blue"
            >
              {/* Media Preview Box with grayscale hover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-ink/5">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="card-media h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />

                <span className="absolute left-4 top-4 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                  {t(ui.piece)}{i + 1}
                </span>

                {item.mediaType === 'video' && (
                  <span className="absolute right-4 bottom-4 flex items-center gap-1 rounded-md border border-line bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                    <Play size={10} className="fill-white" />
                    Video
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <MetaNum num={item.type} />
                    <h3 className="heading-display mt-2 text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <CardArrow size={20} />
                </div>

                <p className="mt-3 text-sm font-medium leading-6 text-ink/65">
                  {item.description}
                </p>

                {/* Technical metadata table matching Projects */}
                <dl className="mt-5 border-t border-line pt-4">
                  {[
                    { k: t(ui.year), v: item.date },
                    { k: t(ui.format), v: item.mediaType.toUpperCase() },
                    { k: t(ui.type), v: item.category.toUpperCase() },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between py-1.5 last:pb-0"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                        {row.k}
                      </dt>
                      <dd className="font-mono text-[11px] uppercase tracking-wide text-ink/75">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox / Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <MetaNum num={selectedMedia.type} />
                <h2 className="heading-display mt-1 text-xl uppercase tracking-tight sm:text-2xl">
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

            {/* Modal Media */}
            <div className="flex flex-1 items-center justify-center overflow-auto bg-ink/5 p-4 sm:p-6">
              {selectedMedia.mediaType === 'video' && selectedMedia.mediaUrl ? (
                <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-black">
                  <video
                    src={selectedMedia.mediaUrl}
                    controls
                    autoPlay
                    className="max-h-[60vh] w-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={selectedMedia.mediaUrl || selectedMedia.thumbnailUrl}
                  alt={selectedMedia.title}
                  className="max-h-[60vh] max-w-full rounded-lg object-contain shadow-md"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col justify-between gap-3 border-t border-line bg-bg/50 px-6 py-4 sm:flex-row sm:items-center">
              <p className="max-w-xl text-xs font-medium leading-relaxed text-ink/70">
                {selectedMedia.description}
              </p>
              <div className="flex shrink-0 flex-wrap gap-1.5">
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
