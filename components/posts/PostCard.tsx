"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClientSsr } from "@/utils/supabase/client";
import { PostsModel, ProfilesModel } from "@/types/Models";
import createSlug from "@/utils/slug";
import "./postCard.css";

type PostCardProps = {
  post: PostsModel["Row"];
  className?: string;
  style?: React.CSSProperties;
};

const PostCard: React.FC<PostCardProps> = ({ post, className = "", style = {} }) => {
  const [profile, setProfile] = useState<ProfilesModel["Row"] | null>(null);
  const supabase = createClientSsr();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .match({ user_id: post.owner_user_id })
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [post.owner_user_id, supabase]);

  if (!post.status || !post.post_type) {
    return <div>Loading...</div>;
  }

  const postSlug = createSlug(post.title, post.post_id);
  const uri = profile ? `/${profile.lw_username}/${postSlug}` : "#";
  const statusClass =
    post.status === "unclaimed"
      ? "text-[hsl(var(--logout-btn-background))]"
      : "text-[hsl(var(--visible-btn-background))]";

  return (
    <div className={`postcard border shadow-lg rounded-lg overflow-hidden w-full my-5 relative ${className}`} style={style}>
      <Link href={`${uri}`} className="hover:none">
        <div className="p-5 relative">
          <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
          <hr />
          {profile ? (
            <p className="text-gray-600">{`Filed by: ${profile.lw_username}`}</p>
          ) : (
            <p className="text-gray-600">Filed by: Loading...</p>
          )}
          <p className={`${statusClass} font-semibold`}>
            {`${post.status.charAt(0).toUpperCase() + post.status.slice(1)} | ${
              post.post_type.charAt(0).toUpperCase() + post.post_type.slice(1)
            }`}
          </p>
          {post.amount !== null && post.amount > 0 && (
            <p className="text-white font-semibold">{`$${post.amount} Available`}</p>
          )}
          <div className="text-white relative overflow-hidden">
            <p className="description">{post.description!.substring(0, 50)}</p>
            <div
              className="fade-out"
              style={{
                backgroundImage:
                  "linear-gradient(to top, hsl(var(--btn-background)), transparent)",
              }}
            ></div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0">
        <span className={`text-sm font-normal p-2 pt-8 pb-8 text-gray-600`}>
          Closes{" "}
          {new Date(post.created_at!).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
