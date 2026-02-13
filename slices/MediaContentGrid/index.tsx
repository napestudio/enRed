import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MediaContentGrid`.
 */
export type MediaContentGridProps =
  SliceComponentProps<Content.MediaContentGridSlice>;

/**
 * Component for "MediaContentGrid" Slices.
 */
const MediaContentGrid: FC<MediaContentGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for media_content_grid (variation: {slice.variation}
      ) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default MediaContentGrid;
