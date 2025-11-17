import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png"; // rename your downloaded image to hero.png and place in /src/assets

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* LEFT TEXT */}
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Empowering Minds
              <span className="text-blue-600 block">
                Through Human Rights Education
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Millions of students lack access to clear, engaging, and practical
              human rights knowledge. Our platform bridges this gap with
              beautifully designed learning content, interactive quizzes, and an
              AI tutor that explains every topic in simple terms.
            </p>

            <div className="flex gap-6 mt-6">
              <Link
                to="/topics"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700"
              >
                Start Learning
              </Link>

              <Link
                to="/quiz"
                className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700"
              >
                Take Quiz
              </Link>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="flex-1 flex justify-center">
            <img
              src={heroImg}
              alt="Human Rights Illustration"
              className="w-full max-w-lg drop-shadow-xl rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Why Human Rights Education?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding our rights helps build a more just, equal, and
          compassionate society. It empowers people to stand against
          discrimination, demand fairness, and make informed decisions.
        </p>
      </section>
    </div>
  );
}
