import type { DataPoint, ChartParams } from '../types/chart';

export function applySmoothing(data: DataPoint[], window: number): DataPoint[] {
    if (window <= 1) return data;
    return data.map((point, i) => {
        const start = Math.max(0, i - Math.floor(window / 2));
        const end = Math.min(data.length, i + Math.ceil(window / 2));
        const slice = data.slice(start, end);
        const avg = slice.reduce((s, p) => s + p.value, 0) / slice.length;
        return { ...point, value: avg };
    });
}

export function applyOutlierFilter(data: DataPoint[], params: ChartParams): DataPoint[] {
    if (params.outlierMode === 'show_all') return data;

    if (params.outlierMode === 'manual_exclude') {
        return data.filter((_, i) => !params.manualExcludedIndices.includes(i));
    }

    const values = data.map((d) => d.value);
    const mean = values.reduce((s, v) => s + v, 0) / values.length;
    const stdDev = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length);
    return data.filter((d) => Math.abs(d.value - mean) <= 3 * stdDev);
}

export function applySampling(data: DataPoint[], pct: number, seed: number = 42): DataPoint[] {
    if (pct >= 100) return data;
    const count = Math.max(2, Math.round((data.length * pct) / 100));
    let rng = seed;
    const nextRand = () => {
        rng = (rng * 16807) % 2147483647;
        return rng / 2147483647;
    };
    const indices = Array.from({ length: data.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(nextRand() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count).sort((a, b) => a - b).map((i) => data[i]);
}

export function applySorting(data: DataPoint[], order: ChartParams['sortOrder']): DataPoint[] {
    const sorted = [...data];
    switch (order) {
        case 'value_desc':
            return sorted.sort((a, b) => b.value - a.value);
        case 'value_asc':
            return sorted.sort((a, b) => a.value - b.value);
        case 'alpha':
            return sorted.sort((a, b) => a.label.localeCompare(b.label));
        case 'custom':
            return sorted.reverse();
        default:
            return sorted;
    }
}

export function applyTotalSize(data: DataPoint[], params: ChartParams): DataPoint[] {
    if (params.totalDataSize >= 100) return data;
    const itemsToKeep = Math.max(2, Math.round(data.length * (params.totalDataSize / 100)));
    // Keeping the most recent items (tail of the array)
    return data.slice(-itemsToKeep);
}

export function transformData(data: DataPoint[], params: ChartParams): DataPoint[] {
    let result = applyTotalSize(data, params);
    result = applySampling(result, params.samplePct);
    result = applyOutlierFilter(result, params);
    result = applySmoothing(result, params.smoothingWindow);
    result = applySorting(result, params.sortOrder);
    return result;
}
