import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Trophy, RotateCcw } from 'lucide-react';

const emojis = ['🌸', '🍜', '🎎', '🗼', '🎭', '⛩️', '🍱', '🎋'];
const allEmojis = [...emojis, ...emojis];

export function GameBoard() {
  const [cards, setCards] = useState(() => 
    shuffle(allEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    })))
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(cards.map((card, index) =>
          index === first || index === second
            ? { ...card, isMatched: true }
            : card
        ));
      }
      setTimeout(() => {
        setCards(cards.map((card, index) =>
          selectedCards.includes(index)
            ? { ...card, isFlipped: false }
            : card
        ));
        setSelectedCards([]);
      }, 1000);
      setMoves(m => m + 1);
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setIsWon(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || cards[index].isMatched || cards[index].isFlipped) return;
    
    setCards(cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    ));
    setSelectedCards([...selectedCards, index]);
  };

  const resetGame = () => {
    setCards(shuffle(allEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))));
    setSelectedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">記憶ゲーム</h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-gray-700">手数: {moves}</span>
            </div>
            <button
              onClick={resetGame}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={18} />
              リセット
            </button>
          </div>
        </div>

        {isWon ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">おめでとうございます！</h2>
            <p className="text-gray-600 mb-4">手数: {moves}回でクリアしました！</p>
            <button
              onClick={resetGame}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
            >
              もう一度プレイ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                {...card}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}