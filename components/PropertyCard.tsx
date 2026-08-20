// components/PropertyCard.tsx
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  single: "SINGLES",
  bedsitter: "BEDSITTERS",
  one_bedroom: "ONE BEDROOM",
  two_bedroom: "TWO BEDROOM",
  shop: "SHOPS",
  office: "OFFICES",
};

export default function PropertyCard({ property }: { property: any }) {
  const photoCount = property.images?.length || 0;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="block bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0"
    >
      <div className="relative">
        {property.images?.[0] ? (
          <img src={property.images[0]} alt={property.title} className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-gray-100" />
        )}
        {property.featured && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold rounded-full px-3 py-1">
            FEATURED
          </span>
        )}
        {photoCount > 0 && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs rounded-full px-2 py-0.5">
            1/{photoCount}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
            {CATEGORY_LABELS[property.category] || property.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            📍 {property.subLocation?.name}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-navy">Ksh {property.price.toLocaleString()}</p>
          <span className="text-xs font-semibold bg-brand-gradient text-white rounded-full px-4 py-1.5">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
