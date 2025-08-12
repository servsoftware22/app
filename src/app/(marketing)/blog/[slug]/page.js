"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Quote,
  CheckCircle,
  AlertCircle,
  Info,
  Code,
  List,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ArticlePage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog/${params.slug}`);
      const data = await response.json();

      if (data.blog) {
        setBlog(data.blog);
      } else {
        setError("Article not found");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#FF5E00] mx-auto"></div>
          <p className="mt-4 text-[#848D6F]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-[#FF5E00] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#191C27] mb-2">
            {error || "Article not found"}
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-[#848D6F] to-[#6B7355]">
          {blog.cover_image_url ? (
            <Image
              src={blog.cover_image_url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">No cover image</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>

            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-[#FF5E00] text-white px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <div className="flex items-center space-x-2 text-white/90 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>{calculateReadTime(blog.html_content)} min read</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {blog.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/95">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{blog.author_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: blog.html_content }}
            />
          </div>
        </div>
      </div>

      {/* Author and Share Section */}
      <div className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Author Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#191C27] mb-4">
                About the Author
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                {blog.author_image_url ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={blog.author_image_url}
                      alt={blog.author_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-[#848D6F] to-[#6B7355] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-[#191C27]">
                    {blog.author_name}
                  </div>
                  <div className="text-sm text-[#848D6F]">ServicePro Team</div>
                </div>
              </div>
              <p className="text-sm text-[#848D6F]">
                Expert insights on growing service businesses in the digital
                age.
              </p>
            </div>

            {/* Share Buttons */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#191C27] mb-4">
                Share This Article
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            {/* Save Article */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#191C27] mb-4">
                Save for Later
              </h3>
              <button className="w-full flex items-center justify-center space-x-2 bg-[#FF5E00] text-white px-4 py-2 rounded-lg hover:bg-[#FF4A00] transition-colors">
                <Bookmark className="h-4 w-4" />
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Blog */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
