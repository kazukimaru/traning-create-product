import { useState, useEffect } from "react";
import { getUserCompany, postReview } from "../lib/api";

export default function ReviewForm({ restaurantId, parentId = null, onCancel, onSuccess }: { restaurantId: number, parentId?: number | null, onCancel?: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectName, setProjectName] = useState("");
  const [showCompanyInput, setShowCompanyInput] = useState(false);
  const [content, setContent] = useState("");
  const [rate, setRate] = useState(5);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sso_email");
    if (stored) {
      setEmail(stored);
      checkCompany(stored);
    }
  }, []);

  const checkCompany = async (userEmail: string) => {
    try {
      const existingCompany = await getUserCompany(userEmail);
      if (!existingCompany) {
        setShowCompanyInput(true);
      } else {
        setShowCompanyInput(false);
      }
    } catch (e) {
      setShowCompanyInput(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please set Mock SSO email in the header first.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    
    try {
      await postReview({
        restaurantId,
        email,
        company: showCompanyInput ? company : undefined,
        projectName: projectName.trim() ? projectName : undefined,
        parentId,
        content,
        rate: parentId ? undefined : rate,
        numberOfPeople: parentId ? undefined : numberOfPeople,
      });
      
      setContent("");
      onSuccess();
      if (onCancel) onCancel();
    } catch (err: any) {
      setError(err.message || "Failed to post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-accent/20 shadow-sm mt-4">
      <h3 className="font-bold text-primary mb-4">{parentId ? "Reply to review" : "Write a review"}</h3>
      
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-sm text-primary/70 mb-1">Project Name (Optional)</label>
        <input 
          type="text" 
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent"
          placeholder="e.g. Project Alpha Kickoff"
        />
      </div>

      {showCompanyInput && (
        <div className="mb-4">
          <label className="block text-sm text-primary/70 mb-1">Your Department/Company (First time only)</label>
          <input 
            required 
            type="text" 
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent"
            placeholder="e.g. Sales Dept."
          />
        </div>
      )}

      {!parentId && (
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-primary/70 mb-1">Rating (1-5)</label>
            <input 
              type="number" min="1" max="5" required
              value={rate} onChange={e => setRate(Number(e.target.value))}
              className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-primary/70 mb-1">Number of People</label>
            <input 
              type="number" min="1" required
              value={numberOfPeople} onChange={e => setNumberOfPeople(Number(e.target.value))}
              className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-primary/70 mb-1">Comment</label>
        <textarea 
          required
          rows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border border-accent/30 rounded-xl px-4 py-2 focus:outline-none focus:border-accent resize-none"
          placeholder="Share your experience..."
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 text-primary/60 hover:bg-accent/10 rounded-xl transition-colors">
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 font-semibold"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
