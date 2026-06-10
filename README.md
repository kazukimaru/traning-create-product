import { FaMicrosoft, FaUtensils } from "react-icons/fa";
import restaurantBg from "../assets/restaurant.jpg";

export default function LoginPage() {
  const handleLogin = () => {
    // Microsoft認証に差し替え
    // void auth.signinRedirect();

    console.log("login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0d0b] text-white">
      {/* ==============================
          Background
      ============================== */}

      <div className="absolute inset-0">
        {/* 背景画像 */}
        <img
          src={restaurantBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />

        {/* 暗幕 */}
        <div className="absolute inset-0 bg-black/75" />

        {/* ゴールドグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-orange-900/20" />

        {/* 光① */}
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-amber-300/10 blur-[140px]" />

        {/* 光② */}
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-300/10 blur-[160px]" />

        {/* カード裏の光 */}
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/5 blur-[120px]" />
      </div>

      {/* ==============================
          Login Card
      ============================== */}

      <div className="relative z-10 w-full max-w-md px-6">
        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-8
            backdrop-blur-2xl
            shadow-[0_25px_80px_rgba(0,0,0,0.55)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]
          "
        >
          {/* ==============================
              Logo
          ============================== */}

          <div className="mb-10 text-center">
            <div
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
            </div>

            <h1 className="mb-2 text-3xl font-semibold tracking-wide">
              Simpled Banquet
            </h1>

            <p className="text-sm text-zinc-400">
              社内会食データ・ナレッジ共有プラットフォーム
            </p>
          </div>

          {/* ==============================
              Login
          ============================== */}

          <div className="space-y-5">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                Sign In
              </p>
            </div>

            <button
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
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                active:scale-[0.98]
              "
            >
              <FaMicrosoft className="text-lg" />

              <span>
                Microsoft Entra IDでサインイン
              </span>
            </button>
          </div>

          {/* ==============================
              Footer
          ============================== */}

          <div className="mt-10 border-t border-white/5 pt-5 text-center">
            <p className="text-xs text-zinc-500">
              © Simplex Holdings Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
