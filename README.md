import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function RichLoginPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 画面サイズ取得（紙吹雪用）
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🌟 ここにあなたの既存のMicrosoftログイン処理を紐付けてください！
  const handleMicrosoftLogin = () => {
    console.log("ここに既存のEntra IDログイン処理を呼び出す");
    
    // ログイン成功時にこれを呼ぶと、極上のゴールド紙吹雪が舞います
    setIsSuccess(true);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#121110] text-[#e6dfd5] font-sans">
      
      {/* ログイン成功時のゴールド＆シャンパン紙吹雪演出 */}
      {isSuccess && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          recycle={false}
          colors={["#c4a484", "#e6dfd5", "#8a7355", "#ffd700", "#ffffff"]}
        />
      )}

      {/* 🍷 背景：レストランの間接照明をイメージした、ゆっくり動く有機的な光のオーブ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#c4a484]/15 to-transparent blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -40, 60, 0], y: [0, 50, -50, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#8a7355]/15 to-transparent blur-[130px]"
        />
      </div>

      {/* メインのログインカード（フェードイン＋スケールアップ） */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-2"
      >
        {/* 高級感のあるガラスモーフィズム外枠 */}
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          
          {/* プロダクトのヘッダー（スクショの雰囲気に合わせた上質なトーン） */}
          <div className="text-center mb-10">
            <motion.div className="inline-flex items-center justify-center gap-2 mb-3" whileHover={{ scale: 1.03 }}>
              <span className="text-2xl">🍽️</span>
              <h1 className="text-xl font-medium tracking-[0.15em] text-[#e6dfd5]">
                Simplex Banquet
              </h1>
            </motion.div>
            <p className="text-xs text-[#e6dfd5]/40 tracking-wider">
              社内会食データ・ナレッジ共有プラットフォーム
            </p>
          </div>

          {/* 🌟 【差し替え箇所】Microsoft Entra ID ログインボタン */}
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-[#c4a484] tracking-widest text-center uppercase mb-4">
              SIMPLEX アカウントでログイン
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 0 25px rgba(196, 164, 132, 0.25)", // ホバー時に上品にゴールドに発光
                backgroundColor: "rgba(255, 255, 255, 0.95)"
              }}
              whileTap={{ scale: 0.98 }} // クリック時の心地よい押し込み感
              type="button"
              onClick={handleMicrosoftLogin} // 👈 ここにお手持ちの関数を割り当ててください
              className="w-full py-3.5 rounded-xl font-semibold text-black bg-white flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              {/* Microsoftの公式4色ロゴ */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
                <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
                <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
                <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
              </svg>
              <span className="text-sm tracking-wide">Microsoft Entra ID でサインイン</span>
            </motion.button>
          </div>

          {/* フッターの装飾（おまけ） */}
          <div className="mt-8 text-center">
            <p className="text-[10px] text-[#e6dfd5]/20 tracking-wider">
              © Simplex Holdings Inc. All Rights Reserved.
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
