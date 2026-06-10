import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Confetti from "react-confetti";
import { Mail, Lock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

// 🌟 MSAL（Microsoft認証）用のフックをインポート
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const loginSchema = z.object({
  email: z.string().email({ message: "有効な社内メールアドレスを入力してください" }),
  password: z.string().min(6, { message: "パスワードは6文字以上です" }),
});

export default function LoginPage() {
  const { instance } = useMsal(); // MSALインスタンスを取得
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  // 開発用のローカルログイン
  const onManualLoginSubmit = (data: any) => {
    console.log("Manual Login:", data);
    setIsSuccess(true);
    // ここに自作のAPIを叩く処理などを入れる
  };

  // 🌟 【本番】Microsoft Entra ID ポップアップログイン
  const handleMicrosoftLogin = async () => {
    try {
      console.log("Microsoft Entra ID 認証ポップアップを開きます...");
      const loginResponse = await instance.loginPopup(loginRequest);
      console.log("ログイン成功:", loginResponse.account);
      
      // 成功したら紙吹雪を降らせる
      setIsSuccess(true);
      
      // 必要に応じてアカウント情報をステートに保存したり、ダッシュボードへ遷移させる
      // setTimeout(() => { navigate("/dashboard"); }, 2000);
    } catch (error) {
      console.error("Microsoft ログインエラー:", error);
      triggerShake(); // エラー時はカードをぶるぶるさせる
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#121110] text-[#e6dfd5]">
      
      {/* ログイン成功時のゴールド＆シャンパン紙吹雪 */}
      {isSuccess && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={180}
          recycle={false}
          colors={["#c4a484", "#e6dfd5", "#8a7355", "#ffd700", "#ffffff"]}
        />
      )}

      {/* 🍷 背景：レストランのキャンドルをイメージした有機的な光のオーブ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#c4a484]/15 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 50, 0], y: [0, 40, -40, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#8a7355]/15 to-transparent blur-[120px]"
        />
      </div>

      {/* メインカード */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-1"
      >
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
          
          {/* ヘッダー */}
          <div className="text-center mb-10">
            <motion.div className="inline-flex items-center justify-center gap-2 mb-3" whileHover={{ scale: 1.03 }}>
              <span className="text-2xl">🍽️</span>
              <h1 className="text-xl font-medium tracking-[0.15em] text-[#e6dfd5]">Simplex Banquet</h1>
            </motion.div>
            <p className="text-xs text-[#e6dfd5]/40 tracking-wider">社内会食データ・ナレッジ共有プラットフォーム</p>
          </div>

          {/* 🌟 Microsoft Entra ID ボタン（主役） */}
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-[#c4a484] tracking-widest text-center uppercase mb-3">
              SIMPLEX アカウントでログイン
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 0 25px rgba(196, 164, 132, 0.25)",
                backgroundColor: "rgba(255, 255, 255, 0.95)"
              }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleMicrosoftLogin}
              className="w-full py-3.5 rounded-xl font-semibold text-black bg-white flex items-center justify-center gap-3 transition-all shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
                <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
                <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
                <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
              </svg>
              <span className="text-sm tracking-wide">Microsoft Entra ID でサインイン</span>
            </motion.button>
          </div>

          {/* アコーディオン式 開発用フォーム */}
          <div className="mt-8">
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              className="w-full flex items-center justify-center gap-1 text-xs text-[#e6dfd5]/30 hover:text-[#e6dfd5]/60 transition-colors py-2"
            >
              <span>または社内アカウント（開発用）でログイン</span>
              {showManualForm ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <AnimatePresence>
              {showManualForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.form
                    animate={shakeTrigger ? { x: [0, -10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } } : {}}
                    onSubmit={handleSubmit(onManualLoginSubmit, triggerShake)}
                    className="space-y-4 pt-4"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#e6dfd5]/60">メールアドレス</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/30" />
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="maruyama.k@simplex.ne.jp"
                          className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-[#e6dfd5] placeholder-[#e6dfd5]/15 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-400/80">{errors.email.message as string}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#e6dfd5]/60">パスワード</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/30" />
                        <input
                          {...register("password")}
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-[#e6dfd5] placeholder-[#e6dfd5]/15 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                        />
                      </div>
                      {errors.password && <p className="text-xs text-red-400/80">{errors.password.message as string}</p>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-2.5 mt-2 rounded-xl font-medium text-black bg-gradient-to-r from-[#e6dfd5] to-[#c4a484] text-xs flex items-center justify-center gap-1 transition-all"
                    >
                      <span>サインイン</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
