import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

export default function Header() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sso_email");
    if (stored) setEmail(stored);
  }, []);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    localStorage.setItem("sso_email", val);
  };

  return (
    <header className="bg-background shadow-sm border-b border-accent/20 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <FaUtensils className="text-accent" />
          Simplex Banquet
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary/70">Mock SSO:</span>
          <input 
            type="email" 
            placeholder="email@example.com"
            value={email}
            onChange={handleLogin}
            className="border border-accent/40 rounded-full px-4 py-1 text-sm bg-white focus:outline-none focus:border-accent"
          />
        </div>
      </div>
    </header>
  );
}
