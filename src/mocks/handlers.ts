import { rest } from 'msw';
import { store } from './data';

export const handlers = [
  rest.post('/trpc/*', (req, res, ctx) => {
    const path = req.url.pathname.split('/').pop();
    
    // Mock user query
    if (path === 'getUser') {
      return res(
        ctx.json({
          result: {
            data: store.users[0]
          }
        })
      );
    }

    // Mock sleep statistics
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
