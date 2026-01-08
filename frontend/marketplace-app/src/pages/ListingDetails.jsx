import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../api";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const data = await apiGet(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchListing();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/">Back to Browse</Link>
      <h1>{listing.title}</h1>
      <p>${listing.price}</p>
      <p>{listing.description || "No description available."}</p>
      <p>
        Seller: {listing.first_name} {listing.last_name}
      </p>
    </div>
  );
}
