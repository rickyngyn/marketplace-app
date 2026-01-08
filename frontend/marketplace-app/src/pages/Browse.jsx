import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";

export default function Browse() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

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
    <div style={{ padding: "20px" }}>
      <div>
        <h1>Browse Listings</h1>
        <p><Link to="/create">Create Listing</Link></p>
      </div>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <Link to={`/listings/${listing.id}`}>
                {listing.title} - ${listing.price}
              </Link>
              <div>
                Seller: {listing.first_name} {listing.last_name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
