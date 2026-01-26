import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiPatch, apiGet } from "../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contact_info, setContact] = useState("");

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
        setContact(data.contact_info);
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
        contact_info: contact_info.trim(),
        price: Number(price),
      });

      navigate(`/listings/${updated.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center mt-25 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Listing</CardTitle>
          <CardDescription>Change listing info</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="title"
                placeholder="Enter listing title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="price"
                placeholder="Enter listing price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_info">Contact Info</Label>
              <Input
                id="contact_info"
                type="contact_info"
                placeholder="e.g. 555 555 5555 or example@email.com"
                value={contact_info}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>

          <Link to="/listings/me">
            <Button className="w-full mt-2 bg-gray-600">
              Back
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
