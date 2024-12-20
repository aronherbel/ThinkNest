import { useState } from 'react';

// Definiere die Typen für die Props, die das Component erwartet
interface PostItProps {
  data: {
    note: string;
    topic: string;
    color: string;
  };
  onUpdate: (updatedData: { note?: string; topic?: string; color?: string }) => void;
  onDelete: () => void;
  availableTopics: string[];
  addTopic: (newTopic: string) => void;
}

const PostIt: React.FC<PostItProps> = ({ data, onUpdate, onDelete, availableTopics, addTopic }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTopic, setNewTopic] = useState('');

  const colors = ['yellow', 'green', 'red', 'blue']; // Begrenzte Farbpalette

  const handleAddTopic = () => {
    if (newTopic.trim() !== '') {
      addTopic(newTopic.trim());
      onUpdate({ topic: newTopic.trim() });
      setNewTopic('');
    }
  };

  return (
    <div
      className={`flex flex-col p-4 shadow-md rounded-md text-gray-800`}
      style={{
        backgroundColor: data.color,
        width: '250px',
        height: '250px',
      }}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <div className="flex flex-col h-full">
          <textarea
            className="flex-1 p-3 mb-2 border rounded resize-none"
            value={data.note}
            onChange={(e) => onUpdate({ note: e.target.value })}
            placeholder="Notiz schreiben..."
          />
          <select
            className="p-0.5 mb-2 border rounded"
            value={data.topic}
            onChange={(e) => onUpdate({ topic: e.target.value })}
          >
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              className="flex-1 p-0.5 border rounded"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Neues Thema hinzufügen"
            />
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded"
              onClick={handleAddTopic}
            >
              Hinzufügen
            </button>
          </div>
          <select
            className="p-0.3 mb-2 border rounded"
            value={data.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-0.5 text-white bg-red-500 rounded"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Möchtest du dieses Post-it löschen?')) {
                onDelete();
              }
            }}
          >
            Löschen
          </button>
          <button
            className="mt-2 px-4 py-0.5 text-white bg-gray-700 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            Speichern
          </button>
        </div>
      ) : (
        <>
          <h4 className="font-bold mb-2">{data.topic || 'Kein Thema'}</h4>
          <p className="flex-1 text-sm">{data.note || 'Klicken zum Bearbeiten'}</p>
        </>
      )}
    </div>
  );
};

export default PostIt;