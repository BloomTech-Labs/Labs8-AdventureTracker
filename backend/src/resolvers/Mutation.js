const Mutations = {
  async createTrip(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const trip = await ctx.db.mutation.createTrip(
      {
        data: {
          // Below is the same as manually adding in each field
          ...args
        }
      },
      info
    );
    return trip;
  }
};
