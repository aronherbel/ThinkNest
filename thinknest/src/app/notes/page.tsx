'use client';

import HeaderTitle from "@/components/HeaderTitle";
import { useState, useEffect } from 'react';
import PostIt from './components/PostIt';
import PostItToolbar from './components/PostItToolbar';

interface PostItData {
  id: number;
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
  const [categories, setCategories] = useState<EventCategory[]>([]);

  // Daten aus localStorage laden
  useEffect(() => {
    const savedPostIts = localStorage.getItem('postIts');
    if (savedPostIts) {
      try {
        setPostIts(JSON.parse(savedPostIts));
      } catch {
        console.error('Ungültige Daten in localStorage für Post-its');
        localStorage.removeItem('postIts');
      }
    }

    const savedCategories = localStorage.getItem('eventCategories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch {
        console.error('Ungültige Daten in localStorage für Kategorien');
        localStorage.removeItem('eventCategories');
      }
    }
  }, []);

  // Post-its bei jeder Änderung in localStorage speichern
  const savePostItsToStorage = (newPostIts: PostItData[]) => {
    setPostIts(newPostIts);
    localStorage.setItem('postIts', JSON.stringify(newPostIts));
  };

  const addPostIt = () => {
    const newPostIt = { id: Date.now(), color: categories[0]?.color || 'yellow', topic: categories[0]?.name || '', note: '' };
    savePostItsToStorage([...postIts, newPostIt]);
  };

  const updatePostIt = (id: number, updated: Partial<PostItData>) => {
    const updatedPostIts = postIts.map((postIt) =>
      postIt.id === id ? { ...postIt, ...updated } : postIt
    );
    savePostItsToStorage(updatedPostIts);
  };

  const deletePostIt = (id: number) => {
    const filteredPostIts = postIts.filter((postIt) => postIt.id !== id);
    savePostItsToStorage(filteredPostIts);
  };

  return (
    <div className="min-h-screen">
      <HeaderTitle title="Notes" />
    <div className="flex h-screen">
      <div className="w-1/4">
        <PostItToolbar addPostIt={addPostIt} />
      </div>

      <div className="flex-1 p-4">
        {postIts.length > 0 ? (
          <div className="flex flex-wrap gap-3" style={{ justifyContent: 'flex-start' }}>
            {postIts.map((postIt) => (
              <PostIt
                key={postIt.id}
                data={postIt}
                availableTopics={categories}
                onUpdate={(updated) => updatePostIt(postIt.id, updated)}
                onDelete={() => deletePostIt(postIt.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Keine Post-Its vorhanden. Erstellen Sie ein neues Post-It, um zu starten.</p>
        )}
      </div>
    </div>
    </div>
  );
}
