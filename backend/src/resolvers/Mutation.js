const { forwardTo } = require('prisma-binding');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('../stripe');
const { hashPassword } = require('../utils');

const Mutations = {
  deleteMarker: forwardTo('db'),
  updatePosition: forwardTo('db'),
  async createTrip(parent, args, ctx, info) {
    // comment out to test locally
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const trip = await ctx.db.mutation.createTrip(
      {
        data: {
          // This is how to create a relationship between the Trip and the User
          user: {
            connect: {
              // commment out to test locally
              id: ctx.request.userId
              // uncomment to test locally
              // id: args.user.id
            }
          },
          title: args.title,
          startDate: args.startDate,
          endDate: args.endDate,
          archived: args.archived,
          markers: args.markers
        }
      },
      info
    );
    return trip;
  },
  archiveTrip(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateTrip(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateTrip(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.tripId;
    // run the update method
    return ctx.db.mutation.updateTrip(
      {
        data: updates,
        where: {
          id: args.tripId
        }
      },
      info
    );
  },
  async createMarkerMutation(parent, args, ctx, info) {
    const marker = await ctx.db.mutation.createMarker({
      data: {
        trip: {
          connect: {
            id: args.tripId
          }
        },
        status: args.status,
        position: {
          create: {
            lat: args.position.lat,
            lng: args.position.lng
          }
        },
        etaTime: args.etaTime,
        checkpointName: args.checkpointName,
        checkedInTime: args.checkedInTime
      },
      info
    });
    return marker;
  },
  updateMarker(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.markerId;
    // run the update method
    return ctx.db.mutation.updateMarker(
      {
        data: updates,
        where: {
          id: args.markerId
        }
      },
      info
    );
  },
  updateMarkerStatus(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.markerId;
    // run the update method
    return ctx.db.mutation.updateMarker(
      {
        data: updates,
        where: {
          id: args.markerId
        }
      },
      info
    );
  },
  // async deleteTrip(parent, args, ctx, info) {
  //   const where = { id: args.id };
  //   // find the item
  //   const trip = await ctx.db.query.trip({ where }, `{ id title}`);
  //   // check if they own that item, or have the permissions
  //   // TODO
  //   // Delete it
  //   return ctx.db.mutation.deleteTrip({ where }, info);
  // },
  async signup(parent, args, ctx, info) {
    if (args.password !== args.password2) {
      throw new Error('Passwords do not match!');
    }
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await hashPassword(args.password);
    // create the user in the database
    const user = await ctx.db.mutation.createUser({
      data: {
        name: args.name,
        email: args.email, // name, email, password
        password,
        facebookUser: false,
        tripCount: 0,
        paid: false,
        // default new people as "USER"
        permissions: { set: ['USER'] } // uses `set` because is enum
      },
      // info is what is returned to the client
      info
    });

    // We just signed up - so go ahead and log the new user in!
    // create the JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    // Return the user to the browser
    return user;
  },
  async facebooksignup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await hashPassword(args.password);
    // create the user in the database
    const user = await ctx.db.mutation.createUser({
      data: {
        name: args.name,
        email: args.email, // name, email, password
        password,
        facebookID: args.facebookID,
        facebookUser: true,
        tripCount: 0,
        paid: false,
        // default new people as "USER"
        permissions: { set: ['USER'] } // uses `set` because is enum
      },
      // info is what is returned to the client
      info
    });

    // We just signed up - so go ahead and log the new user in!
    // create the JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    // Return the user to the browser
    return user;
  },
  // {email, password} is destructuring args
  async signin(parent, { email, password }, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password');
    }
    // generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // return the user
    return user;
  },
  async facebooksignin(parent, { facebookID }, ctx, info) {
    // check if there is a user with that facebook ID
    const user = await ctx.db.query.user({ where: { facebookID } });
    if (!user) {
      throw new Error(`No user found. Click to create your account.`);
    }
    // generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // return the user
    return user;
  },
  async deleteUser(parent, { id }, ctx, info) {
    const deletedUser = await ctx.db.mutation.deleteUser({
      where: {
        id
      }
    });

    return deletedUser;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye' };
  },
  async changePassword(parent, { email, oldPassword, newPassword }, ctx, info) {
    // Gets user by email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    //Checks if the user added the correct, current password
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      throw new Error('Old Password is incorrect');
    }

    //No point in modifying the database if the user put in the same password in both input boxes
    if (oldPassword === newPassword) {
      throw new Error('Both old password and new password are the same.');
    }
    //hashing the newPassword and updates the user afterwards
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password: hashedPassword
      }
    });

    return updatedUser;
  },

  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) throw new Error('You must be signed in to complete this order.');

    // Query current user
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `
        { 
          id 
          name 
          email 
        }
      `
    );

    // 2. Calculate total price
    const amount = 999;

    // 3. Create the stripe charge (turn token into money)
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token
    });

    // 4. Create the order
    const order = await ctx.db.mutation.createOrder({
      data: {
        price: charge.amount, // comes back from Stripe
        charge: charge.id, // given by Stripe
        user: { connect: { id: userId } }
      }
    });

    // 5. Return the Order to the client
    return order;
  }
};

module.exports = Mutations;
