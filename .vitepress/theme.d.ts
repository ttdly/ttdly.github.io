// re-export vite client types. with strict installers like pnpm, user won't
// be able to reference vite/client in project root.
/// <reference types="vite/client" />

import { DefaultTheme } from 'vitepress';

export namespace PokeTheme {
  export type SocialLinkIcon = 'github' | 'bilibili' | { svg: string };

  export type SocialLink = {
    icon: SocialLinkIcon;
    link: string;
  };

  export interface Config extends DefaultTheme.Config {
    name?: string;
    socialLink?: Array<SocialLink>;
    rss?: boolean;
    postsDir?: string
  }
}
