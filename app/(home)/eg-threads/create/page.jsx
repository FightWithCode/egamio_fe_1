"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPoll, setIsPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleAddOption = () => setPollOptions([...pollOptions, ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      content: isPoll ? undefined : content,
      poll: isPoll ? pollOptions : undefined,
    };
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    router.push("/discussions");
  };

  return (
    <ResponsiveContainer className="my-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-2xl font-bold">Create New Post</h3>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPoll}
              onChange={(e) => setIsPoll(e.target.checked)}
            />
            Is this a poll?
          </label>
        </div>
        {!isPoll && (
          <textarea
            placeholder="Content"
            className="w-full p-2 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        {isPoll &&
          pollOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border rounded"
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        {isPoll && (
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        )}
        <button type="submit" className="bg-highlight text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </ResponsiveContainer>
  );
};

export default CreatePost;
