import type { HTMLAttributes } from "react";
import {
  FiBriefcase,
  FiFileText,
  FiGlobe,
  FiGrid,
  FiHelpCircle,
  FiLink,
  FiMail,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { SiGithub, SiYoutube } from "react-icons/si";

const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 55.75;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  videoSrc?: string;
  showBrandScreen?: boolean;
  screenActionHref?: string;
  onScreenClose?: () => void;
}

const HOME_APPS = [
  { label: "About", icon: FiUser, href: "#about", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Work", icon: FiBriefcase, href: "#work-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Projects", icon: FiGrid, href: "#projects-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Website", icon: FiGlobe, href: "#website-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Quizken", icon: FiHelpCircle, href: "#quizken-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "E-Gov", icon: FiShield, href: "#egov-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Docs", icon: FiFileText, href: "#docs-section", tile: "bg-brand-white", tone: "text-brand-blue" },
  { label: "Connect", icon: FiLink, href: "#contact", tile: "bg-brand-white", tone: "text-brand-blue" },
] as const;

interface ScreenAppProps {
  app: (typeof HOME_APPS)[number];
  interactive: boolean;
  onNavigate?: () => void;
}

function ScreenApp({ app, interactive, onNavigate }: ScreenAppProps) {
  const Icon = app.icon;
  const content = (
    <>
      <span className={`flex aspect-square w-[13cqw] items-center justify-center overflow-hidden rounded-[3.2cqw] border-[0.45cqw] border-brand-blue/15 shadow-[0_1.1cqw_2.4cqw_rgba(10,36,99,0.16)] ${app.tile}`}>
        <Icon aria-hidden="true" className={`size-[7cqw] stroke-[2.2] ${app.tone}`} />
      </span>
      <span className="mt-[1.4cqw] block max-w-[18cqw] truncate text-center font-sans text-[3.1cqw] font-bold leading-none text-brand-blue">
        {app.label}
      </span>
    </>
  );

  if (!interactive) {
    return <div className="flex min-w-0 flex-col items-center">{content}</div>;
  }

  return (
    <a
      href={app.href}
      className="flex min-w-0 flex-col items-center rounded-[2cqw] focus-visible:outline-[0.8cqw] focus-visible:outline-offset-[1cqw] focus-visible:outline-brand-blue"
      onClick={app.href.startsWith("#") ? onNavigate : undefined}
    >
      {content}
    </a>
  );
}

export function Iphone({
  src,
  videoSrc,
  showBrandScreen = true,
  screenActionHref,
  onScreenClose,
  className,
  style,
  ...props
}: IphoneProps) {
  const hasVideo = Boolean(videoSrc);
  const hasMedia = hasVideo || Boolean(src);
  const hasScreen = hasMedia || showBrandScreen;
  const hasScreenControls = Boolean(screenActionHref || onScreenClose);

  return (
    <div
      className={`relative inline-block w-full align-middle leading-none ${className ?? ""}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        containerType: "inline-size",
        ...style,
      }}
      {...props}
    >
      {hasVideo ? (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          <video
            className="block size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      ) : null}

      {!hasVideo && src ? (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          {/* The component accepts arbitrary local or remote mockup media. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="block size-full object-cover object-top"
          />
        </div>
      ) : null}

      {!hasMedia && showBrandScreen ? (
        <div
          className={`${hasScreenControls ? "pointer-events-auto" : "pointer-events-none"} absolute z-0 overflow-hidden bg-brand-yellow text-brand-blue`}
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/front_cover.png"
            alt=""
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.13] mix-blend-multiply"
          />

          <div className="absolute left-[7%] right-[7%] top-[2.4%] flex items-center justify-between font-mono text-[4.8cqw] font-black leading-none">
            <span>{hasScreenControls ? "9:41" : "KQK"}</span>
            <div className="flex items-center gap-[1.8cqw]" aria-label="Full signal, Wi-Fi connected, battery 88 percent">
              <svg aria-hidden="true" viewBox="0 0 28 20" className="h-[4.1cqw] w-[5.9cqw] fill-current">
                <rect x="1" y="13" width="4" height="6" rx="1" />
                <rect x="8" y="9" width="4" height="10" rx="1" />
                <rect x="15" y="5" width="4" height="14" rx="1" />
                <rect x="22" y="1" width="4" height="18" rx="1" />
              </svg>
              <svg aria-hidden="true" viewBox="0 0 28 22" className="h-[4.3cqw] w-[5.7cqw] fill-none stroke-current stroke-[3]">
                <path d="M2 7.5C8.6 1.5 19.4 1.5 26 7.5" strokeLinecap="round" />
                <path d="M6.5 12C10.7 8.2 17.3 8.2 21.5 12" strokeLinecap="round" />
                <path d="M11 16.5C12.8 15 15.2 15 17 16.5" strokeLinecap="round" />
                <circle cx="14" cy="19.5" r="1.5" className="fill-current stroke-none" />
              </svg>
              <div className="relative h-[4cqw] w-[7cqw] rounded-[0.8cqw] border-[0.45cqw] border-current">
                <div className="absolute inset-y-[0.45cqw] left-[0.45cqw] w-[76%] rounded-[0.2cqw] bg-brand-blue" />
                <div className="absolute -right-[1.1cqw] top-[0.9cqw] h-[1.4cqw] w-[0.7cqw] rounded-r-sm bg-current opacity-70" />
              </div>
            </div>
          </div>

          {!hasScreenControls ? (
            <div className="absolute inset-0">
              <div className="absolute inset-x-[7%] top-[10%] text-center text-brand-blue">
                <p className="font-sans text-[4.2cqw] font-bold tracking-[-0.02em]">Friday, 22 July</p>
                <p className="mt-[1.5cqw] font-sans text-[22cqw] font-black leading-none tracking-[-0.08em]">09:41</p>
              </div>

              <div className="absolute inset-x-[9%] top-[36%] flex items-center gap-[3.5cqw] rounded-[5.5cqw] border-[0.55cqw] border-brand-white/60 bg-brand-white/55 p-[3.5cqw] text-left shadow-[0_2cqw_6cqw_rgba(10,36,99,0.16)] backdrop-blur-[2cqw]">
                <span className="flex size-[12cqw] shrink-0 items-center justify-center overflow-hidden rounded-[3.4cqw] bg-brand-white p-[1.5cqw]">
                  <FiBriefcase aria-hidden="true" className="size-[7cqw] stroke-[2.2] text-brand-blue" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[2.7cqw] font-black uppercase tracking-[0.14em] text-brand-blue/55">Portfolio</span>
                  <span className="mt-[1cqw] block font-sans text-[4.2cqw] font-black leading-[1.05] text-brand-blue">Available for new opportunities</span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-[8%] flex flex-col items-center text-center">
                <p className="font-mono text-[3cqw] font-black uppercase tracking-[0.2em] text-brand-blue/65">Tap to unlock</p>
                <span className="mt-[3cqw] h-[1.4cqw] w-[31cqw] rounded-full bg-brand-blue/80" />
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-x-[7%] top-[10%] grid h-[21%] grid-cols-[1.55fr_0.8fr] gap-[2.5cqw]">
                <div className="flex flex-col justify-between overflow-hidden rounded-[5.5cqw] bg-brand-blue p-[4.5cqw] text-brand-yellow shadow-[0_2cqw_5cqw_rgba(10,36,99,0.2)]">
                  <div className="flex items-center justify-between font-mono text-[3cqw] font-black uppercase tracking-[0.12em]">
                    <span>Available</span>
                    <span className="size-[2.4cqw] rounded-full bg-brand-white" />
                  </div>
                  <div>
                    <p className="font-sans text-[7.7cqw] font-black leading-[0.82] tracking-[-0.04em]">LET&apos;S</p>
                    <p className="font-sans text-[7.7cqw] font-black leading-[0.82] tracking-[-0.04em]">TALK</p>
                  </div>
                  <p className="font-mono text-[2.7cqw] font-bold uppercase tracking-[0.12em] text-brand-white/75">Nguyen Kim Quoc Khanh</p>
                </div>

                <div className="flex flex-col items-center justify-center rounded-[5.5cqw] border-[0.55cqw] border-brand-blue/15 bg-brand-white/85 text-center shadow-[0_2cqw_5cqw_rgba(10,36,99,0.14)] backdrop-blur-[1cqw]">
                  <span className="font-mono text-[3cqw] font-black uppercase tracking-[0.12em] text-brand-blue/55">Jul</span>
                  <span className="font-sans text-[12cqw] font-black leading-none tracking-[-0.08em] text-brand-blue">22</span>
                  <span className="mt-[1cqw] rounded-full bg-brand-yellow px-[2.5cqw] py-[1.2cqw] font-mono text-[2.5cqw] font-black uppercase tracking-[0.1em] text-brand-blue">Online</span>
                </div>
              </div>

              <div className="absolute inset-x-[7%] top-[35%] grid grid-cols-4 gap-x-[4cqw] gap-y-[5cqw]">
                {HOME_APPS.map((app) => (
                  <ScreenApp
                    key={app.label}
                    app={app}
                    interactive={hasScreenControls}
                    onNavigate={onScreenClose}
                  />
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-[21%] flex justify-center gap-[1.7cqw]" aria-hidden="true">
                <span className="size-[1.8cqw] rounded-full bg-brand-blue" />
                <span className="size-[1.8cqw] rounded-full bg-brand-blue/25" />
              </div>

              <div className="absolute inset-x-[6%] bottom-[5%] grid h-[13%] grid-cols-4 items-center gap-[2.5cqw] rounded-[7cqw] border-[0.5cqw] border-brand-white/60 bg-brand-white/55 px-[3.2cqw] shadow-[0_2.5cqw_6cqw_rgba(10,36,99,0.16)] backdrop-blur-[2cqw]">
                {screenActionHref && hasScreenControls ? (
                  <a
                    href={screenActionHref}
                    aria-label="Email me"
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white p-[1.5cqw] transition-transform hover:-translate-y-[1cqw] focus-visible:outline-[0.8cqw] focus-visible:outline-offset-[0.8cqw] focus-visible:outline-brand-blue"
                  >
                    <FiMail aria-hidden="true" className="size-[7cqw] stroke-[2.2] text-brand-blue" />
                  </a>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white p-[1.5cqw]">
                    <FiMail aria-hidden="true" className="size-[7cqw] stroke-[2.2] text-brand-blue" />
                  </div>
                )}

                {hasScreenControls ? (
                  <a
                    href="https://github.com/khanhnkq"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white p-[1.5cqw] transition-transform hover:-translate-y-[1cqw] focus-visible:outline-[0.8cqw] focus-visible:outline-offset-[0.8cqw] focus-visible:outline-brand-blue"
                  >
                    <SiGithub aria-hidden="true" className="size-[7cqw] text-brand-blue" />
                  </a>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white p-[1.5cqw]">
                    <SiGithub aria-hidden="true" className="size-[7cqw] text-brand-blue" />
                  </div>
                )}

                {hasScreenControls ? (
                  <a
                    href="https://www.youtube.com/@khanhnkq"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white transition-transform hover:-translate-y-[1cqw] focus-visible:outline-[0.8cqw] focus-visible:outline-offset-[0.8cqw] focus-visible:outline-brand-blue"
                  >
                    <SiYoutube aria-hidden="true" className="size-[7cqw] text-brand-blue" />
                  </a>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] bg-brand-white">
                    <SiYoutube aria-hidden="true" className="size-[7cqw] text-brand-blue" />
                  </div>
                )}

                {onScreenClose && hasScreenControls ? (
                  <button
                    type="button"
                    aria-label="Close contact phone"
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] border-[0.6cqw] border-brand-blue bg-brand-yellow p-[1.7cqw] transition-transform hover:-translate-y-[1cqw] focus-visible:outline-[0.8cqw] focus-visible:outline-offset-[0.8cqw] focus-visible:outline-brand-blue"
                    onClick={onScreenClose}
                  >
                    <FiX aria-hidden="true" className="size-[7cqw] stroke-[2.5] text-brand-blue" />
                  </button>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[3.5cqw] border-[0.6cqw] border-brand-blue bg-brand-yellow p-[1.7cqw]">
                    <FiX aria-hidden="true" className="size-[7cqw] stroke-[2.5] text-brand-blue" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 size-full"
        style={{ transform: "translateZ(0)" }}
      >
        <g mask={hasScreen ? "url(#screenPunch)" : undefined}>
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            className="fill-white dark:fill-[#262626]"
          />
        </g>

        <path
          opacity="0.5"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          mask={hasScreen ? "url(#screenPunch)" : undefined}
        />
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          className="fill-[#F5F5F5] dark:fill-[#262626]"
        />
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          className="fill-[#F5F5F5] dark:fill-[#262626]"
        />
        <path
          d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        <defs>
          <mask id="screenPunch" maskUnits="userSpaceOnUse">
            <rect width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  );
}
