import type { BlogPost } from "@/types/portfolio";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Writing</span>
          <h2 className="section-title">Latest Articles</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <a
              href={post.url}
              className="blog-card reveal"
              key={i}
              id={`blog-post-${i}`}
              target={post.url !== "#" ? "_blank" : undefined}
              rel={post.url !== "#" ? "noopener noreferrer" : undefined}
            >
              <div className="blog-meta">
                <span className="blog-date">{formatDate(post.date)}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span className="blog-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="blog-arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
