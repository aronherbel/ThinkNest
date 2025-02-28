interface PostItDetailViewProps {
    postIt: {
      id: number;
      title: string;
      color: string;
      topic: string;
      note: string;
    };
    onEdit: () => void;
    onClose: () => void;
  }
  
  const PostItDetailView: React.FC<PostItDetailViewProps> = ({ postIt, onEdit, onClose }) => {
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        onClick={onClose} // Schließen, wenn außerhalb des Fensters geklickt wird
      >
        <div
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-5xl h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()} // Verhindert das Schließen beim Klicken innerhalb des Fensters
        >
          <h2 className="text-4xl font-bold mb-4 text-center">{postIt.title || "Ohne Titel"}</h2>
          <p className="text-lg text-gray-600 text-center mb-4">
            {postIt.topic ? `Thema: ${postIt.topic}` : "Ohne Thema"}
          </p>
          
          <div className="flex-1 overflow-auto p-4 border rounded bg-gray-100 text-lg">
            {postIt.note || "Keine Notiz vorhanden."}
          </div>
  
          <div className="flex justify-between mt-6">
            <button className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg" onClick={onClose}>
              Schließen
            </button>
            <button className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-[#28AD5E]" onClick={onEdit}>
              Bearbeiten
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostItDetailView;