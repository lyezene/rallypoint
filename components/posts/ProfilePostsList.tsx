"use client";
import React, { useEffect, useState } from "react";
import { createClientSsr } from "@/utils/supabase/client";
import { Status } from "@/types/Enums";
import { ProfilesModel, PostsModel } from "@/types/Models";
import PostCard from "./PostCard";
import StatusFilter from "./StatusFilter";

interface ProfilePostsProps {
  lw_username: string;
}

function ProfilePostsList({ lw_username }: ProfilePostsProps) {
  const supabase = createClientSsr();
  const [posts, setPosts] = useState<PostsModel["Row"][]>([]);
  const [user, setUser] = useState<ProfilesModel["Row"] | null>(null);
  const [checkedUser, setCheckStatus] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
    "unclaimed",
    "claimed",
    "finished",
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleStatusChange = (statuses: Status[]) => {
    setSelectedStatuses(statuses);
  };

  useEffect(() => {
    supabase
      .from("profiles")
      .select()
      .match({ lw_username })
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(data as ProfilesModel["Row"]);
          setCheckStatus(true);
        }
      });
  }, [lw_username]);

  useEffect(() => {
    if (!checkedUser) {
      return;
    }

    if (user) {
      supabase
        .from("posts")
        .select()
        .match({ owner_user_id: user.user_id })
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching posts:", error);
          } else {
            console.log("Posts:", data);
            console.log(
              "Status values:",
              data.map((post) => post.status),
            );
            setPosts(data as PostsModel["Row"][]);
          }
          setLoading(false);
        });
    } else {
      supabase
        .from("posts")
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching posts:", error);
          } else {
            setPosts(data as PostsModel["Row"][]);
          }
          setLoading(false);
        });
    }
  }, [checkedUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!posts) {
    return <div>Posts not found</div>;
  }

  const filteredPosts = posts.filter(
    (post) =>
      selectedStatuses.length === 0 ||
      (post.status !== null && selectedStatuses.includes(post.status)),
  );

  return (
    <div className="flex flex-col ">
      <StatusFilter
        selectedStatuses={selectedStatuses}
        onChange={handleStatusChange}
        className={"composite-buttons composite-buttons-3 center"}
      />
      <div className={"profile-projects-grid"}>
        {filteredPosts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePostsList;
