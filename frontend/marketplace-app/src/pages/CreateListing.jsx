import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../api";

export default function CreateListing() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    console.log("Submitting form");
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
      const created = await apiPost("/api/listings", {
        title: title.trim(),
        description: description.trim() || null,
        price: Number(price),
      });

      navigate(`/listings/${created.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>

      <h1>Create Listing</h1>

      {error ? <div>{error}</div> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
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
              placeholder="Example: Desk lamp"
            />
          </label>
        </div>

        <div>
          <label>
            Description (optional)
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
              placeholder="Condition, pickup details, etc."
            />
          </label>
        </div>

        <div>
          <label>
            Price
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
              placeholder="Example: 19.99"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          {submitting ? "Submitting..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
