import { getRestaurant } from "@/lib/api";
import Link from "next/link";
import { FaArrowLeft, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";
import ReviewThread from "@/components/ReviewThread";
import ReviewForm from "@/components/ReviewForm";

export default async function RestaurantDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const restaurant = await getRestaurant(params.id);

  if (!restaurant) {
    return <div className="text-center py-20 text-primary/50">Restaurant not found.</div>;
  }

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-accent font-medium mb-6 transition-colors">
        <FaArrowLeft size={16} /> Back to list
      </Link>
      
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
              <div className="font-bold text-primary">{restaurant.maxPeople || '?'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${restaurant.isSmoke ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              🚬
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Smoking</div>
              <div className="font-bold text-primary">{restaurant.isSmoke ? 'Allowed' : 'No'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${restaurant.isCourse ? 'bg-green-50 text-green-500' : 'bg-primary/5 text-primary/40'}`}>
              🍽️
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">Course</div>
              <div className="font-bold text-primary">{restaurant.isCourse ? 'Available' : 'No'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${restaurant.isAycd ? 'bg-green-50 text-green-500' : 'bg-primary/5 text-primary/40'}`}>
              🍻
            </div>
            <div>
              <div className="text-xs text-primary/50 font-semibold uppercase tracking-wider">All-You-Can-Drink</div>
              <div className="font-bold text-primary">{restaurant.isAycd ? 'Available' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Reviews & Discussions</h2>
          {restaurant.reviews && restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review: any) => (
              <ReviewThread key={review.id} review={review} restaurantId={restaurant.id} />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-accent/10 text-primary/50">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
        </div>
        <div>
          <div className="sticky top-24">
            <ReviewForm restaurantId={restaurant.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
