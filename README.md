import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hook-hook-form/resolvers/zod'; // ※環境に合わせてインポートパスは調整してください
import * as z from 'zod';
import Confetti from 'react-confetti';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

// --- バリデーションスキーマ ---
const loginSchema = z.compile(
  z.object({
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください' }),
  })
);

const registerSchema = z.compile(
  z.object({
    name: z.string().min(2, { message: '名前は2文字以上で入力してください' }),
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください' }),
  })
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // ウィンドウサイズ（Confetti用）
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // フォーム初期化
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // トリガー：エラー時のぶるぶる演出
  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const onLoginSubmit = (data: any) => {
    console.log('Login Data:', data);
    setIsSuccess(true);
  };

  const onRegisterSubmit = (data: any) => {
    console.log('Register Data:', data);
    setIsSuccess(true);
  };

  // Microsoft Entra ID ログイン用（仮）
  const handleMicrosoftLogin = () => {
    console.log('Microsoft Entra ID 認証プロセスを開始します...');
    // ここに実際のSSO・OAuthの認可リダイレクト処理などを書き換えてください
    setIsSuccess(true); 
  };

  // シェイクアニメーションの定義
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#121110]">
      {/* 成功時の紙吹雪演出 */}
      {isSuccess && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          recycle={false}
          colors={['#c4a484', '#e6dfd5', '#8a7355', '#ffffff']} // バンケットの上品な色合いにマッチ
        />
      )}

      {/* バックグラウンド・グラデーションオーブ（近未来エフェクト） */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#c4a484]/20 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#8a7355]/20 to-transparent blur-[120px]" />
      </div>

      {/* メインカードコンテナ */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md p-1"
      >
        {/* カードの外枠。フォーカス時やホバー時に薄く光るグラデーション（ガラスモーフィズム） */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* ロゴ・ヘッダー（Simplex Banquetのトーンを踏襲） */}
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center justify-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">🍽️</span>
              <h1 className="text-xl font-semibold tracking-wider text-[#e6dfd5]">
                Simplex Banquet
              </h1>
            </motion.div>
            <p className="text-sm text-[#e6dfd5]/50">
              特別なひとときを、シームレスに予約
            </p>
          </div>

          {/* サインイン・サインアップ切り替えスイッチ（滑らかなスライド） */}
          <div className="relative flex p-1 mb-8 bg-black/40 rounded-xl border border-white/5">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-[#c4a484] to-[#a8896c] shadow"
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                left: isLogin ? '4px' : '50%',
                width: 'calc(50% - 4px)',
              }}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${
                isLogin ? 'text-black' : 'text-[#e6dfd5]/60'
              }`}
            >
              サインイン
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${
                !isLogin ? 'text-black' : 'text-[#e6dfd5]/60'
              }`}
            >
              アカウント作成
            </button>
          </div>

          {/* フォームの切り替えアニメーション（AnimatePresence） */}
          <motion.div
            variants={shakeVariants}
            animate={shakeTrigger ? "shake" : "default"}
          >
            <AnimatePresence mode="wait">
              {isLogin ? (
                // --- サインイン フォーム ---
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLoginSubmit(onLoginSubmit, triggerShake)}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#e6dfd5]/70">メールアドレス</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/40" />
                      <input
                        {...loginRegister('email')}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[#e6dfd5] placeholder-[#e6dfd5]/20 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-xs text-red-400 mt-1">{loginErrors.email.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-[#e6dfd5]/70">パスワード</label>
                      <a href="#" className="text-xs text-[#c4a484] hover:underline">忘れた場合</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/40" />
                      <input
                        {...loginRegister('password')}
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[#e6dfd5] placeholder-[#e6dfd5]/20 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                      />
                    </div>
                    {loginErrors.password && (
                      <p className="text-xs text-red-400 mt-1">{loginErrors.password.message as string}</p>
                    )}
                  </div>

                  {/* リッチな通常ログインボタン */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(196, 164, 132, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 mt-2 rounded-xl font-medium text-black bg-gradient-to-r from-[#e6dfd5] to-[#c4a484] flex items-center justify-center gap-2 transition-all group"
                  >
                    サインイン
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.form>
              ) : (
                // --- サインアップ フォーム ---
                <motion.form
                  key="register-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegisterSubmit(onRegisterSubmit, triggerShake)}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#e6dfd5]/70">お名前</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/40" />
                      <input
                        {...registerRegister('name')}
                        type="text"
                        placeholder="山田 太郎"
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[#e6dfd5] placeholder-[#e6dfd5]/20 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                      />
                    </div>
                    {registerErrors.name && (
                      <p className="text-xs text-red-400 mt-1">{registerErrors.name.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#e6dfd5]/70">メールアドレス</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/40" />
                      <input
                        {...registerRegister('email')}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[#e6dfd5] placeholder-[#e6dfd5]/20 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                      />
                    </div>
                    {registerErrors.email && (
                      <p className="text-xs text-red-400 mt-1">{registerErrors.email.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#e6dfd5]/70">パスワード</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e6dfd5]/40" />
                      <input
                        {...registerRegister('password')}
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[#e6dfd5] placeholder-[#e6dfd5]/20 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] transition-all"
                      />
                    </div>
                    {registerErrors.password && (
                      <p className="text-xs text-red-400 mt-1">{registerErrors.password.message as string}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(196, 164, 132, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 mt-2 rounded-xl font-medium text-black bg-gradient-to-r from-[#e6dfd5] to-[#c4a484] flex items-center justify-center gap-2 transition-all group"
                  >
                    新規登録
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 区切り線 */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-xs text-[#e6dfd5]/30">または</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* 🌟 Microsoft Entra ID ログインボタン（プレースホルダー） */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleMicrosoftLogin}
            className="w-full py-3 rounded-xl font-medium text-[#e6dfd5] bg-white/5 border border-white/10 flex items-center justify-center gap-3 transition-all"
          >
            {/* Microsoft風の4色ロゴをSVGでモック配置 */}
            <svg className="w-4 h-4" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
              <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
              <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
              <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
            </svg>
            <span>Microsoft Entra ID でサインイン</span>
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}
