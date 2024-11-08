import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function clientLoader({params}:LoaderFunctionArgs) {
  const modules = import.meta.glob('/public/posts/**/*{.md,.mdx}', {eager: true})
  let post = null
  Object.entries(modules).forEach(([filePath, module])=> {
    const slug = filePath.replace(/^.*[\\/]/, '').replace('.mdx', '').replace('.md', '')
    params.slug = params.slug.replace('/posts','')
    if(params.slug === slug) {
      post = {
        title: module.frontmatter.meta[0].title,
        module: module.default,
      }
    }
  })

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post
}

export default function Post() {
  const post = useLoaderData<typeof clientLoader>()

  return (
    <>
      {post.module()}
    </>
  )
}