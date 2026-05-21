import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRestaurant } from "../lib/api";
import { FaArrowLeft, FaMapMarkerAlt, FaUsers, FaStar, FaWallet, FaBuilding, FaSmoking, FaGlassMartiniAlt } from "react-icons/fa";
import ReviewThread from "../components/ReviewThread";
import ReviewForm from "../components/ReviewForm";
import type { Restaurant, Review } from "../types";

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    if (!id) return;
    const data = await getRestaurant(id);
    setRestaurant(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!restaurant) return <div className="text-center py-20 text-primary/50">Restaurant not found.</div>;

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-accent font-medium mb-6 transition-colors">
        <FaArrowLeft size={16} /> Back to list
      </Link>
      
      {restaurant.imageUrl && (
        <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 border border-accent/20 shadow-brown relative">
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 border border-accent/20 shadow-brown mb-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary/70 font-medium">
              <span className="flex items-center gap-1"><FaMapMarkerAlt size={16} /> {restaurant.area}</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">{restaurant.genre}</span>
              <span>📞 {restaurant.phoneNumber}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-primary/70 font-medium mt-3">
              <div className="flex items-center gap-2">
                <FaWallet size={16} className="text-accent" />
                <span>〜¥{restaurant.budget.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.scenes.map((scene, idx) => (
                  <span key={idx} className="px-2 py-1 bg-primary/5 text-primary/70 text-xs rounded-md border border-primary/10">
                    {scene}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="flex items-center gap-2 text-3xl font-bold text-primary mb-1">
              <FaStar className="text-accent" fill="currentColor" size={28} />
              {restaurant.rateAverage > 0 ? restaurant.rateAverage.toFixed(1) : '-'}
            </div>
            <div className="text-sm text-primary/60">{restaurant.reviews?.length || 0} reviews</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-6 py-6 border-t border-b border-accent/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FaUsers size={20} />
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Max People</div>
              <div className="font-bold text-primary">{restaurant.maxPastPeople || '?'}名</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FaBuilding size={16} />
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Department</div>
              <div className="font-bold text-primary">{restaurant.department}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FaSmoking size={16} />
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Smoking</div>
              <div className="font-bold text-primary">{restaurant.isSmoke}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              🍽️
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Course</div>
              <div className="font-bold text-primary">{restaurant.isCourse}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FaGlassMartiniAlt size={16} />
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">All-You-Can-Drink</div>
              <div className="font-bold text-primary">{restaurant.isAycd}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Reviews & Discussions</h2>
          {restaurant.reviews && restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review: Review) => (
              <ReviewThread key={review.id} review={review} restaurantId={restaurant.id} onReviewAdded={fetchDetail} />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-accent/10 text-primary/50">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
        </div>
        <div>
          <div className="sticky top-24">
            <ReviewForm restaurantId={restaurant.id} onSuccess={fetchDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
