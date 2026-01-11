import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiPatch, apiGet } from "../api";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      try {
        const data = await apiGet(`/api/listings/${id}`);
        setTitle(data.title);
        setDescription(data.description || "");
        setPrice(data.price.toString());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (price === "" || Number.isNaN(Number(price))) {
      setError("Price must be a valid number");
      return;
    }

    setSubmitting(true);

    try {
      const updated = await apiPatch(`/api/listings/${id}`, {
        title: title.trim(),
        description: description.trim() || null,
        price: Number(price),
      });

      navigate(`/listings/${updated.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error && !submitting) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <Link to="/listings/me">Back to My Listings</Link>
      </div>

      <h1>Edit Listing</h1>

      {error ? <div>Error: {error}</div> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
            />
          </label>
        </div>

        <div>
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="Nubmer"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {" "}
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
