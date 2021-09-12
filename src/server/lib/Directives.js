import { SchemaDirectiveVisitor } from 'apollo-server';

const roleScopes = {
	admin: ['*:*'],
	editor: ['*:*'],
	contact: ['*:read'],
	user: ['*:read'],
};

const checkScope = (requiredScope, userScopeArray) => {
	for (let key in userScopeArray) {
		if (
			new RegExp(
				'^' + userScopeArray[key].split('*').join('.*') + '$'
			).test(requiredScope)
		) {
			return true;
		}
	}

	return false;
};

export class AccessDirective extends SchemaDirectiveVisitor {
	visitObject(type) {
		this.ensureFieldsWrapped(type);

		type._scope = this.args.scope;
	}
	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	visitFieldDefinition(field, details) {
		this.ensureFieldsWrapped(details.objectType);

		field._scope = this.args.scope;
	}

	ensureFieldsWrapped(objectType) {
		// Mark the GraphQLObjectType object to avoid re-wrapping:
		if (objectType._alreadyWrapperd) {
			return;
		}

		objectType._alreadyWrapperd = true;

		const fields = objectType.getFields();

		Object.keys(fields).forEach(fieldName => {
			const field = fields[fieldName];
			const { defaultFieldResolver, resolve } = field;

			field.resolve = async function (...args) {
				// Get the required Role from the field first, falling back
				// to the objectType if no Role is required by the field:
				const scope = field._scope || objectType._scope;
				const query = args[1];
				const context = args[2];

				if (!scope) {
					return (
						(defaultFieldResolver &&
							defaultFieldResolver.apply(this, args)) ||
						(resolve && resolve.apply(this, args))
					);
				}

				if (!context.user) {
					throw new Error('User not logged in');
				}

				const usersRoles = context.user.roles;
				let userRole = 'contact';

				let localRole = usersRoles.find(
					role => role.housingCooperativeId !== '*'
				);

				if (localRole) {
					userRole = localRole.role;
				}

				if (query.housingCooperativeId) {
					localRole = usersRoles.find(
						role =>
							role.housingCooperativeId ===
							query.housingCooperativeId
					);

					if (localRole) {
						userRole = localRole.role;
					}
				}

				let globalRole = usersRoles.find(
					role => role.housingCooperativeId === '*'
				);

				if (globalRole) {
					userRole = globalRole.role;
				}

				let userRoleScopes = roleScopes[userRole];

				if (!checkScope(scope, userRoleScopes)) {
					console.log(scope, userRole, userRoleScopes);
					throw new Error('User dont have correct scope');
				}

				return (
					(defaultFieldResolver &&
						defaultFieldResolver.apply(this, args)) ||
					(resolve && resolve.apply(this, args))
				);
			};
		});
	}
}
