const { forwardTo } = require('prisma-binding');
const Query = {
  trips: forwardTo('db'),
  positions: forwardTo('db'),
  markers: forwardTo('db'),
  trip: forwardTo('db'),
  // trip: forwardTo('db'),
  users: forwardTo('db'),
  async trips(parent, args, ctx, info) {
    const trips = await ctx.db.query.trips();
    return trips;
  },
  // async markers(parent, args, ctx, info) {
  //   console.log(args);
  //   const markers = await ctx.db.query.markers({});
  //   return markers;
  // },
  // async trip(parent, args, ctx, info) {
  //   // const user = ctx.db.query.user({
  //   //   where: {id: ctx.request.userId}
  //   // });
  //   // if(!user) {
  //   //   throw new Error('Please login to access the trip for that user.');
  //   // }
  //   // console.log(args);
  //   const trip = await ctx.db.query.trip({
  //     where: {
  //       id: args.where.id
  //     }
  //   });
  //   const markers = await ctx.db.
  //   query.markers({
  //     where: {
  //       trip: {
  //         id: args.where.id
  //       }
  //     }
  //   });
  //   trip.markers = markers;

  //   markers.forEach( (marker, i) => {
  //     const position = await ctx.db.query.positions({
  //       where: {
  //         marker: {
  //           id: marker.id
  //         }
  //       }
  //     });
  //     trip.markers[i].position = position;
  //     console.log('TRIP BEFORE:', JSON.stringify(trip));
  //     console.log();
  //   });

  //   console.log('TRIP AFTER:', JSON.stringify(trip));
  //   return trip;
  // },
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
