import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { apiGet } from "../api";

export default function Browse() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase()),
  );

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
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {filteredListings.length} results
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div>
        {filteredListings.length === 0 ? (
          <p className="text-sm text-gray-600">No available listings</p>
        ) : (
          <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {filteredListings.map((listing) => (
              <Card className="max-w-64 p-4">
                <li key={listing.id}>
                  <Link to={`/listings/${listing.id}`}>
                    <div className="font-semibold">${listing.price}</div>
                    <div>{listing.title}</div>
                  </Link>
                  <div className="text-xs text-white-600 ">
                    Seller: {listing.first_name} {listing.last_name}
                  </div>
                </li>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
