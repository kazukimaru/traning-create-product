import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0d0b] text-white">
      {/* =========================================
          Background
      ========================================= */}

      <div className="absolute inset-0">
        {/* ベースグラデーション */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2a2118,transparent_60%)]" />

        {/* 光1 */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-amber-300/10 blur-[140px]"
        />

        {/* 光2 */}
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-200/10 blur-[160px]"
        />

        {/* ノイズ感 */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </div>

      {/* =========================================
          Login Card
      ========================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
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
            rotateX: 4,
            rotateY: -4,
          }}
          transition={{
            duration: 0.2,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            shadow-[0_30px_80px_rgba(0,0,0,0.55)]
            p-8
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
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-100/5"
            >
              <Building2 className="h-8 w-8 text-amber-200" />
            </motion.div>

            <h1 className="mb-2 text-3xl font-semibold tracking-wide">
              Simpled Banquet
            </h1>

            <p className="text-sm text-zinc-400">
              社内会食データ・ナレッジ共有プラットフォーム
            </p>
          </div>

          {/* =========================================
              Login Area
          ========================================= */}

          <div className="space-y-5">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Sign In
              </p>
            </div>

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Button
                size="lg"
                className="
                  h-12
                  w-full
                  bg-white
                  text-black
                  hover:bg-white
                  hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]
                  transition-all
                "
                onClick={() => {
                  // ↓ここだけ差し替え
                  // void auth.signinRedirect();

                  console.log("login");
                }}
              >
                <div className="mr-3 grid grid-cols-2 gap-[2px]">
                  <div className="h-2 w-2 bg-[#F25022]" />
                  <div className="h-2 w-2 bg-[#7FBA00]" />
                  <div className="h-2 w-2 bg-[#00A4EF]" />
                  <div className="h-2 w-2 bg-[#FFB900]" />
                </div>

                Microsoft Entra IDでサインイン
              </Button>
            </motion.div>
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
