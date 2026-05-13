import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { FaRegCommentDots, FaStar, FaUserCircle } from "react-icons/fa";
import type { Review } from "../types";

export default function ReviewThread({ review, restaurantId, onReviewAdded }: { review: Review, restaurantId: number, onReviewAdded: () => void }) {
  const [isReplying, setIsReplying] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-accent/10 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-1">
          <FaUserCircle size={40} className="text-accent/50" />
        </div>
        <div className="flex-1">
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
          
          <p className="mt-3 text-primary/90 whitespace-pre-wrap">{review.reviewBody}</p>
          
          <div className="mt-4 flex gap-4">
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm font-semibold text-primary/60 hover:text-accent transition-colors flex items-center gap-1"
            >
              <FaRegCommentDots size={14} />
              Reply
            </button>
          </div>

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

          {/* Replies */}
          {review.replies && review.replies.length > 0 && (
            <div className="mt-6 space-y-4">
              {review.replies.map((reply: Review) => (
                <div key={reply.id} className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <FaUserCircle size={32} className="text-accent/30" />
                  </div>
                  <div className="flex-1 bg-background/50 rounded-2xl p-4 border border-accent/5">
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
