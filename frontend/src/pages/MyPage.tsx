import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEdit, FaCheck, FaTimes, FaBookmark, FaRegCommentDots, FaStar } from "react-icons/fa";
import { getRestaurants } from "../lib/api";
import type { Restaurant, Review } from "../types";

export default function MyPage() {
  // --- 1. 左側：プロフィールの状態管理 ---
  // SSOのモックとしてlocalStorageを使っているため、そこから初期値を取得します
  const [email, setEmail] = useState("");
  const [name, setName] = useState("テスト ユーザー");
  const [department, setDepartment] = useState("営業部");
  
  // プロフィール編集モードのON/OFF
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // 編集中の入力値を保持するState（保存ボタンを押すまではここに仮置きする）
  const [editName, setEditName] = useState(name);
  const [editDepartment, setEditDepartment] = useState(department);

  // --- 2. 右側：タブとデータの一覧 ---
  // 現在選択されているタブ（"reviews" | "comments" | "bookmarks"）
  const [activeTab, setActiveTab] = useState<"reviews" | "comments" | "bookmarks">("reviews");
  
  // 画面に表示するためのレストランや口コミのデータを保持する
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);

  // 初期データの取得
  useEffect(() => {
    const storedEmail = localStorage.getItem("sso_email") || "test@example.com";
    setEmail(storedEmail);

    const fetchAll = async () => {
      const data = await getRestaurants();
      setAllRestaurants(data);
    };
    fetchAll();
  }, []);

  // プロフィール保存処理
  const handleSaveProfile = () => {
    setName(editName);
    setDepartment(editDepartment);
    setIsEditingProfile(false); // 編集モードを終了
  };

  // --- 3. タブごとのデータ抽出ロジック ---
  // 過去の口コミ（親レビュー）を自分が書いたものだけに絞り込む
  const myReviews: { restaurant: Restaurant; review: Review }[] = [];
  // 過去のコメント（返信）を自分が書いたものだけに絞り込む
  const myComments: { restaurant: Restaurant; review: Review }[] = [];
  
  allRestaurants.forEach(restaurant => {
    restaurant.reviews?.forEach(review => {
      // 自分が書いた親レビューの場合
      if (review.userName === email) {
        myReviews.push({ restaurant, review });
      }
      // 自分が書いた返信（リプライ）の場合
      review.replies?.forEach(reply => {
        if (reply.userName === email) {
          myComments.push({ restaurant, review: reply });
        }
      });
    });
  });

  // ブックマーク（今回はモックとして適当に最初から2件を抽出）
  const myBookmarks = allRestaurants.slice(0, 2);

  // 日付のフォーマット関数
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  // --- 4. 画面の描画（JSX） ---
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* 左側：プロフィールエリア */}
      <div className="w-full md:w-1/3 shrink-0">
        <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-brown sticky top-24">
          <div className="flex flex-col items-center text-center">
            <FaUserCircle size={80} className="text-accent/50 mb-4" />
            
            {isEditingProfile ? (
              // 編集モード
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-primary/60 mb-1 text-left">名前</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent text-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary/60 mb-1 text-left">部署</label>
                  <input 
                    type="text" 
                    value={editDepartment}
                    onChange={e => setEditDepartment(e.target.value)}
                    className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent text-primary text-sm"
                  />
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl text-primary/60 hover:bg-black/5 text-sm transition-colors flex items-center gap-1"
                  >
                    <FaTimes /> キャンセル
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 text-sm font-bold transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <FaCheck /> 保存する
                  </button>
                </div>
              </div>
            ) : (
              // 通常表示モード
              <>
                <h2 className="text-2xl font-bold text-primary mb-1">{name}</h2>
                <p className="text-primary/60 font-medium mb-1">{department}</p>
                <p className="text-primary/40 text-sm mb-6">{email}</p>
                
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full py-2 border border-accent/30 text-accent font-semibold rounded-xl hover:bg-accent/5 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEdit /> プロフィールを編集
                </button>
              </>
            )}
          </div>
          
          <div className="mt-8 pt-8 border-t border-accent/10">
            <div className="flex justify-between items-center mb-4 text-primary/80">
              <span className="text-sm font-semibold">クチコミ投稿数</span>
              <span className="font-bold text-lg">{myReviews.length}件</span>
            </div>
            <div className="flex justify-between items-center text-primary/80">
              <span className="text-sm font-semibold">獲得リアクション</span>
              <span className="font-bold text-lg">12個</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右側：タブとコンテンツエリア */}
      <div className="flex-1">
        {/* タブメニュー */}
        <div className="flex gap-4 mb-6 border-b border-accent/20">
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
              activeTab === "reviews" ? "text-accent" : "text-primary/50 hover:text-primary/80"
            }`}
          >
            <span className="flex items-center gap-2"><FaStar /> 過去の口コミ</span>
            {activeTab === "reviews" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab("comments")}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
              activeTab === "comments" ? "text-accent" : "text-primary/50 hover:text-primary/80"
            }`}
          >
            <span className="flex items-center gap-2"><FaRegCommentDots /> 過去のコメント</span>
            {activeTab === "comments" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full"></div>}
          </button>

          <button 
            onClick={() => setActiveTab("bookmarks")}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
              activeTab === "bookmarks" ? "text-accent" : "text-primary/50 hover:text-primary/80"
            }`}
          >
            <span className="flex items-center gap-2"><FaBookmark /> ブックマーク</span>
            {activeTab === "bookmarks" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full"></div>}
          </button>
        </div>

        {/* タブコンテンツ */}
        <div className="space-y-4">
          
          {/* 口コミタブの表示内容 */}
          {activeTab === "reviews" && (
            myReviews.length > 0 ? (
              myReviews.map((item, idx) => (
                // リスト全体をLinkで囲むことで、クリックしたらその飲食店の詳細画面へ飛ぶようにします
                <Link key={idx} to={`/restaurants/${item.restaurant.id}`} className="block group">
                  <div className="bg-white p-5 rounded-2xl border border-accent/10 shadow-sm hover:border-accent/40 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-primary text-lg group-hover:text-accent transition-colors">
                        {item.restaurant.name}
                      </div>
                      <div className="text-xs text-primary/40">{formatDate(item.review.reviewTime)}</div>
                    </div>
                    {item.review.rate > 0 && (
                      <div className="flex items-center gap-1 text-accent font-semibold mb-2 text-sm">
                        <FaStar /> {item.review.rate}
                      </div>
                    )}
                    <p className="text-primary/80 text-sm line-clamp-2">{item.review.reviewBody}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 text-primary/40">投稿した口コミはありません。</div>
            )
          )}

          {/* コメントタブの表示内容 */}
          {activeTab === "comments" && (
            myComments.length > 0 ? (
              myComments.map((item, idx) => (
                <Link key={idx} to={`/restaurants/${item.restaurant.id}`} className="block group">
                  <div className="bg-white p-5 rounded-2xl border border-accent/10 shadow-sm hover:border-accent/40 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-primary text-lg group-hover:text-accent transition-colors">
                        {item.restaurant.name}への返信
                      </div>
                      <div className="text-xs text-primary/40">{formatDate(item.review.reviewTime)}</div>
                    </div>
                    <p className="text-primary/80 text-sm line-clamp-2">{item.review.reviewBody}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 text-primary/40">投稿したコメントはありません。</div>
            )
          )}

          {/* ブックマークタブの表示内容 */}
          {activeTab === "bookmarks" && (
            myBookmarks.length > 0 ? (
              myBookmarks.map((restaurant) => (
                <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`} className="block group">
                  <div className="bg-white p-5 rounded-2xl border border-accent/10 shadow-sm hover:border-accent/40 hover:shadow-md transition-all flex items-center gap-4">
                    {restaurant.imageUrl && (
                      <img src={restaurant.imageUrl} alt={restaurant.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                    )}
                    <div>
                      <h3 className="font-bold text-primary text-lg group-hover:text-accent transition-colors mb-1">
                        {restaurant.name}
                      </h3>
                      <div className="text-xs text-primary/60 flex items-center gap-2">
                        <span>{restaurant.area}</span>
                        <span className="px-2 py-0.5 bg-background text-primary rounded-full">{restaurant.genre}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 text-primary/40">ブックマークはありません。</div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
