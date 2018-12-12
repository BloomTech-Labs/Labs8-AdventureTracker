const { forwardTo } = require('prisma-binding');
const Query = {
  trips: forwardTo('db'),
  positions: forwardTo('db'),
  markers: forwardTo('db'),
  trip: forwardTo('db'),
  users: forwardTo('db'),
  async trips(parent, args, ctx, info) {
    const trips = await ctx.db.query.trips();
    return trips;
  },
  async position(parent, args, ctx, info) {
    const positions = await ctx.db.query.positions({
      where: {
        id: args.where.id
      }
    });

    return positions;
  },

  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      // returning null when a person is not logged in
      return null;
    }
    // found the user
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      // info is the query that's coming from client side
      info
    );
  }
};

module.exports = Query;
