import { useState, useEffect } from "react";
import { getRestaurants } from "../lib/api";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant, FilterConditions } from "../types";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
      setFilteredRestaurants(data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (key: keyof FilterConditions, value: string) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setActiveFilters(tempFilters);
  };

  useEffect(() => {
    const result = restaurants.filter(r => {
      if (activeFilters.area !== "指定なし" && r.area !== activeFilters.area) return false;
      if (activeFilters.scene !== "指定なし" && !r.scenes.includes(activeFilters.scene)) return false;
      if (activeFilters.genre !== "指定なし" && r.genre !== activeFilters.genre) return false;
      if (activeFilters.budget !== "指定なし") {
        if (activeFilters.budget === "~3000" && r.budget > 3000) return false;
        if (activeFilters.budget === "3001~5000" && (r.budget < 3001 || r.budget > 5000)) return false;
        if (activeFilters.budget === "5001~8000" && (r.budget < 5001 || r.budget > 8000)) return false;
        if (activeFilters.budget === "8001~10000" && (r.budget < 8001 || r.budget > 10000)) return false;
        if (activeFilters.budget === "10001~20000" && (r.budget < 10001 || r.budget > 20000)) return false;
        if (activeFilters.budget === "20001~" && r.budget <= 20000) return false;
      }
      if (activeFilters.peopleCount !== "指定なし") {
        const requiredPeople = Number(activeFilters.peopleCount);
        if (r.maxPastPeople < requiredPeople) return false;
      }
      if (activeFilters.department !== "指定なし" && r.department !== activeFilters.department) return false;
      if (activeFilters.smoking !== "指定なし" && r.isSmoke !== activeFilters.smoking) return false;
      if (activeFilters.aycd !== "指定なし" && r.isAycd !== activeFilters.aycd) return false;
      if (activeFilters.course !== "指定なし" && r.isCourse !== activeFilters.course) return false;
      return true;
    });
    setFilteredRestaurants(result);
  }, [activeFilters, restaurants]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 左側：多機能フィルター */}
        <div className="w-full md:w-[320px] shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-brown border border-accent/20 sticky top-24">
            <h2 className="text-xl font-bold text-primary mb-6">絞り込み検索</h2>
            
            <div className="space-y-4">
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

              <div>
                <label className="block text-xs font-semibold text-primary/60 mb-1">人数</label>
                <select 
                  value={tempFilters.peopleCount} 
                  onChange={(e) => handleFilterChange("peopleCount", e.target.value)}
                  className="w-full p-2 rounded-xl border border-accent/30 bg-background/50 focus:outline-none focus:border-accent text-sm text-primary"
                >
                  <option value="指定なし">指定なし</option>
                  {Array.from({ length: 99 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num.toString()}>{num}名</option>
                  ))}
                </select>
              </div>

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

              <div className="flex gap-4">
                <div className="flex-1">
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
                <div className="flex-1">
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
            </div>

            <button 
              onClick={handleSearch}
              className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors shadow-sm"
            >
              検索する
            </button>
          </div>
        </div>

        {/* 右側：一覧表示エリア */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-end">
            <h1 className="text-3xl font-bold text-primary">Discover Restaurants</h1>
            <p className="text-primary/70 font-medium">該当: {filteredRestaurants.length}件</p>
          </div>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-accent/10 text-primary/50">
              条件に一致するレストランが見つかりません。
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
