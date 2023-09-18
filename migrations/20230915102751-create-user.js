// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('Name').notNullable().unique();
    table.string('Email').notNullable().unique();
    table.string('Password').notNullable().unique();
    table.string('Retype-password').notNullable().unique();
    table.Enum('User-type').notNullable().unique();
    table.timestamps(true, true);
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
