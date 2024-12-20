import React from 'react';

// Definiere die Typen für die Props
interface PostItToolbarProps {
  addPostIt: () => void; // Funktion zum Hinzufügen eines neuen Post-its
}

const PostItToolbar: React.FC<PostItToolbarProps> = ({ addPostIt }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Notes</h2>
      <button
        className="px-4 py-2 text-white bg-black rounded shadow hover:bg-[#28AD5E]" 
        onClick={addPostIt}
      >
        Neue Notizen
      </button>
    </div>
  );
};

export default PostItToolbar;