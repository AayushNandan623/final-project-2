export default function ScoreCard({ score, total }) {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-extrabold mb-2">
        {score}/{total}
      </h2>
      <p className="text-gray-600 text-lg">Keep practicing!</p>
    </div>
  );
}
