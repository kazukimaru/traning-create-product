import { Link } from "react-router-dom";
import { FaUsers, FaStar, FaMapMarkerAlt, FaSmoking, FaGlassMartiniAlt, FaBuilding, FaWallet } from "react-icons/fa";
import type { Restaurant } from "../types";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 border border-accent/20 shadow-brown hover:-translate-y-1 hover:shadow-xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-6">
        
        {/* レストラン画像エリア */}
        {restaurant.imageUrl && (
          <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden rounded-xl">
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        {/* 詳細エリア */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-primary/60 text-sm">
                  <FaMapMarkerAlt />
                  <span>{restaurant.area}</span>
                  <span className="px-2 py-0.5 bg-background text-primary rounded-full text-xs font-semibold ml-2 border border-accent/20">
                    {restaurant.genre}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                  <FaStar className="text-accent" />
                  <span className="font-bold text-primary">{restaurant.rateAverage > 0 ? restaurant.rateAverage.toFixed(1) : '-'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.scenes.map((scene, idx) => (
                <span key={idx} className="px-3 py-1 bg-background rounded-full text-xs text-primary/70 border border-primary/10">
                  {scene}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-primary/80 font-medium text-sm mb-4">
              <FaWallet className="text-accent/60" />
              <span>〜¥{restaurant.budget.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-accent/10">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent/80">
                <FaUsers size={14} />
              </div>
              <div>
                <div className="text-[10px] text-primary/50 uppercase tracking-wider">過去最大利用</div>
                <div className="font-bold text-primary">{restaurant.maxPastPeople || '?'}名</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent/80">
                <FaBuilding size={14} />
              </div>
              <div>
                <div className="text-[10px] text-primary/50 uppercase tracking-wider">登録部門</div>
                <div className="font-bold text-primary">{restaurant.department}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent/80">
                <FaSmoking size={14} />
              </div>
              <div>
                <div className="text-[10px] text-primary/50 uppercase tracking-wider">喫煙可否</div>
                <div className="font-bold text-primary text-xs">{restaurant.isSmoke}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent/80">
                <FaGlassMartiniAlt size={14} />
              </div>
              <div>
                <div className="text-[10px] text-primary/50 uppercase tracking-wider">コース / 飲み放題</div>
                <div className="font-bold text-primary text-xs">{restaurant.isCourse} / {restaurant.isAycd}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
