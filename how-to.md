# 使用MSW和tRPC进行开发的完整指南

## 1. 探索阶段 - 使用MSW支撑页面设计

### 1.1 安装依赖
```bash
npm install -D msw @mswjs/data @trpc/server
```

### 1.2 创建Mock基础结构
在`src/mocks`目录下创建以下文件：

1. `data.ts` - 存储模拟数据
```typescript
// src/mocks/data.ts
export const store = {
  users: [
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    }
  ],
  sleepStats: {
    lastNight: {
      hours: 7,
      minutes: 45,
      percentage: 65,
      comparison: 'Better than 65% of users'
    },
    goal: {
      hours: 8,
      minutes: 0,
      status: 'Keep it up!'
    }
  }
};
```

2. `handlers.ts` - 定义模拟请求处理器
```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';
import { store } from './data';

export const handlers = [
  rest.post('/trpc/*', (req, res, ctx) => {
    const path = req.url.pathname.split('/').pop();
    
    if (path === 'getSleepStats') {
      const lastNight = store.sleepStats.lastNight;
      const goal = store.sleepStats.goal;
      
      return res(
        ctx.json({
          result: {
            data: {
              lastNight: {
                hours: lastNight.hours,
                minutes: lastNight.minutes,
                comparison: lastNight.comparison
              },
              goal: {
                hours: goal.hours,
                minutes: goal.minutes,
                status: goal.status
              }
            }
          }
        })
      );
    }

    return res(
      ctx.json({
        result: {
          data: null
        }
      })
    );
  }),
];
```

3. `server.ts` - 设置MSW服务器
```typescript
// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// 在开发模式下启动服务器
server.listen({ onUnhandledRequest: 'bypass' });
```

4. `setup.ts` - 初始化MSW
```typescript
// src/mocks/setup.ts
import { server } from './server';

if (import.meta.env.DEV) {
  server.listen({ onUnhandledRequest: 'bypass' });
}
```

### 1.3 在组件中使用
```typescript
// src/components/home/Home.astro
import MusicLyricsSimple from "./MusicLyricsSimple.jsx";
import trpc from '../../../lib/trpc';

interface Props {
  client: 'load';
}

interface Stats {
  lastNight: {
    hours: number;
    minutes: number;
    comparison: string;
  };
  goal: {
    hours: number;
    minutes: number;
    status: string;
  };
}

const getFormattedTime = (hours: number, minutes: number) => {
  return `${hours}h ${minutes}m`;
};

---
const { client } = Astro.props;

const stats = await trpc.getSleepStats.query();

---

<div class="w-full min-h-[600px] flex flex-col items-center justify-start bg-base-100 pt-8 pb-24 px-4">
  <div class="stats shadow mb-4 w-full max-w-md mx-auto">
    <div class="stat">
      <div class="stat-title">Last Night's Sleep</div>
      <div class="stat-value text-primary">{getFormattedTime(stats.lastNight.hours, stats.lastNight.minutes)}</div>
      <div class="stat-desc">{stats.lastNight.comparison}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Sleep Goal</div>
      <div class="stat-value text-secondary">{getFormattedTime(stats.goal.hours, stats.goal.minutes)}</div>
      <div class="stat-desc">{stats.goal.status}</div>
    </div>
  </div>
</div>
```

## 2. 本地开发测试 - 从MSW迁移到真实tRPC实现

### 2.1 创建tRPC路由器
```typescript
// src/server/trpc/routers/sleep.ts
import { t } from '../trpc';

export const sleepRouter = t.router({
  getSleepStats: t.procedure.query(async () => {
    // 这里将替换为真实的数据库查询
    return {
      lastNight: {
        hours: 7,
        minutes: 45,
        comparison: 'Better than 65% of users'
      },
      goal: {
        hours: 8,
        minutes: 0,
        status: 'Keep it up!'
      }
    };
  }),
});
```

### 2.2 更新客户端
```typescript
// src/lib/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'src/types/trpc-root';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV 
        ? 'http://localhost:3000/trpc' 
        : import.meta.env.VITE_API_BASE_URL + '/trpc',
    }),
  ],
});

export default trpc;
```

### 2.3 测试迁移
1. 确保所有组件使用接口类型定义
2. 使用tRPC的类型安全查询
3. 在开发环境中保持MSW运行
4. 在本地测试中切换到真实API

## 3. 生产部署 - tRPC结合

### 3.1 配置环境变量
```bash
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 3.2 部署步骤
1. 确保所有API端点在生产环境中可用
2. 测试所有tRPC查询
3. 验证类型安全
4. 部署前端和后端

### 3.3 监控和维护
1. 监控API性能
2. 处理错误和异常
3. 维护类型定义
4. 定期更新文档

## 最佳实践

1. **类型优先**：始终使用tRPC的类型定义
2. **分层开发**：先使用MSW进行UI开发，再实现后端逻辑
3. **环境隔离**：确保开发、测试和生产环境的正确配置
4. **错误处理**：实现全面的错误处理机制
5. **文档维护**：保持API文档的更新

## 常见问题

### Q: 如何处理API错误？
```typescript
// src/lib/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'src/types/trpc-root';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV 
        ? 'http://localhost:3000/trpc' 
        : import.meta.env.VITE_API_BASE_URL + '/trpc',
      async onError({ error }) {
        console.error('tRPC Error:', error);
        // 处理特定错误类型
        if (error.code === 'UNAUTHORIZED') {
          // 处理未授权错误
        }
      },
    }),
  ],
});

export default trpc;
```

### Q: 如何在生产中禁用MSW？
```typescript
// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// 只在开发模式下启动
if (import.meta.env.DEV) {
  server.listen({ onUnhandledRequest: 'bypass' });
}
```

### Q: 如何处理API版本控制？
```typescript
// src/server/trpc/routers/sleep.ts
import { t } from '../trpc';

export const sleepRouter = t.router({
  getSleepStatsV1: t.procedure.query(async () => {
    // v1实现
  }),
  getSleepStatsV2: t.procedure.query(async () => {
    // v2实现
  }),
});
```

## 总结
使用MSW和tRPC的组合可以提供一个强大的开发体验，从快速原型设计到生产部署的完整流程。通过遵循这些最佳实践和指南，您可以确保项目的可维护性、可测试性和可扩展性。