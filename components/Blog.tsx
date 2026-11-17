import type { BlogPost } from "@/types/portfolio";
import { isSafeExternalUrl } from "@/lib/utils";

function formatDate(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Writing</span>
          <h2 className="section-title" id="blog-heading">Latest Articles</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => {
            const cardContent = (
              <>
                <div className="blog-meta">
                  <time className="blog-date" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <span className="blog-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                {isSafeExternalUrl(post.url) && (
                  <span className="blog-arrow" aria-hidden="true">→</span>
                )}
              </>
            );

            return isSafeExternalUrl(post.url) ? (
              <a
                href={post.url}
                className="blog-card reveal"
                key={post.title}
                id={`blog-post-${i}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read article: ${post.title} (opens in a new tab)`}
              >
                {cardContent}
              </a>
            ) : (
              <article className="blog-card reveal" key={post.title} id={`blog-post-${i}`}>
                {cardContent}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
