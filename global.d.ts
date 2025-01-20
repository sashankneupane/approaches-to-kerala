import { ModelViewerElement } from "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<Partial<ModelViewerElement> & React.HTMLAttributes<ModelViewerElement>, ModelViewerElement>;
    }
  }
}