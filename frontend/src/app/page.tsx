import { getRestaurants } from "@/lib/api";
import RestaurantCard from "@/components/RestaurantCard";

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Discover Restaurants</h1>
          <p className="text-primary/70 mt-2">Find the perfect spot for your next team gathering.</p>
        </div>
      </div>
      
      {restaurants.length === 0 ? (
        <div className="text-center py-20 text-primary/50">
          No restaurants found. Make sure the backend is running.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant: any) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
