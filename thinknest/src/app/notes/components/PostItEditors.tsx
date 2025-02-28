import { useState } from "react";

interface PostItEditorProps {
  postIt: {
    id: number;
    title: string;
    color: string;
    topic: string;
    note: string;
  };
  categories: { name: string; color: string }[];
  onSave: (postIt: { id: number; title: string; color: string; topic: string; note: string }) => void;
  onCancel: () => void;
  onStop: () => void;
  onDelete: (id: number) => void;
}

const PostItEditor: React.FC<PostItEditorProps> = ({ postIt, categories, onSave, onCancel, onStop, onDelete }) => {
  const [editedPostIt, setEditedPostIt] = useState(postIt);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onStop} // Schließen, wenn außerhalb des Fensters geklickt wird
    >
      <div
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-5xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Verhindert das Schließen beim Klicken innerhalb des Fensters
      >
        <h2 className="text-2xl font-bold mb-6">Notiz bearbeiten</h2>
        <input
          type="text"
          className="w-full p-3 border rounded mb-4 text-lg"
          placeholder="Titel..."
          value={editedPostIt.title}
          onChange={(e) => setEditedPostIt({ ...editedPostIt, title: e.target.value })}
        />
        
        <select
          className="w-full p-3 border rounded mb-4 text-lg"
          value={editedPostIt.topic}
          onChange={(e) => {
            const newTopic = e.target.value;
            const newColor = categories.find((c) => c.name === newTopic)?.color || "yellow";
            setEditedPostIt({ ...editedPostIt, topic: newTopic, color: newColor });
          }}
        >
          <option value="">Ohne Thema</option>
          {categories.map((topic) => (
            <option key={topic.name} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>

        <textarea
          className="w-full p-3 border rounded mb-4 h-60 text-lg"
          placeholder="Notiz..."
          value={editedPostIt.note}
          onChange={(e) => setEditedPostIt({ ...editedPostIt, note: e.target.value })}
        />

        <div className="flex justify-between">
          <button className="px-6 py-2 bg-gray-500 text-white rounded text-lg" onClick={onCancel}>
            Abbrechen
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded text-lg hover:bg-red-700" onClick={() => postIt?.id && onDelete(postIt.id)}>
            Löschen
          </button>
          <button className="px-6 py-2 bg-black text-white rounded text-lg hover:bg-[#28AD5E]" onClick={() => onSave(editedPostIt)}>
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItEditor;