import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { apiGet, apiDelete } from "../api";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div>
      <Link to="/">Back To Browse</Link>
      <h1>My Listings</h1>
      {listings.length === 0 ? (
        <p>You have no listings</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <Link to={`/listings/${listing.id}`}>
                {listing.title} - ${listing.price}
              </Link>
              <div>
                Created: {new Date(listing.created_at).toLocaleString()}
              </div>
              <button onClick={() => deleteListing(listing.id)}> Delete </button>
              <Link to={`/listings/${listing.id}/edit`}><button>Edit</button></Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
