// schema for profile application
const graphql = require('graphql');
const path = require('path');

const { getAllItems, getSingleItem } = require('../util/getItems');
const { addItem } = require('../util/addItem');
const profilesJson = path.join(__dirname, '../data/profiles.json');
const usersJson = path.join(__dirname, '../data/users.json');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// user type
const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Users types',
	fields: () => ({
		id: { type: GraphQLInt },
		profileId: { type: GraphQLInt },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		password: {
			type: GraphQLString
		},
		profile: {
			type: ProfileType,
			resolve(parent, args) {
				return getSingleItem(parent.profileId, profilesJson);
			}
		}
	})
});

// profile type
const ProfileType = new GraphQLObjectType({
	name: 'Profile',
	description: 'Profiles for every user',
	fields: () => ({
		id: { type: GraphQLInt },
		age: { type: GraphQLInt },
		address: { type: GraphQLString },
		phone: { type: GraphQLString },
		proficiency: { type: GraphQLString }
	})
});

// Root entry point for query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root query for all types',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve(parent, args) {
				return getSingleItem(args.id, usersJson);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return getAllItems(usersJson);
			}
		},
		profile: {
			type: ProfileType,
			args: { id: { type: GraphQLInt } },
			resolve(parent, args) {
				return getSingleItem(args.id, profilesJson);
			}
		},
		profiles: {
			type: new GraphQLList(ProfileType),
			resolve() {
				return getAllItems(profilesJson);
			}
		}
	}
});

// Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parent, args) {
				let newUser = {
					name: args.name,
					password: args.password,
					email: args.email
				};
				//Use if/else conditional for Authentication if you want.
				return addItem(newUser, usersJson);
			}
		},
		addProfile: {
			type: ProfileType,
			args: {
				age: { type: GraphQLInt },
				address: { type: GraphQLString },
				phone: { type: GraphQLString },
				userId: { type: GraphQLInt },
				proficiency: { type: GraphQLString }
			},
			resolve(parent, args) {
				let newProfile = {
					age: args.age,
					address: args.address,
					phone: args.phone,
					proficiency: args.proficiency
				};
				return addItem(newProfile, profilesJson);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
