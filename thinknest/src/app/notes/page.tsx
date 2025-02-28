'use client'

import { useState, useEffect } from 'react';
import PostIt from './components/PostIt';
import PostItToolbar from './components/PostItToolbar';

// Definiere die Typen für das Post-it
interface PostItData {
  id: number;
  title: string;
  color: string;
  topic: string;
  note: string;
}

interface EventCategory {
  name: string;
  color: string;
}

export default function Home() {
  const [postIts, setPostIts] = useState<PostItData[]>([]);
  const [topics, setTopics] = useState<string[]>(['General', 'Work', 'Personal']);

  // Lade gespeicherte Notizen und Themen aus localStorage
  useEffect(() => {
    const savedPostIts = localStorage.getItem("postIts");
    if (savedPostIts) {
      setPostIts(JSON.parse(savedPostIts));
    }

    const savedTopics = localStorage.getItem('topics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
  }, []);

  // Speichere Notizen und Themen in localStorage, wenn sie sich ändern
  useEffect(() => {
    if (postIts.length > 0) {
      localStorage.setItem('postIts', JSON.stringify(postIts));
    }
  }, [postIts]);

  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem('topics', JSON.stringify(topics));
    }
  }, [topics]);

  const addPostIt = () => {
    const newPostIt = { id: Date.now(), color: 'yellow', topic: 'General', note: '' };
    const updatedPostIts = [...postIts, newPostIt];
    setPostIts(updatedPostIts);
  };

  const updatePostIt = (id: number, updated: Partial<PostItData>) => {
    const updatedPostIts = postIts.map((postIt) =>
      postIt.id === id ? { ...postIt, ...updated } : postIt
    );
    setPostIts(updatedPostIts);
  };

  const deletePostIt = (id: number) => {
    const updatedPostIts = postIts.filter((postIt) => postIt.id !== id);
    setPostIts(updatedPostIts);
  };

  const addTopic = (newTopic: string) => {
    if (!topics.includes(newTopic)) {
      const updatedTopics = [...topics, newTopic];
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Toolbar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <PostItToolbar addPostIt={addPostIt} />
      </div>

      {/* Post-it Container */}
      <div className="flex-1 bg-blue-50 p-4">
        <div
          className="flex flex-nowrap gap-4"
          style={{
            justifyContent: 'flex-start', // Post-its linksbündig
          }}
        >
          {postIts.map((postIt) => (
            <PostIt
              key={postIt.id}
              data={postIt}
              availableTopics={topics}
              addTopic={addTopic}
              onUpdate={(updated) => updatePostIt(postIt.id, updated)}
              onDelete={() => deletePostIt(postIt.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}