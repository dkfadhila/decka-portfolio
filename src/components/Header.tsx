import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { nav, profile, heroMeta } from '../data';

function Monogram() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue/60 bg-blue-soft">
      <span className="heading-display text-base leading-none text-ink">T</span>
    </span>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the fullscreen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* ================= DESKTOP — floating segmented nav ================= */}
      <header className="sticky top-3 z-50 hidden px-5 sm:px-8 md:block">
        <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-3 rounded-2xl border border-line bg-bg/80 py-2 pl-3 pr-2 backdrop-blur-md">
          {/* LEFT — identity */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <Monogram />
            <span className="flex flex-col leading-none">
              <span className="heading-display flex items-center gap-1.5 text-sm uppercase tracking-tight">
                {profile.name}
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
                Portfolio
              </span>
            </span>
          </Link>

          {/* CENTER — navigation cluster */}
          <nav className="hide-scrollbar flex items-center gap-1 overflow-x-auto">
            {nav.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-tab ${isActive ? 'nav-tab-active' : ''} flex shrink-0 items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wide`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="font-mono text-[9px] font-medium text-blue">
                        {item.num}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT — utility / explore */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              Portfolio / {heroMeta.year}
            </span>
            <Link
              to="/contact"
              aria-label="Contact"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-blue hover:text-blue"
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE — compact top nav ================= */}
      <header className="sticky top-3 z-50 px-5 sm:px-8 md:hidden">
        <div className="mx-auto flex max-w-[80rem] items-center justify-between rounded-2xl border border-line bg-bg/80 py-2 pl-3 pr-2 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2.5">
            <Monogram />
            <span className="heading-display text-sm uppercase tracking-tight">
              {profile.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-line px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors hover:border-blue hover:bg-blue-soft"
          >
            {open ? 'Close ×' : 'Menu +'}
          </button>
        </div>
      </header>

      {/* ================= MOBILE — fullscreen editorial menu ================= */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-bg pt-24 md:hidden">
          <nav className="container-shell flex-1 overflow-y-auto">
            {nav.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group flex items-baseline gap-4 border-b border-line py-5 ${
                    isActive ? 'text-ink' : 'text-ink/70'
                  }`
                }
              >
                <span className="font-mono text-xs text-blue">{item.num}</span>
                <span className="heading-display text-4xl uppercase leading-none tracking-tight">
                  {item.label}
                </span>
                <ArrowUpRight
                  size={22}
                  className="ml-auto self-center text-ink/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue"
                />
              </NavLink>
            ))}
          </nav>
          <div className="container-shell flex items-center justify-between border-t border-line py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              Portfolio / {heroMeta.year}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue" />
              {heroMeta.availability}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
