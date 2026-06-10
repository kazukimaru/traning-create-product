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

ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー














import { FaMicrosoft, FaUtensils } from "react-icons/fa";
import restaurantBg from "../assets/login-bg.jpg";

export default function LoginPage() {
  const handleLogin = () => {
    // Microsoft認証に差し替え
    // void auth.signinRedirect();

    console.log("login");
  };

  return (
    <div className="min-h-screen bg-[#f7f4f1] p-6 lg:p-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center justify-center">
        <div
          className="
            w-full
            overflow-hidden
            rounded-[36px]
            border
            border-[#eadfd3]
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          "
        >
          <div className="grid min-h-[700px] lg:grid-cols-[1.15fr_0.85fr]">
            {/* ======================================
                LEFT
            ====================================== */}

            <div className="relative hidden lg:block">
              <img
                src={restaurantBg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-black/35" />

              {/* グラデーション */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* バッジ */}
              <div className="absolute left-10 top-10 flex gap-2">
                <span
                  className="
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-white
                    backdrop-blur-md
                  "
                >
                  会食ナレッジ
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-white
                    backdrop-blur-md
                  "
                >
                  店舗共有
                </span>
              </div>

              {/* キャッチコピー */}
              <div className="absolute bottom-10 left-10 right-10">
                <div
                  className="
                    rounded-3xl
                    border
                    border-white/15
                    bg-white/10
                    p-8
                    backdrop-blur-xl
                  "
                >
                  <h2
                    className="
                      mb-4
                      text-5xl
                      font-bold
                      leading-tight
                      text-white
                    "
                  >
                    会食の知見を、
                    <br />
                    組織の資産へ。
                  </h2>

                  <p
                    className="
                      max-w-lg
                      text-lg
                      leading-relaxed
                      text-white/80
                    "
                  >
                    過去の会食実績や店舗評価を共有し、
                    より良い顧客体験と社内ナレッジの蓄積を支援します。
                  </p>

                  <div className="mt-6 flex gap-3">
                    <div
                      className="
                        rounded-2xl
                        bg-white/10
                        px-4
                        py-3
                        text-white
                      "
                    >
                      <div className="text-xs text-white/60">
                        エリア
                      </div>
                      <div className="font-medium">
                        銀座・丸の内
                      </div>
                    </div>

                    <div
                      className="
                        rounded-2xl
                        bg-white/10
                        px-4
                        py-3
                        text-white
                      "
                    >
                      <div className="text-xs text-white/60">
                        カテゴリ
                      </div>
                      <div className="font-medium">
                        フレンチ・和食
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================
                RIGHT
            ====================================== */}

            <div className="flex items-center justify-center p-8 lg:p-14">
              <div className="w-full max-w-md">
                {/* Logo */}

                <div className="mb-12 text-center">
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
                      size={30}
                      className="text-[#c4a484]"
                    />
                  </div>

                  <h1 className="mb-3 text-4xl font-bold text-[#4a3a33]">
                    Simplex Banquet
                  </h1>

                  <p className="text-[#8d7f74]">
                    社内会食データ・ナレッジ共有プラットフォーム
                  </p>
                </div>

                {/* Login Card */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-[#ece4db]
                    bg-[#fcfaf8]
                    p-8
                  "
                >
                  <div className="mb-6 text-center">
                    <p
                      className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-[#c4a484]
                      "
                    >
                      Sign In
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
                      hover:-translate-y-0.5
                      hover:bg-[#b79675]
                      hover:shadow-lg
                    "
                  >
                    <FaMicrosoft />

                    Microsoft Entra IDでサインイン
                  </button>

                  <p
                    className="
                      mt-5
                      text-center
                      text-sm
                      text-[#9a8d82]
                    "
                  >
                    Simplex社員アカウントでログインしてください
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs text-[#b6aaa0]">
                    © Simplex Holdings Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
