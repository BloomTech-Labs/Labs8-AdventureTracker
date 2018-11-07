const mutations = {
  createUser(parent, args, ctx, info) {
    // create a user!
    const newUser = { name: args.name, email: args.email, password: args.password };

    // put it in database, etc
    // users.push(newUser);

    //return it
    return newUser;
  }
};
