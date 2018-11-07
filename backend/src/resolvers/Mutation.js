const Mutations = {
  createDog(parent, args, ctx, info) {
    // create a dog!
    const newDog = { name: args.name };

    // put it in database, etc
    // dogs.push(newDog);

    //return it
    return newDog;
  }
};

module.exports = Mutations;
