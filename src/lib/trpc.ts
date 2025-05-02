import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'src/types/trpc-root';

// 环境变量配置
const isDev = import.meta.env.DEV;
const apiBaseUrl = isDev ? 'http://localhost:3000' : import.meta.env.VITE_API_BASE_URL;

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${apiBaseUrl}/trpc`,
    }),
  ],
});

export default trpc;