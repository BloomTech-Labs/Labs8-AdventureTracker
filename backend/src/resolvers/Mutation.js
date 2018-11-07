const mutations = {
  createUser(parent, args, ctx, info) {
    // create a dog!
    const newUser = { name: args.name, email: args.email, password: args.password };

    // put it in database, etc
    // dogs.push(newDog);

    //return it
    return newDog;
  }
};
