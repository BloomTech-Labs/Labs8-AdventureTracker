const { forwardTo } = require('prisma-binding');
const Query = {
  trips: forwardTo('db')
  // async trips(parent, args, ctx, info) {
  //   const trips = await ctx.db.query.trips();
  //   return trips;
  // }
};

module.exports = Query;
