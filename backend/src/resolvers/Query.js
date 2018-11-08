const Query = {
  async trips(parent, args, ctx, info) {
    const trips = await ctx.db.query.trip();
    return trips;
  }
};

module.exports = Query;
