"use client";

import { useState } from "react";
import {
  Edit,
  Save,
  Eye,
  Undo,
  Redo,
  Palette,
  Type,
  Image,
  Layout,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";

export default function WebsiteEditorPage() {
  const [activeTab, setActiveTab] = useState("content");
  const [previewMode, setPreviewMode] = useState(false);

  const tabs = [
    { id: "content", name: "Content", icon: Type },
    { id: "design", name: "Design", icon: Palette },
    { id: "layout", name: "Layout", icon: Layout },
    { id: "media", name: "Media", icon: Image },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const contentSections = [
    {
      id: "hero",
      title: "Hero Section",
      description: "Main banner and headline",
      status: "published",
    },
    {
      id: "about",
      title: "About Section",
      description: "Company information and story",
      status: "draft",
    },
    {
      id: "services",
      title: "Services Section",
      description: "List of your services",
      status: "published",
    },
    {
      id: "contact",
      title: "Contact Section",
      description: "Contact information and form",
      status: "draft",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Editor Interface */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Undo className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Redo className="h-4 w-4" />
            </button>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Monitor className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Smartphone className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Globe className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#848D6F]">Auto-saved</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-[#FF5E00] border-b-2 border-[#FF5E00]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === "content" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#191C27]">
                      Page Sections
                    </h3>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {contentSections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-[#191C27] text-sm">
                            {section.title}
                          </h4>
                          <p className="text-xs text-[#848D6F]">
                            {section.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              section.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {section.status}
                          </span>
                          <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                            <Edit className="h-3 w-3" />
                          </button>
                          <button className="p-1 text-[#848D6F] hover:text-red-600 transition-colors">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "design" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-[#191C27]">Design Options</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#191C27] mb-2">
                        Color Scheme
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["#FF5E00", "#191C27", "#848D6F", "#FF4A00"].map(
                          (color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                              style={{ backgroundColor: color }}
                            ></button>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#191C27] mb-2">
                        Typography
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Poppins</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "layout" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-[#191C27]">Layout Options</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#191C27] mb-2">
                        Header Style
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Centered",
                          "Left-aligned",
                          "Minimal",
                          "Full-width",
                        ].map((style) => (
                          <button
                            key={style}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-[#191C27]">Media Library</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#FF5E00] transition-colors text-center">
                      <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-[#848D6F]">Upload new image</p>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-[#191C27]">Page Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#191C27] mb-2">
                        Page Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter page title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#191C27] mb-2">
                        Meta Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows="3"
                        placeholder="Enter meta description"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1">
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Edit className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-[#191C27] mb-2">
                  Website Editor
                </h3>
                <p className="text-sm text-[#848D6F] mb-4">
                  Select a section from the sidebar to start editing your
                  website
                </p>
                <button className="px-4 py-2 bg-[#FF5E00] text-white rounded-md hover:bg-[#FF4A00] transition-colors">
                  Start Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
