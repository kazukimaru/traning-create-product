import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookInfo } from '../types/book';

export default function ReturnConfirm() {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>(); // URLからIDを抽出
  
  const [book, setBook] = useState<BookInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasNoDataError, setHasNoDataError] = useState(false);
  const [serverSideError, setServerSideError] = useState<string | null>(null);

  // 💡 【API連携】2-4-1仕様：画面遷移時にこの本のデータをバックエンドから1件取得
  useEffect(() => {
    fetch(`/api/lending/${bookId}`)
      .then((res) => {
        if (res.status === 404) {
          setHasNoDataError(true); // 対象の貸出記録が存在しない
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('データ取得失敗:', err);
        setLoading(false);
      });
  }, [bookId]);

  // 💡 【API連携】2-4-2仕様：返却実行ボタンを押した時の処理
  const handleReturn = async () => {
    if (!book) return;

    try {
      const res = await fetch(`/api/lending/${book.id}/return`, {
        method: 'POST',
      });

      if (res.status === 400) {
        // すでに返却済みだった場合のエラーメッセージをバックエンドから受け取る
        const errorText = await res.text();
        setServerSideError(errorText);
        return;
      }

      if (res.ok) {
        // 成功したら一覧画面に戻り、メッセージを渡す
        const successMsg = `No.${book.id} : 『${book.title}』の返却を受け付けました。`;
        navigate('/', { state: { successMessage: successMsg } });
      }
    } catch (err) {
      setServerSideError('通信エラーが発生しました。再度お試しください。');
    }
  };

  if (loading) return <div className="container mt-4 text-muted text-center">読み込み中...</div>;

  // 2-4-1仕様：対象の貸出記録が存在しない場合のエラー画面
  if (hasNoDataError) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger p-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
          <h4 className="alert-heading font-weight-bold">システムエラー</h4>
          <p className="mb-0 font-weight-semibold">対象の貸出記録が存在しません。</p>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">
          一覧画面へ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-secondary" style={{ maxWidth: '800px' }}>
      <h2 className="h4 font-weight-bold border-bottom pb-2 text-dark">2-2. 詳細設計書_返却確認</h2>
      <p className="small text-muted mb-4">必要な情報が画面上から確認可能・入力可能・操作可能であれば問題ないものとする。</p>

      {/* バックエンド側から返却済みエラーが返ってきた場合の赤アラート */}
      {serverSideError && (
        <div className="alert alert-danger font-weight-bold" role="alert">
          {serverSideError}
        </div>
      )}

      {!book?.isReturned ? (
        // ==========================================
        // 2-2-1. 返却前のケース (isReturned === false)
        // ==========================================
        <div className="card p-4 border-dark shadow-sm bg-white">
          <h3 className="h5 font-weight-bold text-dark text-underline mb-4">2-2-1.返却前のケース</h3>
          <div className="my-3 text-body"><span className="font-weight-bold d-inline-block" style={{ width: '90px' }}>利用者</span><span>{book?.user}</span></div>
          <div className="my-3 text-body"><span className="font-weight-bold d-inline-block" style={{ width: '90px' }}>貸出書籍</span><span>{book?.id}:{book?.title}</span></div>
          <div className="mt-5 d-flex" style={{ gap: '15px' }}>
            <button onClick={() => navigate('/')} className="btn btn-secondary px-4">戻る</button>
            <button onClick={handleReturn} className="btn btn-info px-4 text-white font-weight-bold">返却</button>
          </div>
        </div>
      ) : (
        // ==========================================
        // 2-2-2. 返却済みのケース (isReturned === true)
        // ==========================================
        <div className="card p-4 border-dark shadow-sm bg-white">
          <h3 className="h5 font-weight-bold text-dark text-underline mb-4">2-2-2.返却済みのケース</h3>
          <div className="text-danger font-weight-bold mb-3 small">No.{book?.id} : 『{book?.title}』は、すでに返却されています。</div>
          <div className="my-3 text-body"><span className="font-weight-bold d-inline-block" style={{ width: '90px' }}>利用者</span><span>{book?.user}</span></div>
          <div className="my-3 text-body"><span className="font-weight-bold d-inline-block" style={{ width: '90px' }}>貸出書籍</span><span>{book?.id}:{book?.title}</span></div>
          <div className="mt-5 d-flex" style={{ gap: '15px' }}>
            {/* 戻るボタン（btn-secondaryでグレー）だけが動く状態 */}
            <button onClick={() => navigate('/')} className="btn btn-secondary px-4">戻る</button>
            {/* 返却ボタンはグレーアウト（disabled）され、マウスを乗せても禁止マークになる */}
            <button disabled className="btn btn-secondary px-4" style={{ cursor: 'not-allowed', opacity: 0.6 }}>返却</button>
          </div>
        </div>
      )}
    </div>
  );
}
