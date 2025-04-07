import React, { useState } from "react";
import { useUser } from "../auth/AuthProvider";
import axios from "axios";

export function AuctionCreate() {
  const { user } = useUser();
  const [form, setForm] = useState({
    title: "",
    condition: "new",
    currentBid: "",
    description: "", // This might come from auth context
    datePosted: new Date().toISOString().split("T")[0], // e.g., "2025-04-06"
    priceNew: "",
  });

  const [images, setImages] = useState([]);
  console.log(images);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auction = {
      ...form,
      currentBid: Number(form.currentBid),
      priceNew: Number(form.priceNew),
      authorId: user.id,
    };

    if (images?.length) {
      auction.images = await convertToBase64(images[0]);
    }

    try {
      const res = await axios.post("https://sports-stop.onrender.com/auctions", auction, {
        withCredentials: true,
      });

      alert("Auction created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting auction.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Auction Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Condition</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Starting Bid</label>
          <input
            type="number"
            name="currentBid"
            value={form.currentBid}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price New</label>
          <input
            type="number"
            name="priceNew"
            value={form.priceNew}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="flex gap-2 mt-2">
            {images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
