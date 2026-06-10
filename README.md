import { motion } from "motion/react";
import { FaMicrosoft, FaUtensils } from "react-icons/fa";

export default function LoginPage() {
  const handleLogin = () => {
    // ここだけ差し替え
    // void auth.signinRedirect();
    console.log("login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0d0b] text-white">
      {/* =========================================
          Background
      ========================================= */}

      <div className="absolute inset-0 overflow-hidden">
        {/* ベース背景 */}
        <div className="absolute inset-0 bg-[#0f0d0b]" />

        {/* 上部グラデーション */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2a2118,transparent_60%)]" />

        {/* 光① */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-amber-300/10 blur-[140px]"
        />

        {/* 光② */}
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-300/10 blur-[160px]"
        />

        {/* 中央の光 */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/5 blur-[120px]" />
      </div>

      {/* =========================================
          Login Card
      ========================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 35px 90px rgba(0,0,0,0.65)",
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-8
            backdrop-blur-2xl
            shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          "
        >
          {/* =========================================
              Logo
          ========================================= */}

          <div className="mb-10 text-center">
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-amber-200/20
                bg-amber-100/5
              "
            >
              <FaUtensils className="text-2xl text-amber-200" />
            </motion.div>

            <h1 className="mb-2 text-3xl font-semibold tracking-wide">
              Simpled Banquet
            </h1>

            <p className="text-sm text-zinc-400">
              社内会食データ・ナレッジ共有プラットフォーム
            </p>
          </div>

          {/* =========================================
              Login
          ========================================= */}

          <div className="space-y-5">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                Sign In
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255,255,255,0.15)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={handleLogin}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-white
                font-medium
                text-black
                transition-all
              "
            >
              <FaMicrosoft className="text-lg" />
              <span>Microsoft Entra IDでサインイン</span>
            </motion.button>
          </div>

          {/* =========================================
              Footer
          ========================================= */}

          <div className="mt-10 border-t border-white/5 pt-5 text-center">
            <p className="text-xs text-zinc-500">
              © Simplex Holdings Inc.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
