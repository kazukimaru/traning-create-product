import { Link } from "react-router-dom";
import { FaUsers, FaStar, FaMapMarkerAlt, FaSmoking, FaGlassMartiniAlt, FaBuilding, FaWallet } from "react-icons/fa";
import type { Restaurant } from "../types";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 border border-accent/20 transition-all duration-300 group-hover:scale-[1.01] group-hover:border-accent group-hover:shadow-brown cursor-pointer h-full flex flex-col md:flex-row gap-6">
        
        {/* 左側：基本情報 */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-primary">{restaurant.name}</h2>
            <div className="flex items-center gap-1 text-accent font-semibold text-lg bg-accent/5 px-3 py-1 rounded-full">
              <FaStar size={18} fill="currentColor" />
              <span>{restaurant.rateAverage > 0 ? restaurant.rateAverage.toFixed(1) : '-'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-primary/80 mb-3">
            <FaMapMarkerAlt size={16} className="text-accent" />
            <span className="font-medium">{restaurant.area}</span>
            <span className="px-3 py-1 bg-accent/10 rounded-full text-sm text-accent font-medium">{restaurant.genre}</span>
          </div>

          <div className="flex items-center gap-3 text-primary/80 mb-4">
            <FaWallet size={16} className="text-accent" />
            <span className="font-medium">〜¥{restaurant.budget.toLocaleString()}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.scenes.map((scene, idx) => (
              <span key={idx} className="px-2 py-1 bg-primary/5 text-primary/70 text-xs rounded-md border border-primary/10">
                {scene}
              </span>
            ))}
          </div>
        </div>

        {/* 右側：詳細スペック */}
        <div className="flex-1 md:border-l md:border-accent/10 md:pl-6 flex flex-col justify-center gap-3 text-sm text-primary/70">
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
            <div className="flex items-center gap-2"><FaUsers className="text-accent"/> 過去最大利用</div>
            <div className="font-bold text-primary">{restaurant.maxPastPeople}名</div>
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
            <div className="flex items-center gap-2"><FaBuilding className="text-accent"/> 登録部門</div>
            <div className="font-bold text-primary">{restaurant.department}</div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
            <div className="flex items-center gap-2"><FaSmoking className="text-accent"/> 喫煙可否</div>
            <div className="font-bold text-primary">{restaurant.isSmoke}</div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
            <div className="flex items-center gap-2"><FaGlassMartiniAlt className="text-accent"/> コース / 飲み放題</div>
            <div className="font-bold text-primary">{restaurant.isCourse} / {restaurant.isAycd}</div>
          </div>

        </div>

      </div>
    </Link>
  );
}
