"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import { Star, Eyebrow } from "@/components/ui/Elements";
import { brandStar } from "@/data/brand";

type Point = [number, number];
type Mark = {
  kind: "pen" | "star";
  color: string;
  size: number;
  points: Point[];
};
const palette = [
  { name: "Deep red", value: "#690000" },
  { name: "Electric pink", value: "#FF5896" },
  { name: "Butter yellow", value: "#FFDD50" },
  { name: "Ink black", value: "#0C0C0C" },
];
const STORAGE_KEY = "speckle-doodle-v1";
const LIMIT = 200;
const pathFor = (points: Point[]) =>
  points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

export default function Playground() {
  const paper = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState<"pen" | "star">("pen");
  const [color, setColor] = useState(palette[0].value);
  const [size, setSize] = useState(4);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [pending, setPending] = useState<Mark | null>(null);
  const stroke = useRef<Mark | null>(null);
  const pointer = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [cleared, setCleared] = useState<Mark[] | null>(null);
  const [message, setMessage] = useState("");
  const [keyboardPoint, setKeyboardPoint] = useState<Point>([500, 280]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && raw.length < 700000) {
        const saved: unknown = JSON.parse(raw);
        if (Array.isArray(saved)) {
          const valid = saved
            .slice(0, LIMIT)
            .filter(
              (m): m is Mark =>
                m &&
                (m.kind === "pen" || m.kind === "star") &&
                palette.some((c) => c.value === m.color) &&
                [4, 9].includes(m.size) &&
                Array.isArray(m.points) &&
                m.points.length > 0 &&
                m.points.length <= 1500 &&
                m.points.every(
                  (p: unknown) =>
                    Array.isArray(p) &&
                    p.length === 2 &&
                    p.every(
                      (n: unknown) =>
                        typeof n === "number" && Number.isFinite(n),
                    ) &&
                    p[0] >= 0 &&
                    p[0] <= 1000 &&
                    p[1] >= 0 &&
                    p[1] <= 560,
                ),
            );
          setMarks(valid);
        }
      }
    } catch {
      /* Drawing works even when browser storage is unavailable. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
    } catch {
      setMessage(
        "Your browser couldn’t keep this sketch. Use Save doodle to keep a copy.",
      );
    }
  }, [marks, ready]);

  function pointFrom(event: PointerEvent<SVGSVGElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return [
      Math.max(
        0,
        Math.min(1000, ((event.clientX - rect.left) / rect.width) * 1000),
      ),
      Math.max(
        0,
        Math.min(560, ((event.clientY - rect.top) / rect.height) * 560),
      ),
    ];
  }
  function add(mark: Mark) {
    if (marks.length >= LIMIT) {
      setMessage(
        "That’s a wonderfully busy page. Save it, then clear some room for more.",
      );
      return;
    }
    setMarks((previous) => [...previous, mark]);
    setCleared(null);
    setMessage("");
  }
  function start(event: PointerEvent<SVGSVGElement>) {
    if (
      !active ||
      !event.isPrimary ||
      event.button !== 0 ||
      pointer.current !== null
    )
      return;
    if (marks.length >= LIMIT) {
      setMessage("Save this page, then clear some room for more.");
      return;
    }
    event.preventDefault();
    setKeyboardVisible(false);
    const point = pointFrom(event);
    if (tool === "star") {
      add({ kind: "star", color, size, points: [point] });
      return;
    }
    pointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    stroke.current = { kind: "pen", color, size, points: [point] };
    setPending(stroke.current);
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    if (pointer.current !== event.pointerId || !stroke.current) return;
    const point = pointFrom(event);
    const last = stroke.current.points.at(-1)!;
    if (
      Math.hypot(point[0] - last[0], point[1] - last[1]) < 1.5 ||
      stroke.current.points.length >= 1500
    )
      return;
    stroke.current = {
      ...stroke.current,
      points: [...stroke.current.points, point],
    };
    setPending(stroke.current);
  }
  function finish(event?: PointerEvent<SVGSVGElement>) {
    if (event && pointer.current !== event.pointerId) return;
    const completed = stroke.current;
    stroke.current = null;
    pointer.current = null;
    setPending(null);
    if (completed) add(completed);
  }
  function undo() {
    if (marks.length) {
      setMarks((previous) => previous.slice(0, -1));
      setMessage("Last mark undone.");
    } else if (cleared) {
      setMarks(cleared);
      setCleared(null);
      setMessage("Your sketch is back.");
    }
  }
  function clear() {
    setCleared(marks);
    setMarks([]);
    setMessage("A fresh page. Undo will bring your sketch back.");
  }
  function keyboard(event: KeyboardEvent<SVGSVGElement>) {
    if (!active) return;
    const moves: Record<string, Point> = {
      ArrowLeft: [-20, 0],
      ArrowRight: [20, 0],
      ArrowUp: [0, -20],
      ArrowDown: [0, 20],
    };
    if (moves[event.key]) {
      event.preventDefault();
      setKeyboardVisible(true);
      const delta = moves[event.key];
      setKeyboardPoint(([x, y]) => [
        Math.max(20, Math.min(980, x + delta[0])),
        Math.max(20, Math.min(540, y + delta[1])),
      ]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setKeyboardVisible(true);
      add({ kind: "star", color, size, points: [keyboardPoint] });
      setMessage("A little star, just there.");
    } else if (event.key === "Escape") {
      finish();
      setActive(false);
      setKeyboardVisible(false);
    }
  }
  function download() {
    if (!paper.current) return;
    const clone = paper.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "1600");
    clone.setAttribute("height", "896");
    clone.removeAttribute("class");
    clone.removeAttribute("tabindex");
    clone.querySelectorAll("[data-helper]").forEach((node) => node.remove());
    const url = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(clone)], {
        type: "image/svg+xml;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "a-little-mark-by-you.svg";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Your doodle is ready to save as an SVG.");
  }
  const allMarks = pending ? [...marks, pending] : marks;
  return (
    <section
      className="doodle-section section"
      id="leave-a-mark"
      aria-labelledby="doodle-title"
    >
      <div className="doodle-heading">
        <div>
          <Eyebrow>A little room to play</Eyebrow>
          <h2 id="doodle-title">
            Leave a little <em className="script">mark.</em>
          </h2>
        </div>
        <p>
          A line, a star, a happy accident.
          <br />
          Let’s see where your curiosity goes.
        </p>
      </div>
      <div className="doodle-studio">
        <div className="doodle-toolbar" aria-label="Drawing tools">
          <div
            className="doodle-tool-group"
            role="group"
            aria-label="Choose a drawing tool"
          >
            <button
              type="button"
              aria-pressed={tool === "pen"}
              onClick={() => setTool("pen")}
            >
              ↝ <span>Pen</span>
            </button>
            <button
              type="button"
              aria-pressed={tool === "star"}
              onClick={() => setTool("star")}
            >
              <Star />
              <span>Star</span>
            </button>
          </div>
          <div className="doodle-colors" role="group" aria-label="Ink colour">
            {palette.map((c) => (
              <button
                type="button"
                key={c.value}
                aria-label={`${c.name} ink`}
                aria-pressed={color === c.value}
                onClick={() => setColor(c.value)}
                style={{ "--ink-color": c.value } as React.CSSProperties}
              >
                <span />
                {color === c.value && <b aria-hidden="true">✓</b>}
              </button>
            ))}
          </div>
          <div className="doodle-weight" role="group" aria-label="Line weight">
            <button
              type="button"
              aria-label="Fine line"
              aria-pressed={size === 4}
              onClick={() => setSize(4)}
            >
              <span className="fine-dot" />
            </button>
            <button
              type="button"
              aria-label="Bold line"
              aria-pressed={size === 9}
              onClick={() => setSize(9)}
            >
              <span className="bold-dot" />
            </button>
          </div>
          <button
            type="button"
            className="doodle-toggle"
            aria-pressed={active}
            onClick={() => {
              finish();
              setActive(!active);
              setKeyboardVisible(false);
            }}
          >
            {active ? "Done doodling ✓" : "Start doodling ↗"}
          </button>
        </div>
        <div className={`doodle-paper-wrap ${active ? "is-drawing" : ""}`}>
          <svg
            ref={paper}
            className="doodle-paper"
            viewBox="0 0 1000 560"
            role="img"
            aria-label={`Your doodle, ${marks.length} marks. ${active ? "Draw with a pointer, or use arrow keys and Enter to place stars. Escape finishes drawing." : "Choose Start doodling to draw."}`}
            aria-describedby="doodle-help"
            tabIndex={active ? 0 : -1}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={finish}
            onPointerCancel={finish}
            onLostPointerCapture={finish}
            onKeyDown={keyboard}
            onBlur={() => setKeyboardVisible(false)}
          >
            <rect width="1000" height="560" fill="#FFFDEE" />
            {allMarks.map((mark, i) =>
              mark.kind === "star" ? (
                <svg
                  key={i}
                  data-mark="star"
                  x={mark.points[0][0] - (mark.size === 4 ? 22 : 38)}
                  y={mark.points[0][1] - (mark.size === 4 ? 19 : 32)}
                  width={mark.size === 4 ? 44 : 76}
                  height={mark.size === 4 ? 38 : 64}
                  viewBox={brandStar.viewBox}
                >
                  <path
                    d={brandStar.path}
                    transform={brandStar.transform}
                    fill={mark.color}
                  />
                </svg>
              ) : mark.points.length === 1 ? (
                <circle
                  key={i}
                  data-mark="pen"
                  cx={mark.points[0][0]}
                  cy={mark.points[0][1]}
                  r={mark.size / 2}
                  fill={mark.color}
                />
              ) : (
                <path
                  key={i}
                  data-mark="pen"
                  d={pathFor(mark.points)}
                  fill="none"
                  stroke={mark.color}
                  strokeWidth={mark.size}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            )}
            {active && keyboardVisible && (
              <circle
                data-helper
                cx={keyboardPoint[0]}
                cy={keyboardPoint[1]}
                r="28"
                fill="none"
                stroke="#690000"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
            )}
          </svg>
          {!marks.length && !pending && (
            <div className="doodle-empty" aria-hidden="true">
              <Star />
              <span className="script">
                A blank page.
                <br />
                All yours.
              </span>
              <span>
                {active
                  ? "Make the first mark."
                  : "No right way. Just your way."}
              </span>
            </div>
          )}
          <span className="doodle-paper-label" aria-hidden="true">
            SPECKLE STUDIOS × YOU
          </span>
        </div>
        <div className="doodle-bottom">
          <p id="doodle-help">
            {active
              ? "Draw or tap to stamp. Tap Done doodling to scroll through the page."
              : "Tap Start doodling to begin. Your sketch stays on this device."}
          </p>
          <div className="doodle-actions">
            <button
              type="button"
              onClick={undo}
              disabled={!marks.length && !cleared}
            >
              ↶ Undo
            </button>
            <button type="button" onClick={clear} disabled={!marks.length}>
              Clear
            </button>
            <button type="button" onClick={download} disabled={!marks.length}>
              Save doodle ↓
            </button>
          </div>
        </div>
      </div>
      <p className="doodle-status" role="status">
        {message}
      </p>
      <span className="sr-only">
        Keyboard drawing: start doodling, focus the drawing area, use arrow keys
        to move and Enter or Space to stamp a star. All tools and colours work
        with the keyboard.
      </span>
    </section>
  );
}
