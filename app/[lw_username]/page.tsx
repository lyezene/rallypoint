import { createClientSsr } from "@/utils/supabase/client";
import UserProfile from "@/components/profile/UserProfile";
import ReactMarkdown from "react-markdown";

export default async function Page({
  params,
}: {
  params: { lw_username: string };
}) {
  const { lw_username } = params;
  const supabase = createClientSsr();
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .match({ lw_username })
    .single();

  if (error) {
    return (
      <div>
        {`No profile. Probably dropped or couldn't load somehow: ${error.message}`}
      </div>
    );
  }
  if (!data) {
    return <div>Loading... (forever probably)</div>;
  }

  return (
    <div>
      <UserProfile
        profile={{
          ...data,
          bio: (
            <ReactMarkdown className={"whitespace-pre-wrap"}>
              {data.bio}
            </ReactMarkdown>
          ),
        }}
        privateView={false}
      />
    </div>
  );
}
