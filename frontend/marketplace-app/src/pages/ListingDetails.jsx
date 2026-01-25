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
      <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
      <p className="text-md font-semibold">${listing.price}</p>
      <div className="py-5">
        <p className="font-semibold">Details</p>
        <p className="text-sm">{listing.description || "No description available."}</p>
      </div>
      <p className="font-semibold">Seller Information</p>
      
      <div className="text-sm">
        <p>
          {listing.first_name} {listing.last_name}
        </p>
        <p>{listing.contact_info}</p>
      </div>
    </div>
  );
}
