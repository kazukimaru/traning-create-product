import { FaMicrosoft, FaUtensils } from "react-icons/fa";
import restaurantBg from "../assets/login-bg.jpg";

export default function LoginPage() {
  const handleLogin = () => {
    // 認証処理
    // void auth.signinRedirect();

    console.log("login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f4f1]">
      {/* =======================
          Background
      ======================== */}

      <div className="absolute inset-0">
        {/* 写真 */}
        <img
          src={restaurantBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />

        {/* ベージュレイヤー */}
        <div className="absolute inset-0 bg-[#f7f4f1]/90" />

        {/* グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-[#f7f4f1]" />
      </div>

      {/* =======================
          Header
      ======================== */}

      <header className="relative z-10 border-b border-[#e8ddd0] bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-8">
          <div className="flex items-center gap-3">
            <FaUtensils className="text-[#c4a484]" />

            <span className="text-3xl font-bold text-[#4a3a33]">
              Simplex Banquet
            </span>
          </div>
        </div>
      </header>

      {/* =======================
          Login
      ======================== */}

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div
          className="
            w-full
            max-w-xl
            rounded-[32px]
            border
            border-[#eadfd3]
            bg-white/90
            p-12
            shadow-xl
          "
        >
          <div className="text-center">
            <div
              className="
                mx-auto
                mb-6
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-[#f7f0e8]
              "
            >
              <FaUtensils
                size={28}
                className="text-[#c4a484]"
              />
            </div>

            <h1 className="mb-3 text-4xl font-bold text-[#4a3a33]">
              Welcome
            </h1>

            <p className="mb-10 text-[#8d7f74]">
              社内会食データ・ナレッジ共有プラットフォーム
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-[#c4a484]
              text-lg
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#b89672]
              hover:shadow-lg
            "
          >
            <FaMicrosoft />

            Microsoft Entra IDでサインイン
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#a49488]">
              Simplex社員アカウントでログインしてください
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
