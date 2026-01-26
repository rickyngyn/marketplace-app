import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../api";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMyListings() {
      try {
        const data = await apiGet("/api/listings/me");
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMyListings();
  }, []);

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  async function deleteListing(id) {
    const ok = window.confirm("Are you sure you want to delete this listing?");
    if (!ok) return;
    try {
      await apiDelete(`/api/listings/${id}`);
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">My Listings</h1>
          <p className="text-sm text-gray-600">Manage your listings</p>
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
          <p className="text-sm text-gray-600 pt-2 "> No listings</p>
        ) : (
          <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <Card className="max-w-64 p-4">
                <li key={listing.id}>
                  <Link to={`/listings/${listing.id}`}>
                    <div className="font-bold truncate">{listing.title}</div>
                    <div className="font-semibold truncate">${listing.price}</div>
                  </Link>
                  <div className="text-xs mb-2 truncate">
                    Created: {new Date(listing.created_at).toLocaleString()}
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => deleteListing(listing.id)}>
                      Delete
                    </Button>
                    <Link to={`/listings/${listing.id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
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
