import Link from "next/link";
import { FaUsers, FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 border border-accent/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-accent group-hover:shadow-brown cursor-pointer h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-primary">{restaurant.name}</h2>
          <div className="flex items-center gap-1 text-accent font-semibold">
            <FaStar size={16} fill="currentColor" />
            <span>{restaurant.rateAverage > 0 ? restaurant.rateAverage.toFixed(1) : '-'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-primary/70 mb-2 text-sm">
          <FaMapMarkerAlt size={14} />
          <span>{restaurant.area}</span>
          <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs text-accent">{restaurant.genre}</span>
        </div>
        
        <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-primary/60 border-t border-accent/10">
          <div className="flex items-center gap-1">
            <FaUsers size={14} />
            <span>Up to {restaurant.maxPeople}</span>
          </div>
          <div className="flex gap-2">
            {restaurant.isSmoke && <span title="Smoking Allowed">🚬</span>}
            {restaurant.isCourse && <span title="Course Available">🍽️</span>}
            {restaurant.isAycd && <span title="All You Can Drink">🍻</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
