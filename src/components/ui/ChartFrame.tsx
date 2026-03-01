// ChartFrame — Standard chart container for all lessons
// Usage: wrap your SVG chart inside <ChartFrame label="...">
//   <svg viewBox="0 0 480 220" className="w-full"> ... </svg>
// </ChartFrame>
//
// Standard SVG dimensions: viewBox="0 0 480 220" + className="w-full"
// Standard inner padding for SVG contents:
//   const pad = { l: 40, r: 20, t: 16, b: 32 }
// This gives a 420 x 172 drawable area.

interface ChartFrameProps {
    label: string;           // Caption shown above the chart (uppercase label style)
    note?: string;           // Optional note below the chart (smaller, muted)
    className?: string;      // Extra classes on the outer wrapper
    children: React.ReactNode;
}

export default function ChartFrame({ label, note, className = '', children }: ChartFrameProps) {
    return (
        <div className={`bg-white border border-stone-200 rounded-xl p-5 space-y-3 ${className}`}>
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                {label}
            </p>
            <div className="w-full max-w-2xl mx-auto">
                {children}
            </div>
            {note && (
                <p className="text-[12px] text-stone-400 leading-relaxed">
                    {note}
                </p>
            )}
        </div>
    );
}
