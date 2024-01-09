import { Resvg, initWasm } from '@resvg/resvg-wasm';
import type { ReactNode } from 'react';
import satori, { SatoriOptions } from 'satori';

export type ImageContent = ReactNode;

export type ImageOptions = SatoriOptions & {
  headers?: HeadersInit;
  status?: number;
  statusText?: string;
};

let wasmPromise: Promise<void> | undefined;

/**
 * Image response to render Open Graph images.
 */
export class ImageResponse extends Response {
  /**
   * Creates an image response instance.
   *
   * @param content Content to render.
   * @param options Configuration options.
   */
  constructor(content: ImageContent, options: ImageOptions) {
    const readable = new ReadableStream({
      async start(controller) {
        // Create SVG string using Satori
        const svg = await satori(content, options);

        // Lazy initialize WebAssembly module of resvg
        if (!wasmPromise) {
          wasmPromise = initWasm(
            fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm')
          );
        }
        await wasmPromise;

        // Convert SVG string to PNG image
        const image = new Resvg(svg).render().asPng();

        // Enqueue image to readable stream
        controller.enqueue(image);
        controller.close();
      },
    });

    // Create image response object
    super(readable, {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'public, immutable, no-transform, max-age=31536000',
        ...options.headers,
      },
      status: options.status,
      statusText: options.statusText,
    });
  }
}
