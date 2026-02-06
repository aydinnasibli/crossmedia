import { getPost, updatePost } from "@/app/admin/posts/actions";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  // Pre-bind update action with ID
  const updateAction = updatePost.bind(null, params.id);

  return (
    <PostForm
        initialData={post}
        action={updateAction}
        isEdit={true}
    />
  );
}
