import { ImageResponse } from "next/og";

export const alt =
  "Jai Bansal, computer science student at NSUT and full-stack developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #f8f9fc 0%, #eef0ff 55%, #fce7f3 100%)",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            border: "1px solid rgba(79,70,229,0.16)",
            borderRadius: 32,
            background: "rgba(255,255,255,0.88)",
            padding: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 92,
              height: 92,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "#ffffff",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            JB
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 36,
            }}
          >
            <div
              style={{
                color: "#4f46e5",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              COMPUTER SCIENCE · NSUT
            </div>
            <div
              style={{
                marginTop: 16,
                color: "#0f172a",
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              Jai Bansal
            </div>
            <div
              style={{
                marginTop: 16,
                color: "#475569",
                fontSize: 28,
              }}
            >
              Full-stack developer building useful products
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
