exports.up = function(knex) {
    return knex.schema.createTable('preferences', function(table){
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned().notNullable();
      table.string('type').notNullable();
      table.string('prefence').notNullable();

      table.foreign('user_id').references('user.id');

    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('preferences');
    
  };
  