import React, { useState } from "react";

const AwarenessQuiz = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);

  const handleAnswer = (answer) => {
    setHasAnswered(true);
    if (answer === "tumbler") {
      setIsCorrect(true);
      setPoints(10); // Memberikan 10 poin awal!
    } else {
      setIsCorrect(false);
      setPoints(0);
    }
  };

  return (
    <div className="p-6 bg-green-50 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        🌱 Seberapa Kenal Kamu dengan Konsumsi Berkelanjutan?
      </h2>

      {!hasAnswered ? (
        <div>
          <p className="mb-4 text-gray-700">
            Manakah dari tindakan berikut yang termasuk gaya hidup
            berkelanjutan?
          </p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleAnswer("plastik")}
              className="p-3 bg-white border rounded hover:bg-green-100 text-left"
            >
              ○ Membeli botol plastik setiap hari
            </button>
            <button
              onClick={() => handleAnswer("tumbler")}
              className="p-3 bg-white border rounded hover:bg-green-100 text-left"
            >
              ○ Membawa tumbler dan menggunakannya kembali
            </button>
            <button
              onClick={() => handleAnswer("buang")}
              className="p-3 bg-white border rounded hover:bg-green-100 text-left"
            >
              ○ Membuang makanan yang tidak habis
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center animate-fade-in">
          {isCorrect ? (
            <>
              <h3 className="text-xl font-bold text-green-600 mb-2">
                ✨ Jawabanmu Tepat!
              </h3>
              <p className="text-gray-700 mb-4">
                Kamu sudah memahami dasar konsumsi berkelanjutan.
              </p>
              <div className="bg-green-200 text-green-900 px-4 py-2 rounded-full inline-block font-bold mb-4">
                +10 Poin Awal Didapatkan! 🪙
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-orange-600 mb-2">
                Oops, Kurang Tepat!
              </h3>
              <p className="text-gray-700 mb-4">
                Konsumsi berkelanjutan fokus pada pengurangan sampah, seperti
                menggunakan tumbler. Jangan khawatir, kita akan belajar bersama!
              </p>
            </>
          )}

          <hr className="my-4" />
          <p className="text-sm text-gray-600 mb-3">
            Sekarang, mari kita ukur seberapa besar dampak gaya hidupmu saat
            ini.
          </p>
          <button className="w-full p-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
            Lanjut Hitung Jejak Karbon (L2) ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default AwarenessQuiz;
