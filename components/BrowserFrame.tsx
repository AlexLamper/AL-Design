import Image from "next/image";

type Props = {
  domain: string;
  shotUrl: string;
  alt: string;
};

/** A browser-window mockup that frames a live screenshot of a project. */
export default function BrowserFrame({ domain, shotUrl, alt }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-surface shadow-soft">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center text-xs text-ink-400 ring-1 ring-ink-200">
          {domain}
        </div>
      </div>
      {/* Screenshot - shown in full, never cropped */}
      <div className="w-full overflow-hidden bg-ink-100">
        <Image
          src={shotUrl}
          alt={alt}
          width={2840}
          height={1555}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="block h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
