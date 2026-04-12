"use client";

import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface StatItem {
  rawValue: number;
  suffix: string;
  label: string;
}

interface ValueStripProps {
  items: StatItem[];
}

function CounterCell({ item }: { item: StatItem }) {
  const { ref, value } = useCounterAnimation(item.rawValue);
  return (
    <div className="value-item">
      <strong ref={ref}>
        {value.toLocaleString()}
        {item.suffix}
      </strong>
      <span>{item.label}</span>
    </div>
  );
}

/**
 * Animated stat strip with scroll-triggered counters.
 */
export function ValueStrip({ items }: ValueStripProps) {
  return (
    <div className="value-strip">
      {items.map((item) => (
        <CounterCell key={item.label} item={item} />
      ))}
    </div>
  );
}
