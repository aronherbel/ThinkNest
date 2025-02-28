import React from "react";

interface PostItToolbarProps {
  addPostIt: () => void;
}

const PostItToolbar: React.FC<PostItToolbarProps> = ({ addPostIt }) => {
  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 text-white bg-green-500 rounded shadow"
        onClick={addPostIt}
      >
        Neue Notizen
      </button>
    </div>
  );
};

export default PostItToolbar;