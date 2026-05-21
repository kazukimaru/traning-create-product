import { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import { FaRegCommentDots, FaStar, FaUserCircle, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import type { Review } from "../types";
import { addReaction, deleteReview, updateReview } from "../lib/api";

export default function ReviewThread({ review, restaurantId, onReviewAdded }: { review: Review, restaurantId: number, onReviewAdded: () => void }) {
  // --- 状態（State）の定義 ---
  const [isReplying, setIsReplying] = useState(false); // 返信フォームを開いているかどうか
  
  // 編集モード関連のState
  const [isEditing, setIsEditing] = useState(false); // この親レビューが編集モードかどうか
  const [editBody, setEditBody] = useState(review.reviewBody); // 編集中のテキスト内容
  
  // 現在ログイン中のユーザー（HeaderのMock SSOと連動）
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    // コンポーネントがマウントされた時にlocalStorageから現在のユーザーを取得
    const stored = localStorage.getItem("sso_email");
    if (stored) setCurrentUser(stored);
  }, []);

  // --- ヘルパー関数 ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  // --- アクション処理 ---
  
  // リアクションスタンプを押した時の処理
  const handleReaction = async (reviewId: number, emoji: string) => {
    await addReaction(restaurantId, reviewId, emoji);
    onReviewAdded(); // APIを叩いて最新を取得（親コンポーネントの fetchDetail 等）
  };

  // コメントを削除する処理
  const handleDelete = async (reviewId: number) => {
    // 誤操作を防ぐための確認ダイアログ
    if (!window.confirm("このコメントを削除してもよろしいですか？")) return;
    
    // API側に削除をリクエスト（内部で filter を使って配列から即座に消しています）
    await deleteReview(restaurantId, reviewId);
    
    // 削除が完了したら、親コンポーネントに変更を通知して画面を再描画（最新データ取得）
    onReviewAdded();
  };

  // 編集内容を保存する処理
  const handleSaveEdit = async () => {
    if (!editBody.trim()) return; // 空文字での保存は防ぐ
    
    // API側に更新をリクエスト
    await updateReview(restaurantId, review.id, editBody);
    
    setIsEditing(false); // 編集モードを終了
    onReviewAdded(); // 最新データを取得
  };

  // --- 子コンポーネント（リアクションバー） ---
  const ReactionBar = ({ currentReview }: { currentReview: Review }) => (
    <div className="flex items-center gap-2 mt-3">
      {["👍", "❤️", "🎉", "💡"].map(emoji => {
        const count = currentReview.reactions?.[emoji] || 0;
        return (
          <button
            key={emoji}
            onClick={() => handleReaction(currentReview.id, emoji)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              count > 0 ? "bg-accent/10 text-accent border border-accent/20" : "bg-primary/5 text-primary/50 hover:bg-primary/10 border border-transparent"
            }`}
          >
            <span>{emoji}</span>
            {count > 0 && <span>{count}</span>}
          </button>
        );
      })}
    </div>
  );

  // --- 描画処理（JSX） ---
  return (
    <div className="bg-white rounded-2xl p-6 border border-accent/10 shadow-sm">
      <div className="flex gap-4">
        {/* アイコン */}
        <div className="flex-shrink-0 pt-1">
          <FaUserCircle size={40} className="text-accent/50" />
        </div>
        
        {/* メインコンテンツ */}
        <div className="flex-1">
          {/* ユーザー情報と投稿日時、星評価 */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-primary flex items-center flex-wrap gap-2">
                {review.userName}
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-normal">
                  {review.company}
                </span>
                {review.projectName && (
                  <span className="text-xs bg-primary/10 text-primary/80 px-2 py-0.5 rounded-full font-normal border border-primary/10">
                    📂 {review.projectName}
                  </span>
                )}
              </div>
              <div className="text-xs text-primary/50 mt-0.5">{formatDate(review.reviewTime)}</div>
            </div>
            
            {review.rate > 0 && (
              <div className="flex items-center gap-1 text-accent font-semibold bg-accent/5 px-2 py-1 rounded-lg">
                <FaStar size={14} fill="currentColor" />
                <span>{review.rate}</span>
                <span className="text-primary/30 mx-1">|</span>
                <span className="text-sm text-primary/70">{review.numberOfPeople} ppl</span>
              </div>
            )}
          </div>
          
          {/* ★ インライン編集機能（自分のみ） ★ */}
          <div className="mt-3">
            {isEditing ? (
              // 編集モードの場合：textareaを表示
              <div className="bg-background/50 p-3 rounded-xl border border-accent/30">
                <textarea
                  className="w-full bg-transparent focus:outline-none resize-none text-primary/90"
                  rows={3}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={() => { setIsEditing(false); setEditBody(review.reviewBody); }} className="flex items-center gap-1 text-xs text-primary/50 hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-black/5">
                    <FaTimes /> キャンセル
                  </button>
                  <button onClick={handleSaveEdit} className="flex items-center gap-1 text-xs bg-accent text-white px-3 py-1 rounded-full hover:bg-accent/90 transition-colors">
                    <FaCheck /> 保存
                  </button>
                </div>
              </div>
            ) : (
              // 通常モードの場合：テキストをそのまま表示
              <p className="text-primary/90 whitespace-pre-wrap">{review.reviewBody}</p>
            )}
          </div>

          {/* 添付画像 */}
          {review.imageUrl && (
            <div className="mt-3">
              <img src={review.imageUrl} alt="Review attachment" className="w-full max-w-sm rounded-xl object-cover h-48 border border-accent/10" />
            </div>
          )}

          {/* リアクションバー */}
          <ReactionBar currentReview={review} />
          
          {/* 操作ボタン群（返信・編集・削除） */}
          <div className="mt-2 flex gap-4 items-center">
            {/* 返信ボタン：誰でも押せる */}
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm font-semibold text-primary/60 hover:text-accent transition-colors flex items-center gap-1"
            >
              <FaRegCommentDots size={14} />
              Reply
            </button>

            {/* 編集・削除ボタン：投稿者が「自分」の場合のみ表示 */}
            {review.userName === currentUser && !isEditing && (
              <>
                <div className="w-px h-3 bg-primary/20"></div> {/* 区切り線 */}
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-primary/50 hover:text-accent transition-colors flex items-center gap-1"
                >
                  <FaEdit size={12} />
                  編集
                </button>
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <FaTrash size={12} />
                  削除
                </button>
              </>
            )}
          </div>

          {/* 返信フォーム */}
          {isReplying && (
            <div className="mt-4">
              <ReviewForm 
                restaurantId={restaurantId} 
                parentId={review.id} 
                onCancel={() => setIsReplying(false)} 
                onSuccess={onReviewAdded}
              />
            </div>
          )}

          {/* 返信（リプライ）のループ処理 */}
          {review.replies && review.replies.length > 0 && (
            <div className="mt-6 space-y-4">
              {review.replies.map((reply: Review) => (
                <div key={reply.id} className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaUserCircle size={32} className="text-accent/30" />
                  </div>
                  
                  <div className="flex-1 bg-background/50 rounded-2xl p-4 border border-accent/5 relative group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-primary text-sm flex flex-wrap items-center gap-2">
                        {reply.userName}
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-normal">
                          {reply.company}
                        </span>
                        {reply.projectName && (
                          <span className="text-xs bg-primary/10 text-primary/80 px-2 py-0.5 rounded-full font-normal border border-primary/10">
                            📂 {reply.projectName}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-primary/40 shrink-0">{formatDate(reply.reviewTime)}</div>
                    </div>
                    
                    <p className="text-sm text-primary/80">{reply.reviewBody}</p>

                    {reply.imageUrl && (
                      <div className="mt-3">
                        <img src={reply.imageUrl} alt="Reply attachment" className="w-full max-w-sm rounded-xl object-cover h-40 border border-accent/10" />
                      </div>
                    )}

                    <ReactionBar currentReview={reply} />

                    {/* リプライ側の削除ボタン（自分のみ） */}
                    {reply.userName === currentUser && (
                      <div className="mt-2 text-right">
                        <button 
                          onClick={() => handleDelete(reply.id)}
                          className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <FaTrash size={12} />
                          削除
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
