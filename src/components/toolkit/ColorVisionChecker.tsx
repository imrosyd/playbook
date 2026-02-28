import { useState, useRef, useCallback } from 'react';
import { Eye, Upload, X } from 'lucide-react';

type Filter = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochromacy';

const FILTERS: Array<{ id: Filter; label: string; desc: string; prevalence: string; style: string }> = [
    { id: 'normal', label: 'Normal Vision', desc: 'How most people see your chart.', prevalence: '', style: '' },
    {
        id: 'deuteranopia', label: 'Deuteranopia', desc: 'Red-green (green-weak). Most common form.',
        prevalence: '6% of men', style: 'saturate(0.3) hue-rotate(90deg)'
    },
    {
        id: 'protanopia', label: 'Protanopia', desc: 'Red-green (red-weak).',
        prevalence: '2% of men', style: 'saturate(0.4) hue-rotate(30deg)'
    },
    {
        id: 'tritanopia', label: 'Tritanopia', desc: 'Blue-yellow deficiency.',
        prevalence: '0.01% of all', style: 'saturate(0.5) hue-rotate(200deg)'
    },
    {
        id: 'monochromacy', label: 'Monochromacy', desc: 'Sees only shades of grey.',
        prevalence: '0.003% of all', style: 'grayscale(1)'
    },
];

// Vibrant sample chart image (a simple SVG encoded as data URL)
const SAMPLE_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='300' style='background:%23ffffff;font-family:sans-serif'>
<rect x='40' y='40' width='80' height='180' fill='%23dc2626' rx='4'/>
<rect x='150' y='90' width='80' height='130' fill='%2316a34a' rx='4'/>
<rect x='260' y='130' width='80' height='90' fill='%232563eb' rx='4'/>
<rect x='370' y='60' width='80' height='160' fill='%23d97706' rx='4'/>
<line x1='30' y1='220' x2='480' y2='220' stroke='%23e5e7eb' stroke-width='1'/>
<text x='80' y='240' text-anchor='middle' font-size='12' fill='%23374151'>Q1</text>
<text x='190' y='240' text-anchor='middle' font-size='12' fill='%23374151'>Q2</text>
<text x='300' y='240' text-anchor='middle' font-size='12' fill='%23374151'>Q3</text>
<text x='410' y='240' text-anchor='middle' font-size='12' fill='%23374151'>Q4</text>
<text x='250' y='25' text-anchor='middle' font-size='14' font-weight='bold' fill='%231c1917'>Quarterly Revenue by Region</text>
</svg>`;

export default function ColorVisionChecker() {
    const [active, setActive] = useState<Filter>('normal');
    const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setUploadedSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    }, []);

    const clearUpload = () => { setUploadedSrc(null); if (fileRef.current) fileRef.current.value = ''; };

    const currentFilter = FILTERS.find(f => f.id === active)!;
    const imgSrc = uploadedSrc ?? SAMPLE_SVG;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Eye size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-stone-800">Color Vision Checker</h3>
                        <p className="text-[12px] text-stone-500">Preview how your chart looks with different vision types.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {uploadedSrc && (
                        <button onClick={clearUpload} className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-red-500 transition-colors">
                            <X size={12} /> Remove image
                        </button>
                    )}
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 text-[12px] font-semibold text-stone-600 hover:border-blue-300 hover:text-blue-700 transition-all"
                    >
                        <Upload size={13} /> Upload your chart
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
            </div>

            {/* Vision type selector */}
            <div className="flex flex-wrap gap-2">
                {FILTERS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setActive(f.id)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${f.id === active ? 'bg-blue-700 text-white border-blue-700 shadow-sm' : 'bg-white text-stone-500 border-stone-200 hover:border-blue-300 hover:text-blue-700'}`}
                    >
                        {f.label}
                        {f.prevalence && <span className="ml-1.5 opacity-60 font-normal text-[10px]">({f.prevalence})</span>}
                    </button>
                ))}
            </div>

            {/* Chart preview */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex items-center justify-between">
                    <p className="text-[12px] font-bold text-stone-600">{currentFilter.label}</p>
                    <p className="text-[11px] text-stone-400 italic">{currentFilter.desc}</p>
                </div>
                <div className="p-5 flex justify-center">
                    <img
                        src={imgSrc}
                        alt="Chart preview"
                        className="max-w-full rounded-lg"
                        style={{ filter: currentFilter.style, transition: 'filter 0.3s ease', maxHeight: '300px' }}
                    />
                </div>
            </div>

            {/* Guidance */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-[12px] font-bold text-blue-600 uppercase tracking-wider mb-2">🔍 What to look for</p>
                <ul className="space-y-1.5 text-[12px] text-stone-700">
                    <li className="flex gap-2"><span className="shrink-0">•</span><span><strong>Under Deuteranopia/Protanopia:</strong> Red and green bars should still be distinguishable — if they look identical, change colors or add direct labels.</span></li>
                    <li className="flex gap-2"><span className="shrink-0">•</span><span><strong>Under Monochromacy:</strong> If you can still read the chart in greyscale, your data labels and contrast ratios are strong enough.</span></li>
                    <li className="flex gap-2"><span className="shrink-0">•</span><span><strong>Fix:</strong> Use Blue + Orange instead of Red + Green. Add data labels directly to bars. Use different line styles (solid, dashed, dotted).</span></li>
                </ul>
            </div>
        </div>
    );
}
