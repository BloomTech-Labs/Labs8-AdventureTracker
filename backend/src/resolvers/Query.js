const { forwardTo } = require('prisma-binding');
const { getUserId } = require('../utils');
const Query = {
  markers: forwardTo('db'),
  users: forwardTo('db'),
  async tripById(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    if (!userId) {
      return null;
    }
    const trip = await ctx.db.query.trip({
      where: {
        id: args.id
      }
    });
    return trip;
  },
  async myTrips(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    // console.log(args);
    if (!userId) {
      return null;
    }
    return await ctx.db.query.trips(
      {
        where: {
          user: {
            id: userId
          },
          archived: args.archived
        }
      },
      info
    );
  },
  async me(parent, args, ctx, info) {
    // check if there is a current user ID
    const userId = getUserId(ctx);
    if (!userId) {
      // returning null when a person is not logged in
      return null;
    }
    // found the user
    return await ctx.db.query.user(
      {
        where: { id: userId }
      },
      // info is the query that's coming from client side
      info
    );
  }
};

module.exports = Query;

// const { forwardTo } = require('prisma-binding');
// const Query = {
//   trips: forwardTo('db'),
//   positions: forwardTo('db'),
//   markers: forwardTo('db'),
//   marker: forwardTo('db'),
//   trip: forwardTo('db'),
//   users: forwardTo('db'),
//   async trips(parent, args, ctx, info) {
//     const trips = await ctx.db.query.trips();
//     return trips;
//   },
//   async position(parent, args, ctx, info) {
//     const positions = await ctx.db.query.positions({
//       where: {
//         id: args.where.id
//       }
//     });

//     return positions;
//   },

//   me(parent, args, ctx, info) {
//     // check if there is a current user ID
//     if (!ctx.request.userId) {
//       // returning null when a person is not logged in
//       return null;
//     }
//     // found the user
//     return ctx.db.query.user(
//       {
//         where: { id: ctx.request.userId }
//       },
//       // info is the query that's coming from client side
//       info
//     );
//   }
// };

// module.exports = Query;
