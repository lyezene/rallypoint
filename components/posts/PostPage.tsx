"use client";
import React, { useEffect, useState } from "react";
import { ProfilesModel, PostsModel } from "@/types/Models";
import ClaimCard from "@/components/claims/ClaimCard";
import { ClaimsModel } from "@/types/Models";
import { createClientSsr } from "@/utils/supabase/client";

type PostPageProps = {
  post: PostsModel["Row"];
  claims: ClaimsModel["Row"][];
};

function PostPage({ post, claims }: PostPageProps) {
  const [profile, setProfile] = useState<ProfilesModel["Row"] | null>(null);
  const [lwUsername, setLwUsername] = useState<string | null>(null);
  const { post_id, title, description, status, post_type, amount } = post;
  const supabase = createClientSsr();
  useEffect(() => {
    const { owner_user_id } = post;
    supabase
      .from("profiles")
      .select()
      .match({ user_id: owner_user_id })
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching lw_username");
        } else {
          setProfile(data as ProfilesModel["Row"]);
        }
      });
  }, [post]);
  useEffect(() => {
    if (profile) {
      setLwUsername(profile.lw_username);
    }
  }, [profile]);
  if (profile === null) {
    return <div>Loading...</div>;
  } else {
    const lw_username = lwUsername as string;
    return (
      <div className="border">
        <h2>
          <a href={`/${lw_username}/${post_id}`}>{title}</a>
        </h2>
        <p>{`Filed by: ${lw_username}`}</p>
        <p>{description}</p>
        <p>{`${status} ${post_type}`}</p>
        <p>{`$${amount} available`}</p>
        <p>
          <a href={`/${lw_username}/${post_id}/claim`}>Make claim</a>
        </p>
        Standing claims:
        {claims.map((claim: ClaimsModel["Row"]) => {
          return (
            <ClaimCard
              key={claim.claim_id}
              claim={claim}
              poster_lw_username={lw_username}
            />
          );
        })}
      </div>
    );
  }
}
export default PostPage;
