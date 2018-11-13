const { forwardTo } = require('prisma-binding');
const Query = {
  // trips: forwardTo('db'),
  users: forwardTo('db'),
  // async trips(parent, args, ctx, info) {
  //   const trips = await ctx.db.query.trips();
  //   return trips;
  // }
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  }
};

module.exports = Query;
