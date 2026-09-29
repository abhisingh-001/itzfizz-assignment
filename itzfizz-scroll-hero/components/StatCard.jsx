export default function StatCard({ value, suffix, label }) {
  return (
    <div className="stat-card border-l border-white/15 pl-4">
      <p className="font-display text-3xl font-bold md:text-5xl">
        <span data-count={value}>{value}</span>
        <span className="text-papaya">{suffix}</span>
      </p>
      <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-white/55 md:text-sm">
        {label}
      </p>
    </div>
  );
}
