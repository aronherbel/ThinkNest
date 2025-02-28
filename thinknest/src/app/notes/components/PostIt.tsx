interface PostItProps {
  data: {
    id: number;
    title: string;
    color: string;
    topic: string;
    note: string;
  };
  onClick: () => void;
}

const PostIt: React.FC<PostItProps> = ({ data, onClick }) => {
  return (
    <div
      className="p-4 shadow-md rounded-md text-Black-800 cursor-pointer"
      style={{
        backgroundColor: data.color,
        width: "170px",
        height: "50px",
      }}
      onClick={onClick}
    >
      <h4 className="font-bold">{data.title || "Ohne Titel"}</h4>
    </div>
  );
};

export default PostIt;