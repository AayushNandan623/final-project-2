export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
