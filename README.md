# og-img

This is a framework agnostic package for generating Open Graph images using [Satori](https://github.com/vercel/satori) and [resvg](https://github.com/RazrFalcon/resvg). Built using Web APIs, this package can be executed with Node.js and on the edge. You can use this package to add dynamic Open Graph images to your SvelteKit, Astro, SolidStart or Qwik website.

> The difference to `@vercel/og` is that this package loads the WebAssembly module needed to convert SVG to PNG lazily at runtime and provides a framework agnostic workaround for defining the content of the images using [`satori-html`](https://github.com/natemoo-re/satori-html).

## Installation

This library is available for Node and Bun.

```bash
npm install og-img    # npm
yarn add og-img       # yarn
pnpm add og-img       # pnpm
bun add og-img        # bun
```

## How it works

To generate an image, all you need to do is return an `ImageResponse` via a server endpoint. You can use `html` to easily define the content of your image.

> To get proper syntax highlighting for the tagged template literal in Visual Studio Code, you can install the [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) extension.

```ts
import { ImageResponse, html } from 'og-img';

async function loadFont(url: string) {
  const resposne = await fetch(url);
  return resposne.arrayBuffer();
}

// With SvelteKit
export async function GET() {
  return new ImageResponse(
    // Use Tailwind CSS or style attribute
    html`
      <div tw="text-4xl text-green-700" style="background-color: tan">
        Hello, world!
      </div>
    `,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Roboto',
          // Use `fs` (Node.js only) or `fetch` to read font file
          data: await loadFont('https://www.example.com/fonts/roboto-400.ttf'),
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}

// With Qwik
export const onGet = async ({ send }) => {
  send(
    new ImageResponse(
      // Use Tailwind CSS or style attribute
      html`
        <div tw="text-4xl text-green-700" style="background-color: tan">
          Hello, world!
        </div>
      `,
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: 'Roboto',
            // Use `fs` (Node.js only) or `fetch` to read font file
            data: await loadFont(
              'https://www.example.com/fonts/roboto-400.ttf'
            ),
            weight: 400,
            style: 'normal',
          },
        ],
      }
    )
  );
};
```

Then all you need to do is point to your API endpoint with a meta tag in the head of your website to embed the Open Graph image.

```html
<head>
  <title>Hello, world!</title>
  <meta property="og:image" content="https://www.example.com/og-image" />
</head>
```

You can use URL parameters to dynamically change the content of your Open Graph image. Take a look at [Valibot's Open Graph image](https://valibot.dev/og-image/?title=Example%20Title&description=The%20content%20of%20this%20image%20was%20generated%20dynamically). You can find the source code [here](https://github.com/fabian-hiller/valibot/blob/main/website/src/routes/og-image/index.ts).

## Credits

- Satori: https://github.com/vercel/satori
- Satori HTML: https://github.com/natemoo-re/satori-html
- resvg: https://github.com/RazrFalcon/resvg
- resvg-js: https://github.com/yisibl/resvg-js

## Feedback

Find a bug or have an idea how to improve the library? Please fill out an [issue](https://github.com/fabian-hiller/og-img/issues/new). Together we can make the library even better!

## License

This project is available free of charge and licensed under the [MPL-2.0 license](https://github.com/fabian-hiller/og-img/blob/main/LICENSE).
