const Query = {
  user(parent, args, ctx, info) {
    // Data!  can come from anywhere, API, DB call, etc
    return [{ name: 'Penny' }, { name: 'Snoopy' }];
  }
};

module.exports = Query;
