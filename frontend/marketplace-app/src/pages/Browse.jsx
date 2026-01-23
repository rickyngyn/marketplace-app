import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { apiGet } from "../api";

export default function Browse() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await apiGet("/api/listings");
        setListings(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchListings();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Browse</h1>
          <p className="text-sm text-gray-600">Find posted items</p>
        </div>
      </div>

      <div className="mt-3">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div>
  //       <h1>Browse Listings</h1>
  //     </div>
  //     {listings.length === 0 ? (
  //       <p>No listings available.</p>
  //     ) : (
  //       <ul>
  //         {listings.map((listing) => (
  //           <li key={listing.id}>
  //             <Link to={`/listings/${listing.id}`}>
  //               {listing.title} - ${listing.price}
  //             </Link>
  //             <div>
  //               Seller: {listing.first_name} {listing.last_name}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
}
