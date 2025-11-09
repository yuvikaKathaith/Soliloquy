"use client";

import React, { useState, useEffect } from "react";
import { createCollection, getCollections } from "@/actions/collection";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections: initialCollections = [], entriesByCollection }) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [collections, setCollections] = useState(initialCollections);

  // 1️⃣ Create fetch hook for collections
  const {
    loading: collectionsLoading,
    data: fetchedCollections,
    fn: fetchCollections,
  } = useFetch(getCollections);

  // 2️⃣ Create hook for creating collection
  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  // 3️⃣ Update list after creating a new collection
  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      fetchCollections(); // refresh list
      toast.success(`Collection ${createdCollection.name} created!`);
    }
  }, [createdCollection]);

  // 4️⃣ When new collections are fetched, update local state
  useEffect(() => {
    if (fetchedCollections) {
      setCollections(fetchedCollections);
    }
  }, [fetchedCollections]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  if (collectionsLoading) return <p>Loading collections...</p>;
  if (collections.length === 0) return <></>;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {/* User Collections */}
        {collections?.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection[collection.id] || []}
          />
        ))}

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;