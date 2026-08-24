"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, LayoutGrid, Minus, Plus, Search, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import {
  atlasNodes,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  domains,
  findDomain,
  nodesInDomain,
  pathwaysForDomain,
  resourcesForDomain,
} from "@/content/atlas";
import type { AtlasNode, NodeCategory } from "@/types/atlas";
import { NodeCards } from "./NodeCards";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as NodeCategory[];

/**
 * The explorer.
 *
 * One piece of client state — the selected field, the query, the category
 * filter and the view — drives the graph, the detail panel, the pathways
 * and the cards together. Selecting a node in the graph updates everything
 * to its right; the filters narrow what the graph will draw.
 *
 * The graph is SVG rather than canvas so every node stays a real, focusable
 * link: keyboard users can tab the map, and its labels are readable text.
 */
export function Explorer() {
  const [domainId, setDomainId] = useState<string>("relationships");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NodeCategory | "all">("all");
  const [view, setView] = useState<"map" | "list">("map");
  const [zoom, setZoom] = useState(1);

  const domain = findDomain(domainId)!;

  const satellites = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nodesInDomain(domainId)
      .filter((n) => category === "all" || n.category === category)
      .filter((n) => !q || n.title.toLowerCase().includes(q) || n.note?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [domainId, category, query]);

  /** A global search jumps fields rather than returning nothing. */
  const globalMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return atlasNodes.filter((n) => n.title.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="relative bg-parchment pt-10 pb-16 grain-paper"
    >
      <Container className="relative z-1">
        {/* --- The bar ------------------------------------------------- */}
        <div className="flex flex-col gap-5 pb-8 lg:flex-row lg:items-center lg:justify-between">
          {/* A real h2: the panel below carries h3s, and they need a parent
              in the outline. */}
          <h2
            id="explore-heading"
            className="font-sans text-(length:--text-eyebrow) font-normal tracking-[0.2em] text-ink-muted uppercase"
          >
            Explore the Atlas
          </h2>

          <div className="flex flex-1 flex-wrap items-center gap-4 lg:justify-end">
            <label className="relative min-w-[15rem] flex-1 lg:max-w-xs">
              <span className="sr-only">Search the Atlas</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything in the atlas…"
                className="w-full rounded-full border border-hairline-ink bg-parchment-deep/40 py-2.5 pr-10 pl-5 text-(length:--text-small) text-ink-text placeholder:text-ink-muted/70 focus:border-gold-deep focus:outline-none"
              />
              <Search
                aria-hidden
                className="absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-ink-muted uppercase">
                Browse by
              </span>
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                All
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {CATEGORY_LABELS[c]}
                </Chip>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-ink-muted uppercase">
                View
              </span>
              <ViewToggle active={view === "map"} onClick={() => setView("map")} label="Map view">
                <Target aria-hidden className="size-4" />
              </ViewToggle>
              <ViewToggle active={view === "list"} onClick={() => setView("list")} label="List view">
                <LayoutGrid aria-hidden className="size-4" />
              </ViewToggle>
            </div>
          </div>
        </div>

        {/* --- The panel ----------------------------------------------- */}
        <div className="overflow-hidden rounded-[4px] bg-void grain-film">
          <div className="relative z-1 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            {view === "map" ? (
              <MapPane
                domainId={domainId}
                satellites={satellites}
                zoom={zoom}
                onZoom={setZoom}
                onSelect={setDomainId}
              />
            ) : (
              <ListPane
                satellites={satellites}
                globalMatches={globalMatches}
                query={query}
                onSelect={setDomainId}
              />
            )}

            <DetailPane domainId={domainId} satellites={satellites} />
          </div>

          <NodeCards resources={resourcesForDomain(domainId)} domainLabel={domain.label} />
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- panes */

function MapPane({
  domainId,
  satellites,
  zoom,
  onZoom,
  onSelect,
}: {
  domainId: string;
  satellites: AtlasNode[];
  zoom: number;
  onZoom: (z: number) => void;
  onSelect: (id: string) => void;
}) {
  const domain = findDomain(domainId)!;
  const radius = 34;

  const at = (i: number, total: number) => {
    const rad = ((i / Math.max(total, 1)) * 360 - 90) * (Math.PI / 180);
    return { x: 50 + Math.cos(rad) * radius, y: 50 + Math.sin(rad) * radius };
  };

  return (
    <div className="relative border-b border-hairline p-6 lg:border-r lg:border-b-0 lg:p-8">
      <p className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
        The map
      </p>
      <p className="mt-2 max-w-[14rem] text-(length:--text-small) text-ivory-faint">
        Click any node to explore its connections.
      </p>

      {/* Zoom controls, pinned to the pane's top-right so they never sit on
          top of the caption. */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-1 lg:top-8 lg:right-8">
        <ZoomButton label="Zoom in" onClick={() => onZoom(Math.min(zoom + 0.15, 1.6))}>
          <Plus aria-hidden className="size-3.5" />
        </ZoomButton>
        <ZoomButton label="Zoom out" onClick={() => onZoom(Math.max(zoom - 0.15, 0.7))}>
          <Minus aria-hidden className="size-3.5" />
        </ZoomButton>
        <ZoomButton label="Reset view" onClick={() => onZoom(1)}>
          <Target aria-hidden className="size-3.5" />
        </ZoomButton>
      </div>

      <div
        className="relative mx-auto mt-6 aspect-square w-full max-w-[27rem] transition-transform duration-500 ease-(--ease-out-quint)"
        style={{ scale: zoom }}
      >
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <g stroke="#c79a4e" strokeWidth="0.2" opacity="0.4">
            {satellites.map((_, i) => {
              const p = at(i, satellites.length);
              return <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} />;
            })}
          </g>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#c79a4e" strokeWidth="0.15" opacity="0.18" />
        </svg>

        {/* Centre: the selected field. */}
        <div className="absolute top-1/2 left-1/2 z-10 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50 bg-gold/10 p-4 text-center backdrop-blur-[2px]">
          <p className="font-display text-[0.8125rem] leading-tight text-gold-bright uppercase">
            {domain.label}
          </p>
          <p className="mt-1 text-[0.5rem] leading-tight text-ivory-faint">
            {domain.terms.join(" · ")}
          </p>
        </div>

        <ul className="absolute inset-0">
          {satellites.map((node, i) => {
            const p = at(i, satellites.length);
            return (
              <li
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <Link
                  href={node.href ?? "#explore"}
                  className="grid size-[4.5rem] place-items-center rounded-full border bg-void/80 px-2 text-center text-[0.5625rem] leading-tight text-ivory transition-transform duration-400 ease-(--ease-out-quint) hover:-translate-y-0.5 hover:text-gold-bright"
                  style={{ borderColor: `${CATEGORY_COLORS[node.category]}88` }}
                >
                  {node.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Legend, and the field switcher. */}
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
        {CATEGORIES.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[0.6875rem] text-ivory-faint">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[c] }}
            />
            {CATEGORY_LABELS[c]}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
        {domains.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelect(d.id)}
            aria-pressed={d.id === domainId}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[0.6875rem] transition-colors duration-300",
              d.id === domainId
                ? "border-gold bg-gold/12 text-gold-bright"
                : "border-hairline text-ivory-muted hover:border-gold/60 hover:text-ivory",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListPane({
  satellites,
  globalMatches,
  query,
  onSelect,
}: {
  satellites: AtlasNode[];
  globalMatches: AtlasNode[];
  query: string;
  onSelect: (id: string) => void;
}) {
  const rows = query.trim() ? globalMatches : satellites;

  return (
    <div className="border-b border-hairline p-6 lg:border-r lg:border-b-0 lg:p-8">
      <p className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
        {query.trim() ? `Results for “${query.trim()}”` : "Nodes in this field"}
      </p>

      {rows.length === 0 ? (
        <p className="mt-6 text-(length:--text-small) text-ivory-faint">
          Nothing here yet. Try another field, or clear the filters.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
          {rows.map((node) => (
            <li key={node.id}>
              <Link
                href={node.href ?? "#explore"}
                className="group flex items-start gap-4 py-4 transition-colors duration-400 hover:bg-gold/4"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[node.category] }}
                />
                <span className="min-w-0">
                  <span className="block font-display text-(length:--text-heading) text-ivory transition-colors group-hover:text-gold-bright">
                    {node.title}
                  </span>
                  {node.note ? (
                    <span className="mt-1 block text-(length:--text-small) leading-relaxed text-ivory-faint">
                      {node.note}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {domains.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelect(d.id)}
            className="rounded-full border border-hairline px-3 py-1.5 text-[0.6875rem] text-ivory-muted transition-colors duration-300 hover:border-gold/60 hover:text-ivory"
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailPane({ domainId, satellites }: { domainId: string; satellites: AtlasNode[] }) {
  const domain = findDomain(domainId)!;
  const routes = pathwaysForDomain(domainId);
  const total = nodesInDomain(domainId).length;

  return (
    <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:p-8">
      <div>
        <p className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
          Selected field
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="font-display text-(length:--text-display-s) text-ivory">{domain.label}</h3>
          <span className="flex shrink-0 items-center gap-2 rounded-[3px] border border-hairline px-3 py-1.5 text-[0.625rem] tracking-[0.14em] text-ivory-muted uppercase">
            <Bookmark aria-hidden className="size-3 text-gold" strokeWidth={1.5} />
            {total} nodes
          </span>
        </div>

        <p className="mt-4 leading-relaxed text-ivory-muted">{domain.description}</p>

        <p className="mt-8 font-sans text-(length:--text-eyebrow) tracking-[0.18em] text-gold uppercase">
          Key connections
        </p>
        <ul className="mt-4 space-y-2">
          {satellites.slice(0, 5).map((node) => (
            <li key={node.id}>
              <Link
                href={node.href ?? "#explore"}
                className="group flex items-center justify-between gap-4 rounded-[3px] border border-hairline px-4 py-2.5 transition-colors duration-400 hover:border-gold/60"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[node.category] }}
                  />
                  <span className="truncate text-(length:--text-small) text-ivory-muted transition-colors group-hover:text-ivory">
                    {node.title}
                  </span>
                </span>
                <span className="shrink-0 rounded-full border border-hairline px-2 py-0.5 text-[0.625rem] text-gold">
                  {node.domains.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-[3px] border border-hairline bg-ink-raised/60 p-5">
        <p className="font-sans text-(length:--text-eyebrow) tracking-[0.18em] text-gold uppercase">
          Pathways from here
        </p>
        <ul className="mt-4 divide-y divide-hairline">
          {routes.length === 0 ? (
            <li className="py-3 text-(length:--text-small) text-ivory-faint">
              Pathways for this field are being written.
            </li>
          ) : (
            routes.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className="group flex items-center justify-between gap-3 py-3 text-(length:--text-small) text-ivory-muted transition-colors duration-400 hover:text-gold-bright"
                >
                  {p.label}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-gold/60 transition-transform duration-400 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------- controls */

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[0.6875rem] transition-colors duration-300",
        active
          ? "border-ink-text bg-ink-text text-parchment"
          : "border-hairline-ink text-ink-muted hover:border-gold-deep hover:text-ink-text",
      )}
    >
      {children}
    </button>
  );
}

function ViewToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "grid size-8 place-items-center rounded-[3px] border transition-colors duration-300",
        active
          ? "border-ink-text bg-ink-text text-parchment"
          : "border-hairline-ink text-ink-muted hover:border-gold-deep",
      )}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function ZoomButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-7 place-items-center rounded-[3px] border border-hairline bg-void/70 text-ivory-muted transition-colors duration-300 hover:border-gold hover:text-gold"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
