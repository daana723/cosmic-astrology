import type React from "react"

interface ImageSearchProps {
  query: string
  width: string | number
  height: string | number
}

const ImageSearch: React.FC<ImageSearchProps> = ({ query, width, height }) => {
  // This is a placeholder component that would normally fetch images based on a query
  // For now, we'll just return a placeholder image

  // Convert the query to a seed for consistent but varied images
  const seed = query.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Use the seed to pick a color
  const hue = seed % 360
  const saturation = 70 + (seed % 20)
  const lightness = 40 + (seed % 20)

  const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const textColor = lightness > 50 ? "#333" : "#fff"

  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
        fontWeight: "bold",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✨🌙✨</div>
        <div>{query}</div>
      </div>
    </div>
  )
}

export default ImageSearch
