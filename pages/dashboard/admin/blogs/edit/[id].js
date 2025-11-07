"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query; // blog ID from URL
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

  const [existingCover, setExistingCover] = useState(""); // store existing image url

  // Load blog data if editing
  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/getAll?id=${id}`);
        const data = await res.json();
        if (data.success && data.blog) {
          setFormData({
            title: data.blog.title || "",
            slug: data.blog.slug || "",
            category: data.blog.category || "",
            tags: data.blog.tags ? data.blog.tags.join(", ") : "",
            shortDescription: data.blog.shortDescription || "",
            content: data.blog.content || "",
            coverImage: null,
            status: data.blog.status || "draft",
            metaTitle: data.blog.metaTitle || "",
            metaDescription: data.blog.metaDescription || "",
            metaKeywords: data.blog.metaKeywords || "",
            authorName: data.blog.authorName || "",
            publishDate: data.blog.publishDate
              ? data.blog.publishDate.substring(0, 10)
              : new Date().toISOString().substring(0, 10),
          });
          setExistingCover(data.blog.coverImage || "");
        } else {
          toast.error("Failed to fetch blog for editing");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "tags") formDataToSend.append("tags", value.toString());
        else if (key === "coverImage" && value)
          formDataToSend.append("coverImage", value);
        else formDataToSend.append(key, value);
      });

      // Keep existing cover if no new file uploaded
      if (!formData.coverImage && existingCover) {
        formDataToSend.append("coverImage", existingCover);
      }

      const endpoint = id ? `/api/blogs/update?id=${id}` : `/api/blogs/create`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(endpoint, { method, body: formDataToSend });
      const result = await res.json();

      if (result.success) {
        toast.success(`Blog ${id ? "updated" : "created"} successfully!`);
        router.push("/dashboard/admin/blogs"); // Redirect to blog list
      } else {
        toast.error(result.message || "Failed to save blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while saving blog");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
       <AdminOffcanvas/>
      <div className="flex-grow-1 bg-light">
        <Topbar />
        <div className="container-fluid p-4">
          <h4 className="fw-bold mb-4">{id ? "Edit Blog Post" : "Create Blog Post"}</h4>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            {/* Slug */}
            <div className="mb-3">
              <label className="form-label">Slug</label>
              <input
                type="text"
                name="slug"
                className="form-control"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Tags */}
            <div className="mb-3">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                className="form-control"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                name="shortDescription"
                className="form-control"
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              />
            </div>

            {/* Cover Image */}
            <div className="mb-3">
              <label className="form-label">Cover Image</label>
              {formData.coverImage ? (
                <img
                  src={URL.createObjectURL(formData.coverImage)}
                  alt="Preview"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              ) : existingCover ? (
                <img
                  src={existingCover}
                  alt="Current Cover"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              ) : null}
              <input type="file" name="coverImage" className="form-control" onChange={handleImageChange} />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* SEO */}
            <div className="mb-3">
              <label className="form-label">Meta Title</label>
              <input type="text" name="metaTitle" className="form-control" value={formData.metaTitle} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Meta Description</label>
              <textarea name="metaDescription" className="form-control" value={formData.metaDescription} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Meta Keywords</label>
              <input type="text" name="metaKeywords" className="form-control" value={formData.metaKeywords} onChange={handleChange} />
            </div>

            {/* Author Name */}
            <div className="mb-3">
              <label className="form-label">Author Name</label>
              <input type="text" name="authorName" className="form-control" value={formData.authorName} onChange={handleChange} />
            </div>

            {/* Publish Date */}
            <div className="mb-3">
              <label className="form-label">Publish Date</label>
              <input type="date" name="publishDate" className="form-control" value={formData.publishDate} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {id ? "Update Blog" : "Save Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
