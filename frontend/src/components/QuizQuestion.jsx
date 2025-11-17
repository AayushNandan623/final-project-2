export default function QuizQuestion({
  question,
  selectedIndex,
  onSelect,
  showFeedback,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      <ul className="flex flex-col gap-4">
        {question.options.map((opt, idx) => {
          const selected = idx === selectedIndex;
          const correct = idx === question.answerIndex;

          let base = "p-4 border rounded-lg cursor-pointer text-lg transition";

          if (selected) base += " border-blue-500 bg-blue-50";
          if (showFeedback && selectedIndex != null) {
            if (correct) base += " border-green-500 bg-green-50";
            else if (selected) base += " border-red-500 bg-red-50";
          }

          return (
            <li key={idx} className={base} onClick={() => onSelect(idx)}>
              {opt}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
