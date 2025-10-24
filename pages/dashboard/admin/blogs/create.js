"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function CreateBlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    shortDescription: "",
    content: "",
    coverImage: null,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    authorName: "",
    publishDate: new Date().toISOString().substring(0, 10),
  });

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags") {
        formDataToSend.append("tags", value.toString());
      } else if (key === "coverImage" && value) {
        formDataToSend.append("coverImage", value);
      } else {
        formDataToSend.append(key, value);
      }
    });

    const response = await fetch("/api/blogs/create", {
      method: "POST",
      body: formDataToSend,
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Blog post saved successfully!");
      // Reset form after success
      setFormData({
        title: "",
        slug: "",
        category: "",
        tags: "",
        shortDescription: "",
        content: "",
        coverImage: null,
        status: "draft",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        authorName: "",
        publishDate: new Date().toISOString().substring(0, 10),
      });
    } else {
      toast.error(`❌ Failed to save: ${result.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Save blog error:", error);
    toast.error("🚫 Error saving blog post. Check console for details.");
  }
};


  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="container-fluid p-4">
          <h4 className="fw-bold mb-4">Create New Blog Post</h4>

          <div className="create-blogs-area">
            <h3 className="fw-bold mb-4"></h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* LEFT COLUMN */}
                <div className="col-lg-8">
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">
                      {/* Title */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Enter post title"
                          value={formData.title}
                          onChange={handleTitleChange}
                          required
                        />
                      </div>

                      {/* Slug */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Slug (URL)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="auto-generated-from-title"
                          readOnly
                        />
                      </div>

                      {/* Short Description */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Short Description
                        </label>
                        <textarea
                          className="form-control"
                          name="shortDescription"
                          rows={3}
                          value={formData.shortDescription}
                          onChange={handleChange}
                          placeholder="A short summary of the post..."
                        />
                      </div>

                      {/* Content */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Content
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={(val) =>
                            setFormData((prev) => ({ ...prev, content: val }))
                          }
                          placeholder="Write your article here..."
                          style={{ height: "300px", marginBottom: "60px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-lg-4">
                  {/* Publish Settings */}
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white fw-semibold">
                      Publish Settings
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Publish Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="publishDate"
                          value={formData.publishDate}
                          onChange={handleChange}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                        Save Post
                      </button>
                    </div>
                  </div>

                  {/* Category & Tags */}
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white fw-semibold">
                      Category & Tags
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Category
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          placeholder="e.g. Digital Marketing"
                          value={formData.category}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Tags</label>
                        <input
                          type="text"
                          className="form-control"
                          name="tags"
                          placeholder="Comma separated (SEO, Marketing, Branding)"
                          value={formData.tags}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white fw-semibold">
                      Cover Image
                    </div>
                    <div className="card-body">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control mb-2"
                      />
                      {formData.coverImage && (
                        <img
                          src={URL.createObjectURL(formData.coverImage)}
                          alt="Preview"
                          className="img-fluid rounded shadow-sm"
                        />
                      )}
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white fw-semibold">
                      SEO Settings
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="metaTitle"
                          value={formData.metaTitle}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Meta Description
                        </label>
                        <textarea
                          className="form-control"
                          name="metaDescription"
                          rows={2}
                          value={formData.metaDescription}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Meta Keywords
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="metaKeywords"
                          placeholder="keywords, separated, by, commas"
                          value={formData.metaKeywords}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white fw-semibold">
                      Author
                    </div>
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-control"
                        name="authorName"
                        placeholder="Author name"
                        value={formData.authorName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
