"use client";

import { createCollection, getCollections } from "@/actions/collection";
import { createJournalEntry } from "@/actions/journal";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { journalSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const JournalEntryPage = () => {
  const [isCollectionDiaglougeOpen, setIsCollectionDialogOpen] =
    useState(false);
  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch(createJournalEntry);

  const {
    loading: collectionsLoading,
    data: collections,
    fn: fetchCollections,
  } = useFetch(getCollections);

  const {
    loading: createCollectionLoading,
    data: createdCollection,
    fn: createCollectionFn,
  } = useFetch(createCollection);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const isLoading = false;

  useEffect(() => {
    if (actionResult && !actionLoading) {
      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );
      toast.success(`Entry created successfully`);
    }
  }, [actionResult, actionLoading]);
  const onSubmit = handleSubmit(async (data) => {
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood.score,
      moodQuery: mood.pixabayQuery,
    });
  });

  return (
    <div className="py-8">
      <form className="space-y-2 mx-auto" onSubmit={onSubmit}>
        <h1 className="text-5xl md:text-6xl gradient-title font-inter">
          What&apos;s on your mind?
        </h1>
        {isLoading && <BarLoader color="orange" width={"100%"} />}

        {/* TITLE */}
        <div className="space-y-2 py-2 px-4">
          <label className="text-md font-medium">Title</label>
          <Input
            disabled={isLoading}
            {...register("title")}
            placeholder="Give your entry a title..."
            className={`bg-stone-50 py-5 md:text-md ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* HOW ARE YOU FEELING */}
        <div className="space-y-2 py-2 px-4">
          <label className="text-md font-medium">How are you feeling?</label>
          {/* shadcn Select is a custom component (not a native input), so React Hook Form can't track its value with just `register`.We use Controller to connect Select's onValueChange + value with the form state. */}
          <Controller
            name="mood"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`w-full ${
                      errors.mood ? "border-red-500" : ""
                    } bg-stone-50`}
                  >
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Object.values(MOODS) --> converts moods obj to arr */}
                    {Object.values(MOODS).map((mood) => (
                      <SelectItem key={mood.id} value={mood.id}>
                        <span className="flex items-center gap-2">
                          {mood.emoji} {mood.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.mood && (
            <p className="text-red-500 text-sm">{errors.mood.message}</p>
          )}
        </div>

        {/* content */}
        <div className="space-y-2 py-2 px-4">
          <label className="text-md font-medium">
            {getMoodById(getValues("mood"))?.prompt ?? "Write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                className="bg-stone-50"
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ font: [] }], // font family
                    [{ size: ["small", false, "large", "huge"] }], // font sizes
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], // headers
                    ["bold", "italic", "underline", "strike"], // formatting
                    [{ script: "sub" }, { script: "super" }], // sub/superscript
                    [{ color: [] }, { background: [] }], // text & background colors
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ], // lists + indentation
                    [{ align: [] }], // text alignment
                    ["blockquote", "code-block"],
                    ["link", "image", "video"], // links, images, videos
                    ["clean"], // remove formatting
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        {/* selected Collection */}
        <div className="space-y-2 py-2 px-4">
          <label className="text-sm font-medium">
            Add to Collection (Optional)
          </label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    setIsCollectionDialogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="bg-stone-50">
                  <SelectValue placeholder="Choose a collection..." />
                </SelectTrigger>
                <SelectContent>
                  {collections?.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">
                    <span className="text-orange-600">
                      + Create New Collection
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* publish button */}
        <div className="space-y-4 flex py-2 px-4">
          <Button type="submit" variant="journal">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryPage;
