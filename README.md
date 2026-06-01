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

--------------------------------------------
DTO
package com.example.library.dto;

public class ReturnDto {
    private Integer id;
    private String title;
    private String name;
    private Boolean onLend; // 💡 プロジェクトのルール「onLend」に統一

    public ReturnDto(Integer id, String title, String name, Boolean onLend) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.onLend = onLend;
    }

    // ゲッター・セッター
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getOnLend() { return onLend; }
    public void setOnLend(Boolean onLend) { this.onLend = onLend; }
}

--------------------------------------------
Repository
package com.example.library.repository;

import com.example.library.dto.ReturnDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public class ReturnRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 💡 【2-4-1仕様】サーキュレーションIDで検索し、一撃でReturnDtoの形にする
     * プロジェクトのルールである「cr.id is not null as on_lend」で貸出中判定を行います。
     */
    public Optional<ReturnDto> findReturnDtoById(Integer id) {
        String sql = """
                select 
                    cr.id,
                    pt.title,
                    m.name,
                    cr.id is not null as on_lend
                from circulation_record cr
                inner join collection c on cr.collection_id = c.id
                inner join published_title pt on pt.id = c.published_title_id
                inner join member m on m.id = cr.member_id
                where cr.id = ?
                """;
        
        try {
            ReturnDto dto = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                return new ReturnDto(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("name"),
                        rs.getBoolean("on_lend")
                );
            }, id);
            return Optional.ofNullable(dto);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty(); // 404エラー用
        }
    }

    /**
     * 💡 【2-4-2仕様】実際の返却日（actual_return_date）を本日の日付で更新する
     */
    public void updateActualReturnDate(Integer id, LocalDate date) {
        String sql = """
                update circulation_record 
                set actual_return_date = ? 
                where id = ?
                """;
        jdbcTemplate.update(sql, Date.valueOf(date), id);
    }
}

----------------------------------------
Service
package com.example.library.service;

import com.example.library.dto.ReturnDto;
import com.example.library.repository.ReturnRepository;
import com.example.library.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ReturnService {

    @Autowired
    private ReturnRepository repository;

    // 1. 画面を開いた時のデータ検索（2-4-1仕様）
    public ReturnDto findById(Integer id) {
        return repository.findReturnDtoById(id)
                .orElseThrow(() -> new ResourceNotFoundException("対象の貸出記録が存在しません。"));
    }

    // 2. 返却ボタンを押した時のバリデーションと更新（2-4-2仕様）
    @Transactional
    public ReturnDto executeReturn(Integer id) {
        ReturnDto currentDto = repository.findReturnDtoById(id)
                .orElseThrow(() -> new ResourceNotFoundException("対象の貸出記録が存在しません。"));

        // 💡 既存ルールに合わせ、onLendがfalse（＝貸出中ではない）なら、すでに返却済みエラーとする
        if (!currentDto.getOnLend()) {
            throw new IllegalStateException("No." + id + " : 『" + currentDto.getTitle() + "』は、すでに返却されています。");
        }

        // 正常ルート：本日の日付でDBをPUT更新
        repository.updateActualReturnDate(id, LocalDate.now());

        // 返却完了したため、フラグをfalseに書き換えてフロントへ返却
        currentDto.setOnLend(false);
        return currentDto;
    }
}

---------------------------------------
Contolloer
package com.example.library.controller;

import com.example.library.dto.ReturnDto;
import com.example.library.service.ReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lending")
public class ReturnController {

    @Autowired
    private ReturnService service;

    // 画面のデータ取得 (GET)
    @GetMapping("/{id}")
    public ResponseEntity<ReturnDto> getReturnInfo(@PathVariable Integer id) {
        ReturnDto dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    // 返却実行 (PUT)
    @PutMapping("/{id}/return")
    public ResponseEntity<ReturnDto> processReturn(@PathVariable Integer id) {
        ReturnDto resultDto = service.executeReturn(id);
        return ResponseEntity.ok(resultDto);
    }
}

-----------------------------------------
Advice
// src/main/java/.../library/exception/ResourceNotFoundException.java
package com.example.library.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) { super(message); }
}

-------------------------
// src/main/java/.../library/exception/GlobalExceptionHandler.java
package com.example.library.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 2-4-1仕様：データがない場合は 404 Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // 2-4-2仕様：すでに返却済みなどの不正操作は 400 Bad Request
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleBadRequest(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}


