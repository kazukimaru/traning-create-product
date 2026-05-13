import { useState, useEffect } from "react";
import { getRestaurants } from "../lib/api";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant, FilterConditions } from "../types";

export default function Home() {
  // --- 1. 状態（State）の定義 ---
  // useStateはコンポーネントの状態を保持し、値が変わると画面を再描画（レンダリング）する役割を持ちます。
  
  // restaurants: APIから取得したすべてのレストランデータ（マスターデータ）を保持します。
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  // filteredRestaurants: フィルター適用後に実際に画面に表示するレストランの配列です。
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  // tempFilters: ユーザーが画面上のプルダウン等で変更している最中の「仮のフィルター状態」です。
  // まだ「検索」ボタンが押されていないため、この値が変わっても画面の一覧には影響を与えません。
  const [tempFilters, setTempFilters] = useState<FilterConditions>({
    area: "指定なし",
    scene: "指定なし",
    genre: "指定なし",
    budget: "指定なし",
    peopleCount: "指定なし",
    department: "指定なし",
    smoking: "指定なし",
    aycd: "指定なし",
    course: "指定なし"
  });

  // activeFilters: 「検索」ボタンが押された瞬間に、tempFiltersの中身をコピーして保持する「適用済みのフィルター」です。
  // 実際の絞り込み処理は、この activeFilters を基準に行われます。
  const [activeFilters, setActiveFilters] = useState<FilterConditions>({
    area: "指定なし",
    scene: "指定なし",
    genre: "指定なし",
    budget: "指定なし",
    peopleCount: "指定なし",
    department: "指定なし",
    smoking: "指定なし",
    aycd: "指定なし",
    course: "指定なし"
  });

  // --- 2. 初期データの取得 ---
  // useEffectはコンポーネントがマウント（画面に表示）された直後に一度だけ実行されます。
  useEffect(() => {
    // APIからレストラン情報を取得する非同期関数を定義して実行します。
    const fetchData = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
      setFilteredRestaurants(data); // 初期状態ではフィルターがかかっていないため、全件を表示します。
    };
    fetchData();
  }, []); // 第二引数の空配列 [] は、「初回のみ実行する」という意味です。

  // --- 3. フォーム入力のハンドリング ---
  // セレクトボックスの値が変更されたときに呼ばれる関数です。
  const handleFilterChange = (key: keyof FilterConditions, value: string) => {
    // スプレッド構文 (...) を使って現在の tempFilters をコピーし、変更された項目 (key) だけを上書きします。
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  // --- 4. 検索ボタンのクリック処理 ---
  const handleSearch = () => {
    // ユーザーが入力した仮のフィルター状態 (tempFilters) を、適用済みフィルター (activeFilters) に格上げします。
    setActiveFilters(tempFilters);
  };

  // --- 5. 絞り込みロジック (副作用のフック) ---
  // activeFilters か restaurants（元データ）が変わった時にのみ、絞り込み処理を再実行します。
  useEffect(() => {
    // restaurants 配列の全要素に対して filter メソッドを適用します。
    // filter メソッドは、コールバック関数が true を返した要素だけを残して新しい配列を作成します。
    const result = restaurants.filter(r => {
      
      // 【エリアの比較】
      // 「指定なし」の場合は無条件で true となり、チェックをスルーします。
      // そうでない場合は、レストランの area とフィルターの area が完全一致するか確認します。
      if (activeFilters.area !== "指定なし" && r.area !== activeFilters.area) return false;

      // 【シーンの比較】
      // scenes は配列（複数のシーンを持つ場合がある）なので、includes メソッドを使って、
      // フィルターで指定されたシーンがレストランの scenes 配列に含まれているかを確認します。
      if (activeFilters.scene !== "指定なし" && !r.scenes.includes(activeFilters.scene)) return false;

      // 【ジャンルの比較】
      if (activeFilters.genre !== "指定なし" && r.genre !== activeFilters.genre) return false;

      // 【予算の比較】
      // 予算は「範囲」で指定されるため、それぞれの範囲に合わせてレストランの budget (数値) を大小比較します。
      if (activeFilters.budget !== "指定なし") {
        if (activeFilters.budget === "~3000" && r.budget > 3000) return false; // 3000円以下の条件なのに、実際の予算が3000より大きいなら除外
        if (activeFilters.budget === "3001~5000" && (r.budget < 3001 || r.budget > 5000)) return false;
        if (activeFilters.budget === "5001~8000" && (r.budget < 5001 || r.budget > 8000)) return false;
        if (activeFilters.budget === "8001~10000" && (r.budget < 8001 || r.budget > 10000)) return false;
        if (activeFilters.budget === "10001~20000" && (r.budget < 10001 || r.budget > 20000)) return false;
        if (activeFilters.budget === "20001~" && r.budget <= 20000) return false;
      }

      // 【人数の比較】
      // フィルターの peopleCount は文字列 ("1"〜"99" または "指定なし") なので、
      // Number() 関数を使って数値に変換してから、レストランの過去最大利用人数 (maxPastPeople) と比較します。
      if (activeFilters.peopleCount !== "指定なし") {
        const requiredPeople = Number(activeFilters.peopleCount);
        // 過去の最大利用人数が、選択された人数よりも少ない場合は「収容不可能」とみなして除外します (falseを返す)。
        if (r.maxPastPeople < requiredPeople) return false;
      }

      // 【所属の比較】
      if (activeFilters.department !== "指定なし" && r.department !== activeFilters.department) return false;

      // 【喫煙可否の比較】
      if (activeFilters.smoking !== "指定なし" && r.isSmoke !== activeFilters.smoking) return false;

      // 【飲み放題の比較】
      if (activeFilters.aycd !== "指定なし" && r.isAycd !== activeFilters.aycd) return false;

      // 【コースの比較】
      if (activeFilters.course !== "指定なし" && r.isCourse !== activeFilters.course) return false;

      // 全ての条件（if文での false）をくぐり抜けたレストランだけが、条件に合致しているとして true を返します。
      return true;
    });

    // 絞り込まれた結果を filteredRestaurants ステートに保存し、画面に反映させます。
    setFilteredRestaurants(result);
  }, [activeFilters, restaurants]); // 依存配列: これらが変更された時だけこの useEffect を実行する

  // --- 6. 画面描画 (レンダリング) ---
  return (
    <div className="space-y-8">
      {/* 上部：多機能フィルター */}
      <div className="w-full">
        <div className="bg-white p-6 rounded-2xl shadow-brown border border-accent/20">
          <h2 className="text-xl font-bold text-primary mb-6">絞り込み検索</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* エリアフィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">エリア</label>
              <select 
                value={tempFilters.area} 
                onChange={(e) => handleFilterChange("area", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="東京・銀座・新橋">東京・銀座・新橋</option>
                <option value="赤坂・六本木・麻布">赤坂・六本木・麻布</option>
                <option value="渋谷・目黒・恵比寿">渋谷・目黒・恵比寿</option>
                <option value="新宿・池袋">新宿・池袋</option>
                <option value="品川・浜松町">品川・浜松町</option>
                <option value="上野・浅草">上野・浅草</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* シーンフィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">利用シーン</label>
              <select 
                value={tempFilters.scene} 
                onChange={(e) => handleFilterChange("scene", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="社外新規顧客との会食">社外新規顧客との会食</option>
                <option value="社外既存顧客との会食">社外既存顧客との会食</option>
                <option value="社内">社内</option>
              </select>
            </div>

            {/* ジャンルフィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">ジャンル</label>
              <select 
                value={tempFilters.genre} 
                onChange={(e) => handleFilterChange("genre", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="和食">和食</option>
                <option value="イタリアン">イタリアン</option>
                <option value="フレンチ">フレンチ</option>
                <option value="焼肉・ステーキ">焼肉・ステーキ</option>
                <option value="中華">中華</option>
                <option value="バー">バー</option>
                <option value="韓国料理">韓国料理</option>
                <option value="創作料理">創作料理</option>
                <option value="アジア・エスニック">アジア・エスニック</option>
                <option value="カフェ・スイーツ">カフェ・スイーツ</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* 予算フィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">予算</label>
              <select 
                value={tempFilters.budget} 
                onChange={(e) => handleFilterChange("budget", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="~3000">〜3,000円</option>
                <option value="3001~5000">3,001円〜5,000円</option>
                <option value="5001~8000">5,001円〜8,000円</option>
                <option value="8001~10000">8,001円〜10,000円</option>
                <option value="10001~20000">10,001円〜20,000円</option>
                <option value="20001~">20,001円〜</option>
              </select>
            </div>

            {/* 人数フィルター (1~99の動的生成) */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">人数</label>
              <select 
                value={tempFilters.peopleCount} 
                onChange={(e) => handleFilterChange("peopleCount", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                {/* Array.fromを使って1から99までの数値を生成し、それをmapでoptionタグに変換しています */}
                {Array.from({ length: 99 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num.toString()}>{num}名</option>
                ))}
              </select>
            </div>

            {/* 所属フィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">所属</label>
              <select 
                value={tempFilters.department} 
                onChange={(e) => handleFilterChange("department", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="XCI">XCI</option>
                <option value="SXI">SXI</option>
                <option value="SHI">SHI</option>
              </select>
            </div>

            {/* 喫煙可否フィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">喫煙可否</label>
              <select 
                value={tempFilters.smoking} 
                onChange={(e) => handleFilterChange("smoking", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="完全禁煙">完全禁煙</option>
                <option value="喫煙専用室あり">喫煙専用室あり</option>
                <option value="加熱式たばこ限定">加熱式たばこ限定</option>
                <option value="全面喫煙可">全面喫煙可</option>
              </select>
            </div>

            {/* 飲み放題フィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">飲み放題</label>
              <select 
                value={tempFilters.aycd} 
                onChange={(e) => handleFilterChange("aycd", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="有">有</option>
                <option value="無">無</option>
                <option value="不明">不明</option>
              </select>
            </div>

            {/* コースフィルター */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 mb-1">コース</label>
              <select 
                value={tempFilters.course} 
                onChange={(e) => handleFilterChange("course", e.target.value)}
                className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
              >
                <option value="指定なし">指定なし</option>
                <option value="有">有</option>
                <option value="無">無</option>
                <option value="不明">不明</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            {/* 検索ボタン：これをクリックした時だけ handleSearch が発火し、activeFilters が更新されます */}
            <button 
              onClick={handleSearch}
              className="px-8 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-sm"
            >
              検索する
            </button>
          </div>
        </div>
      </div>

      {/* 下部：一覧表示エリア */}
      <div className="w-full">
        <div className="mb-6 flex justify-between items-end">
          <h1 className="text-3xl font-bold text-primary">Discover Restaurants</h1>
          <p className="text-primary/70 font-medium">該当: {filteredRestaurants.length}件</p>
        </div>
        
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-accent/10 text-primary/50">
            条件に一致するレストランが見つかりません。
          </div>
        ) : (
          // Flexレイアウトで1カラム（1行に1つのコンテンツ）として縦に並べます
          <div className="flex flex-col gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
