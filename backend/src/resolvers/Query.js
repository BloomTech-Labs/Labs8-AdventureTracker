const { forwardTo } = require('prisma-binding');
const Query = {
  trips: forwardTo('db'),
  // trip: forwardTo('db'),
  users: forwardTo('db'),
  async trips(parent, args, ctx, info) {
    const trips = await ctx.db.query.trips();
    return trips;
  },
  async markers(parent, args, ctx, info) {
    console.log(args);
    const markers = await ctx.db.query.markers({});
    return markers;
  },
  async trip(parent, args, ctx, info) {
    // const user = ctx.db.query.user({
    //   where: {id: ctx.request.userId}
    // });
    // if(!user) {
    //   throw new Error('Please login to access the trip for that user.');
    // }
    console.log(args);
    const trip = await ctx.db.query.trip({
      where: {
        id: args.where.id
      }
    });
    const markers = await ctx.db.query.markers({
      where: {
        trip: {
          id: args.where.id
        }
      }
    });
    console.log(markers);
    trip.markers = markers;
    return trip;
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
